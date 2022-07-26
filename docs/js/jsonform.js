/* Copyright (c) 2012 Joshfire - MIT license */
/**
 * @fileoverview Core of the JSON Form client-side library.
 *
 * Generates an HTML form from a structured data model and a layout description.
 *
 * The library may also validate inputs entered by the user against the data model
 * upon form submission and create the structured data object initialized with the
 * values that were submitted.
 *
 * The library depends on:
 *  - jQuery
 *  - the underscore library
 *  - a JSON parser/serializer. Nothing to worry about in modern browsers.
 *  - the JSONFormValidation library (in jsv.js) for validation purpose
 *
 * See documentation at:
 * http://developer.joshfire.com/doc/dev/ref/jsonform
 *
 * The library creates and maintains an internal data tree along with the DOM.
 * That structure is necessary to handle arrays (and nested arrays!) that are
 * dynamic by essence.
 */

/*global window*/

(function(serverside, global, $, _, JSON) {
  if (serverside && !_) {
    _ = require('underscore');
  }

  var getdefaultConfig = function() {
    return {
      rootClass: '',
      formClass: 'form-group',
      formReadonlyClass: 'jsonform-readonly',
      formDisabledClass: 'jsonform-disabled',
      formInlineClass: 'form-inline',
      formsGroupClass: 'form-group',
      groupMarkClassPrefix: 'has-',
      labelClass: 'col-form-label',
      controlClass: '',
      iconClassPrefix: 'fa fa',
      buttonClass: 'btn-secondary',
      submitButtonClass: 'btn-primary',
      resetButtonClass: 'btn-danger',
      buttonGroupClass: 'btn-group',
      textualInputClass: 'form-control',
      inputGroupClass: 'input-group',
      prependClass: 'input-group-prepend',
      appendClass: 'input-group-append',
      addonClass: 'input-group-text',
      placementClassPrefix: 'float',
      helpClass: 'form-text text-muted',
      useTooltip: tooltipAvailable(),
      tooltipClass: '',
      tooltipIconSuffix: 'info-circle',
      actionsClass: '',
      errorTextClass: 'text-danger',
      imgResponsiveClass: 'img-fluid',
      legendClass: 'col-form-label-lg',
      navTabsClass: 'nav-tabs',
      navItemClass: 'nav-item',
      navLinkClass: 'nav-link',
      selectWrapClass: '',
      rangeInputClass: 'form-control-range',
      switchWrapClass: 'custom-control custom-switch',
      switchInputClass: 'custom-control-input',
      switchLabelClass: 'custom-control-label',
      radioWrapClass: 'form-check',
      radioWrapInlineClass: 'form-check form-check-inline',
      radioInputClass: 'form-check-input',
      radioLabelClass: 'form-check-label',
      checkboxWrapClass: 'form-check',
      checkboxWrapInlineClass: 'form-check form-check-inline',
      checkboxInputClass: 'form-check-input',
      checkboxLabelClass: 'form-check-label',
      dropdownMenuClass: '',
      dropdownInputClass: '',
      bootstrapValidation: true
    };
  };

  /**
   * Regular expressions used to extract array indexes in input field names
   */
  var reArray = /\[([0-9]*)\](?=\[|\.|$)/g;

  /**
   * Template settings for form views
   */
  var fieldTemplateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g
  };

  /**
   * Template settings for value replacement
   */
  var valueTemplateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
  };

  /**
   * Returns true if given value is neither "undefined" nor null
   */
  var isSet = function(value) {
    return !(_.isUndefined(value) || _.isNull(value));
  };

  /**
   * Returns true if given property is directly property of an object
   */
  var hasOwnProperty = function(obj, prop) {
    return typeof obj === 'object' && obj.hasOwnProperty(prop);
  };

  /**
   * The jsonform object whose methods will be exposed to the window object
   */
  var jsonform = {
    util: {}
  };


  // From backbonejs
  var escapeHTML = function(string) {
    if (!isSet(string)) {
      return '';
    }
    string = '' + string;
    if (!string) {
      return '';
    }
    return string
      .replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  // checks out if bootstrap tooltip plugin is available
  var tooltipAvailable = function() {
    return !!$.fn.tooltip;
  };

  /**
   * Escapes selector name for use with jQuery
   *
   * All meta-characters listed in jQuery doc are escaped:
   * http://api.jquery.com/category/selectors/
   *
   * @function
   * @param {String} selector The jQuery selector to escape
   * @return {String} The escaped selector.
   */
  var escapeSelector = function(selector) {
    return selector.replace(/([ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1');
  };

  /**
   *
   * Slugifies a string by replacing spaces with _. Used to create
   * valid classnames and ids for the form.
   *
   * @function
   * @param {String} str The string to slugify
   * @return {String} The slugified string.
   */
  var slugify = function(str) {
    return str.replace(/\ /g, '_');
  };

  /**
   *
   * Initializes all tooltips.
   *
   * @function
   */
  var initializeTooltip = function() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  /**
   * Initializes tabular sections in forms. Such sections are generated by the
   * 'selectfieldset' type of elements in JSON Form.
   *
   * Input fields that are not visible are automatically disabled
   * not to appear in the submitted form. That's on purpose, as tabs
   * are meant to convey an alternative (and not a sequence of steps).
   *
   * The tabs menu is not rendered as tabs but rather as a select field because
   * it's easier to grasp that it's an alternative.
   *
   * Code based on bootstrap-tabs.js, updated to:
   * - react to option selection instead of tab click
   * - disable input fields in non visible tabs
   * - disable the possibility to have dropdown menus (no meaning here)
   * - act as a regular function instead of as a jQuery plug-in.
   *
   * @function
   * @param {Object} tabs jQuery object that contains the tabular sections
   *  to initialize. The object may reference more than one element.
   */
  var initializeTabs = function(tabs) {
    var activate = function(element, container) {
      container
        .find('> .active')
        .removeClass('active').find('> a.active').removeClass('active');
      element.addClass('active').find('> a').addClass('active');
    };

    var enableFields = function($target, targetIndex) {
      // Enable all fields in the targeted tab
      $target.find('input, textarea, select').prop('disabled', false);

      // Disable all fields in other tabs
      $target.parent()
        .children(':not([data-idx=' + targetIndex + '])')
        .find('input, textarea, select')
        .attr('disabled', 'disabled');
    };

    var optionSelected = function(e) {
      var $option = $("option:selected", $(this)),
        $select = $(this),
        // do not use .attr() as it sometimes unexplicably fails
        targetIdx = $option.get(0).getAttribute('data-idx') || $option.attr('value'),
        $target;

      e.preventDefault();
      if ($option.hasClass('active')) {
        return;
      }

      $target = $(this).parents('.jsonform-tabbable').eq(0).find('> .tab-content > [data-idx=' + targetIdx + ']');

      activate($option, $select);
      activate($target, $target.parent());
      enableFields($target, targetIdx);
    };

    var tabClicked = function(e) {
      var $a = $('a', $(this));
      var $content = $(this).parents('.jsonform-tabbable').first()
        .find('.tab-content').first();
      var targetIdx = $(this).index();
      // The `>` here is to prevent activating selectfieldsets inside a tabarray
      var $target = $content.find('> [data-idx=' + targetIdx + ']');

      e.preventDefault();
      activate($(this), $(this).parent());
      activate($target, $target.parent());
      if ($(this).parent().hasClass('jsonform-alternative')) {
        enableFields($target, targetIdx);
      }
    };

    tabs.each(function() {
      $(this).on('change', 'select.nav', optionSelected);
      $(this).find('select.nav').each(function() {
        $(this).val($(this).find('.active').attr('value'));
        // do not use .attr() as it sometimes unexplicably fails
        var targetIdx = $(this).find('option:selected').get(0).getAttribute('data-idx') ||
          $(this).find('option:selected').attr('value');
        var $target = $(this).parents('.jsonform-tabbable').eq(0).find('> .tab-content > [data-idx=' + targetIdx + ']');
        enableFields($target, targetIdx);
      });

      $(this).on('click', 'ul.nav li', tabClicked);
      $(this).find('ul.nav li.active').trigger("click");
    });
  };


  // Twitter bootstrap-friendly HTML boilerplate for standard inputs
  jsonform.fieldTemplate = function(inner) {
    return '<div ' +
      '<% for(var key in elt.htmlMetaData) {%>' +
      '<%= key %>="<%= elt.htmlMetaData[key] %>" ' +
      '<% }%>' +
      'class="<%= cls.formClass %> jsonform-node jsonform-error-<%= keydash %>' +
      '<%= elt.htmlClass ? " " + elt.htmlClass : "" %>' +
      '<%= (node.required && node.formElement && (node.formElement.type !== "checkbox") && (node.formElement.type !== "switch") ? " jsonform-required" : "") %>' +
      '<%= (node.isReadOnly() ? " " + cls.formReadonlyClass : "") %>' +
      '<%= (node.disabled ? " " + cls.formDisabledClass : "") %>' +
      '" data-jsonform-type="<%= node.formElement.type %>">' +
      '<% if (!elt.notitle && node.inlinetitle !== true) { %>' +
      '<label class="<%= cls.labelClass %>" for="<%= node.id %>"><%= node.getTitle() %>' +
      '<% if (node.description && (elt.useTooltip === true || (elt.useTooltip === undefined && cls.useTooltip))) { %>' +
      '<span data-toggle="tooltip" data-placement="right" title="<%= node.description %>" class="<%= cls.tooltipClass %> jsonform-description-tooltip"><i class="<%= cls.iconClassPrefix %>-<%= cls.tooltipIconSuffix %>"></i></span>' +
      '<% } %>' +
      '</label>' +
      '<% } %>' +
      '<div<% if (cls.controlClass) { %> class="<%= cls.controlClass %>"<% } %>>' +
      '<% if (node.description && !(elt.useTooltip === true || (elt.useTooltip === undefined && cls.useTooltip))) { %>' +
      '<small class="<%= cls.helpClass %> jsonform-description"><%= node.description %></small>' +
      '<% } %>' +
      '<% if (node.prepend || node.append) { %>' +
      '<div class="<%= cls.inputGroupClass %>">' +
      '<% if (node.prepend) { %>' +
      '<% if (cls.prependClass) { %>' +
      '<div class="<%= cls.prependClass %>">' +
      '<% } %>' +
      '<% if (node.prepend.indexOf("<input ") >= 0) { %>' +
      '<div class="<%= cls.addonClass %>"><%= node.prepend %></div>' +
      '<% } else { %>' +
      '<% if (node.prepend.indexOf("<button ") >= 0) { %>' +
      '<%= node.prepend %>' +
      '<% } else { %>' +
      '<span class="<%= cls.addonClass %>"><%= node.prepend %></span>' +
      '<% } %>' +
      '<% } %>' +
      '<% if (cls.prependClass) { %>' +
      '</div>' +
      '<% } %>' +
      '<% } %>' +
      inner +
      '<% if (node.append) { %>' +
      '<% if (cls.appendClass) { %>' +
      '<div class="<%= cls.appendClass %>">' +
      '<% } %>' +
      '<% if (node.append.indexOf("<input ") >= 0) { %>' +
      '<div class="<%= cls.addonClass %>"><%= node.append %></div>' +
      '<% } else { %>' +
      '<% if (node.append.indexOf("<button ") >= 0) { %>' +
      '<%= node.append %>' +
      '<% } else { %>' +
      '<span class="<%= cls.addonClass %>"><%= node.append %></span>' +
      '<% } %>' +
      '<% } %>' +
      '<% if (cls.appendClass) { %>' +
      '</div>' +
      '<% } %>' +
      '<% } %>' +
      '</div>' +
      '<% } else { %>' +
      inner +
      '<% } %>' +
      '<small class="<%= cls.errorTextClass %> jsonform-errortext" style="display:none;"></small>' +
      '</div></div>';
  };

  var fileDisplayTemplate = '<div class="_jsonform-preview">' +
    '<% if (value.type=="image") { %>' +
    '<img class="jsonform-preview" id="jsonformpreview-<%= id %>" src="<%= value.url %>" />' +
    '<% } else { %>' +
    '<a href="<%= value.url %>"><%= value.name %></a> (<%= Math.ceil(value.size/1024) %>kB)' +
    '<% } %>' +
    '</div>' +
    '<a href="#" class="btn <%= cls.buttonClass %> _jsonform-delete"><i class="<%= cls.iconClassPrefix %>-trash" title="Remove"></i></a> ';

  var inputFieldTemplate = function(type, isTextualInput, extraOpts) {
    var templ = {
      'template': '<input type="' + type + '" ' +
        'class="<%= fieldHtmlClass' + (isTextualInput ? ' || cls.textualInputClass' : '') + ' %>" ' +
        'name="<%= node.name %>" value="<%= escape(value) %>" id="<%= id %>"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.isReadOnly() ? " readonly=\'readonly\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.minLength ? " minlength=\'" + node.schemaElement.minLength + "\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.maxLength ? " maxlength=\'" + node.schemaElement.maxLength + "\'" : "") %>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.placeholder? " placeholder=" + \'"\' + escape(node.placeholder) + \'"\' : "")%>' +
        '<%= (node.schemaElement && node.schemaElement.pattern ? " pattern=\'" + node.schemaElement.pattern + "\'" : "") %>' +
        ' />',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        if (node.formElement) {
          var $input = $(node.el).find('input');
          // autocomplete
          if (node.formElement.autocomplete && $input.autocomplete) {
            $input.autocomplete(node.formElement.autocomplete);
          }
          // tagsinput
          if ((node.formElement.tagsinput || node.formElement.getValue === 'tagsvalue')) {
            if (!$.fn.tagsinput)
              throw new Error('tagsinput is not found');
            var isArray = Array.isArray(node.value);
            if (isArray)
              $input.attr('value', '').val('');
            var tagsinputOpts = {
              maxChars: (node.schemaElement && node.schemaElement.maxLength && node.schemaElement.maxLength > -1) ? node.schemaElement.maxLength : undefined
            };
            if (node.formElement.tagsinput) {
              _.extend(tagsinputOpts, node.formElement.tagsinput);
            }
            $input.tagsinput(tagsinputOpts);
            if (isArray) {
              node.value.forEach(function(value) {
                $input.tagsinput('add', value);
              });
            }
          }
          // typeahead
          if (node.formElement.typeahead && $input.typeahead) {
            $input.typeahead(node.formElement.typeahead);
          }
        }
      }
    };
    if (extraOpts)
      templ = _.extend(templ, extraOpts);
    return templ;
  };

  var numberFieldTemplate = function(type, isTextualInput) {
    return {
      'template': ((type === "range") ? '<div class="range">' : '') +
        '<input type="' + type + '" ' +
        'class="<%= fieldHtmlClass' + (isTextualInput ? ' || cls.textualInputClass' : '') + ' %>' + ((type === "range") ? '<%= cls.rangeInputClass %>' : '') + '" ' +
        'name="<%= node.name %>" value="<%= escape(value) %>" id="<%= id %>"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.isReadOnly() ? " readonly=\'readonly\'" : "") %>' +
        '<%= (range.min !== undefined ? " min="+range.min : "")%>' +
        '<%= (range.max !== undefined ? " max="+range.max : "")%>' +
        '<%= (range.step !== undefined ? " step="+range.step : "")%>' +
        '<%= (node.schemaElement && node.schemaElement.minLength ? " minlength=\'" + node.schemaElement.minLength + "\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.maxLength ? " maxlength=\'" + node.schemaElement.maxLength + "\'" : "") %>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.placeholder? " placeholder=" + \'"\' + escape(node.placeholder) + \'"\' : "")%>' +
        ' />' +
        ((type === "range") ? '<% if (range.indicator) { %><span class="range-value" rel="<%= id %>"><%= escape(value) %></span><% } %></div>' : ''),
      'fieldtemplate': true,
      'inputfield': true,
      'onInput': function(evt, elt) {
        const valueIndicator = document.querySelector('span.range-value[rel="' + elt.id + '"]');
        if (valueIndicator) {
          valueIndicator.innerText = evt.target.value;
        }
      },
      'onBeforeRender': function(data, node) {
        data.range = {
          step: 1,
          indicator: false
        };
        if (type == 'range') {
          data.range.min = 1;
          data.range.max = 100;
        }
        if (!node || !node.schemaElement) return;
        if (typeof node.schemaElement.multipleOf !== 'undefined') {
          data.range.step = node.schemaElement.multipleOf;
        } else if (node.formElement && node.formElement.step) {
          data.range.step = node.formElement.step;
        } else if (node.schemaElement.type == 'number') {
          data.range.step = 'any';
        }
        var step = data.range.step === 'any' ? 1 : data.range.step;
        if (node.formElement && node.formElement.indicator) {
          data.range.indicator = node.formElement.indicator;
        }
        if (typeof node.schemaElement.minimum !== 'undefined') {
          if (node.schemaElement.exclusiveMinimum) {
            data.range.min = node.schemaElement.minimum + step;
          } else {
            data.range.min = node.schemaElement.minimum;
          }
        }
        if (typeof node.schemaElement.maximum !== 'undefined') {
          if (node.schemaElement.exclusiveMaximum) {
            data.range.max = node.schemaElement.maximum - step;
          } else {
            data.range.max = node.schemaElement.maximum;
          }
        }
      }
    };
  };

  jsonform.elementTypes = {
    'none': {
      'template': ''
    },
    'root': {
      'template': '<div<% if (cls.rootClass) { %> class="<%= cls.rootClass %>"<% } %>><%= children %></div>'
    },
    'text': inputFieldTemplate('text', true),
    'password': inputFieldTemplate('password', true),
    'date': inputFieldTemplate('date', true, {
      'onInsert': function(evt, node) {
        if (window.Modernizr && window.Modernizr.inputtypes && !window.Modernizr.inputtypes.date) {
          var $input = $(node.el).find('input');
          if ($input.datepicker) {
            var opt = {
              dateFormat: "yy-mm-dd"
            };
            if (node.formElement && node.formElement.datepicker && typeof node.formElement.datepicker === 'object')
              _.extend(opt, node.formElement.datepicker);
            $input.datepicker(opt);
          }
        }
      }
    }),
    'datetime': inputFieldTemplate('datetime', true),
    'datetime-local': inputFieldTemplate('datetime-local', true, {
      'onBeforeRender': function(data, node) {
        if (data.value && data.value.getTime) {
          data.value = new Date(data.value.getTime() - data.value.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
        }
      }
    }),
    'email': inputFieldTemplate('email', true),
    'month': inputFieldTemplate('month', true),
    'number': numberFieldTemplate('number', true),
    'search': inputFieldTemplate('search', true),
    'tel': inputFieldTemplate('tel', true),
    'time': inputFieldTemplate('time', true),
    'url': inputFieldTemplate('url', true),
    'week': inputFieldTemplate('week', true),
    'range': numberFieldTemplate('range'),
    'color': {
      'template': '<span id="color_picker_<%= id %>"><input type="text" ' +
        '<%= (fieldHtmlClass ? "class=\'" + fieldHtmlClass + "\' " : "") %>' +
        'name="<%= node.name %>" value="<%= escape(value) %>" id="<%= id %>"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.isReadOnly()? " readonly=\'readonly\'" : "") %>' +
        ' />' +
        '</span>',
      'fieldtemplate': true,
      'inputfield': true,
      'getElement': function(el) {
        return $(el).parent().get(0);
      },
      'onInsert': function(evt, node) {
        if (global.Picker) {
          $(node.el).find('input').attr('readOnly', 'true');
          var value = $(node.el).find('input').attr('value');
          if (value) {
            $(node.el).find('#' + escapeSelector(node.id))
              .attr('style', 'background-color:' + value + ';color:' + value);
          }
          var picker = new global.Picker({
            parent: document.querySelector('#color_picker_' + escapeSelector(node.id)),
            alpha: false,
            color: value || '',
            editor: true,
            editorFormat: 'hex',
            cancelButton: true,
            onDone: function(color) {
              $(node.el).find('#' + escapeSelector(node.id))
                .attr('value', color.hex.slice(0, 7))
                .attr('style', 'background-color:' + color.hex.slice(0, 7) + ';color:' + color.hex.slice(0, 7));
            },
          });
        } else {
          var sppecturmOpts = {
            type: "color",
            showPalette: false,
            showAlpha: false,
            allowEmpty: true,
            disabled: node.disabled ? true : false,
            preferredFormat: "hex",
            showInput: true
          };
          if (node.isReadOnly()) {
            _.extend(sppecturmOpts, {
              beforeShow: function(color) {
                return false;
              }
            });
          }
          $(node.el).find('#' + escapeSelector(node.id)).spectrum(sppecturmOpts);
        }
      }
    },
    'textarea': {
      'template': '<textarea id="<%= id %>" name="<%= node.name %>" ' +
        'class="<%= fieldHtmlClass || cls.textualInputClass %>" ' +
        'style="height:<%= elt.height || "150px" %>;width:<%= elt.width || "100%" %>;"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.isReadOnly() ? " readonly=\'readonly\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.minLength ? " minlength=\'" + node.schemaElement.minLength + "\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.maxLength ? " maxlength=\'" + node.schemaElement.maxLength + "\'" : "") %>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.placeholder? " placeholder=" + \'"\' + escape(node.placeholder) + \'"\' : "")%>' +
        '><%= value %></textarea>',
      'fieldtemplate': true,
      'inputfield': true
    },
    'wysihtml5': {
      'template': '<textarea id="<%= id %>" name="<%= node.name %>" style="height:<%= elt.height || "300px" %>;width:<%= elt.width || "100%" %>;"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        'class="<%= fieldHtmlClass || cls.textualInputClass %>" ' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.isReadOnly() ? " readonly=\'readonly\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.minLength ? " minlength=\'" + node.schemaElement.minLength + "\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.maxLength ? " maxlength=\'" + node.schemaElement.maxLength + "\'" : "") %>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.placeholder? " placeholder=" + \'"\' + escape(node.placeholder) + \'"\' : "")%>' +
        '><%= value %></textarea>',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        var setup = function() {
          //protect from double init
          if ($(node.el).data("wysihtml5")) return;
          $(node.el).data("wysihtml5_loaded", true);

          $(node.el).find('#' + escapeSelector(node.id)).wysihtml5({
            "toolbar": {
              "html": true,
              "emphasis": true, // use only base: bold, italic, underline
              "link": !!$.fn.modal, // uses bootstrap modal
              "image": !!$.fn.modal, // uses bootstrap modal
              "color": false, // not works
              "fa": node.ownerTree.defaultConfig.iconClassPrefix.slice(-2) === 'fa' ? true : false
            },
            "events": {
              "load": function() {
                // In chrome, if an element is required and hidden, it leads to
                // the error 'An invalid form control with name='' is not focusable'
                // See http://stackoverflow.com/questions/7168645/invalid-form-control-only-in-google-chrome
                $(this.editableElement).prop('required', false);
              }
            }
          });
        };

        // Is there a setup hook?
        if (window.jsonform_wysihtml5_setup) {
          window.jsonform_wysihtml5_setup(setup);
          return;
        }

        // Wait until wysihtml5 is loaded
        var itv = window.setInterval(function() {
          if (window.wysihtml5) {
            window.clearInterval(itv);
            setup();
          }
        }, 1000);
      }
    },
    'summernote': {
      'template': '<textarea id="<%= id %>" name="<%= node.name %>" style="height:<%= elt.height || "300px" %>;width:<%= elt.width || "100%" %>;"' +
        ' aria-label="<%= node.title ? escape(node.title) : node.name %>"' +
        'class="<%= fieldHtmlClass || cls.textualInputClass %>" ' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.isReadOnly() ? " readonly=\'readonly\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.minLength ? " minlength=\'" + node.schemaElement.minLength + "\'" : "") %>' +
        '<%= (node.schemaElement && node.schemaElement.maxLength ? " maxlength=\'" + node.schemaElement.maxLength + "\'" : "") %>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.placeholder? " placeholder=" + \'"\' + escape(node.placeholder) + \'"\' : "")%>' +
        '><%= value %></textarea>',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        var setup = function() {
          var formElement = node.formElement || {};
          var summernoteOpts = {
            "placeholder": node.placeholder || null,
            "height": formElement.height || "300px",
            "width": formElement.width || "100%",
            "disableDragAndDrop": true,
            "codeviewFilter": true,
            "spellCheck": false,
            "disableGrammar": true,
            "callbacks": {
              "onInit": function() {
                // In chrome, if an element is required and hidden, it leads to
                // the error 'An invalid form control with name='' is not focusable'
                // See http://stackoverflow.com/questions/7168645/invalid-form-control-only-in-google-chrome
                $(this).prop('required', false);
              }
            },
            "toolbar": [
              ["style", ["style"]],
              ["color", ["color"]],
              ["font", ["bold", "italic", "underline", "clear"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["view", ["codeview"]],
              ["insert", ["link", "picture"]],
            ]
          };
          // check if font awesome is used
          if (node.ownerTree.defaultConfig.iconClassPrefix.slice(-2) === 'fa') {
            _.extend(summernoteOpts, {
              "icons": {
                "align": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-align-left\"/>",
                "alignCenter": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-align-center\"/>",
                "alignJustify": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-align-justify\"/>",
                "alignLeft": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-align-left\"/>",
                "alignRight": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-align-right\"/>",
                "indent": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-indent\"/>",
                "outdent": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-outdent\"/>",
                "arrowsAlt": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-arrows-alt\"/>",
                "bold": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-bold\"/>",
                "caret": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-caret-down\"/>",
                'circle': "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-circle\"/>",
                "close": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-times\"/>",
                "code": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-code\"/>",
                "eraser": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-eraser\"/>",
                //"font": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-font note-recent-color\"/>", // font icon used in color picer is broken - use default
                "italic": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-italic\"/>",
                "link": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-link\"/>",
                "unlink": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-unlink\"/>",
                "magic": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-magic\"/>",
                "menuCheck": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-check\"/>",
                "minus": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-minus\"/>",
                "orderedlist": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-list-ol\"/>",
                "pencil": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-pencil-alt\"/>",
                "picture": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-image\"/>",
                "question": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-question\"/>",
                "redo": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-redo\"/>",
                "square": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-square\"/>",
                "strikethrough": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-strikethrough\"/>",
                "subscript": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-subscript\"/>",
                'superscript': "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-superscript\"/>",
                "table": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-table\"/>",
                'textHeight': "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-text-height\"/>",
                "trash": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-trash-alt\"/>",
                "underline": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-underline\"/>",
                "undo": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-undo\"/>",
                "unorderedlist": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-list-ul\"/>",
                "video": "<i class=\"" + node.ownerTree.defaultConfig.iconClassPrefix + "-film\"/>"
              }
            });
          }
          if (formElement.summernote && typeof formElement.summernote == 'object') {
            _.extend(summernoteOpts, formElement.summernote);
          }
          $(node.el).find('#' + escapeSelector(node.id)).summernote(summernoteOpts);
          if (node.disabled || node.isReadOnly()) {
            $(node.el).find('#' + escapeSelector(node.id)).summernote('disable');
          }
        };
        setup();
      }
    },
    'ace': {
      'template': '<div id="<%= id %>" style="position:relative;height:<%= elt.height || "300px" %>;"><div id="<%= id %>__ace" style="width:<%= elt.width || "100%" %>;height:<%= elt.height || "300px" %>;"></div><input type="hidden" name="<%= node.name %>" id="<%= id %>__hidden" value="<%= escape(value) %>"/></div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        if (data.value && typeof data.value == 'object' || Array.isArray(data.value))
          data.value = JSON.stringify(data.value, null, 2);
      },
      'onInsert': function(evt, node) {
        var setup = function() {
          var formElement = node.formElement || {};
          var ace = window.ace;
          var editor = ace.edit($(node.el).find('#' + escapeSelector(node.id) + '__ace').get(0));
          var idSelector = '#' + escapeSelector(node.id) + '__hidden';
          // Force editor to use "\n" for new lines, not to bump into ACE "\r" conversion issue
          // (ACE is ok with "\r" on pasting but fails to return "\r" when value is extracted)
          editor.getSession().setNewLineMode('unix');
          editor.renderer.setShowPrintMargin(false);
          editor.setTheme("ace/theme/" + (formElement.aceTheme || "twilight"));

          if (formElement.aceMode) {
            editor.getSession().setMode("ace/mode/" + formElement.aceMode);
          }
          editor.getSession().setTabSize(2);

          // Set the contents of the initial manifest file
          var valueStr = node.value;
          if (valueStr === null || valueStr === undefined)
            valueStr = '';
          else if (typeof valueStr == 'object' || Array.isArray(valueStr))
            valueStr = JSON.stringify(valueStr, null, 2);
          editor.getSession().setValue(valueStr);

          //TODO: this is clearly sub-optimal
          // 'Lazily' bind to the onchange 'ace' event to give
          // priority to user edits
          var lazyChanged = _.debounce(function() {
            $(node.el).find(idSelector).val(editor.getSession().getValue());
            $(node.el).find(idSelector).trigger("change");
          }, 600);
          editor.getSession().on('change', lazyChanged);

          editor.on('blur', function() {
            $(node.el).find(idSelector).trigger("change");
            $(node.el).find(idSelector).trigger("blur");
          });
          editor.on('focus', function() {
            $(node.el).find(idSelector).trigger("focus");
          });
        };

        // Is there a setup hook?
        if (window.jsonform_ace_setup) {
          window.jsonform_ace_setup(setup);
          return;
        }

        // Wait until ACE is loaded
        var itv = window.setInterval(function() {
          if (window.ace) {
            window.clearInterval(itv);
            setup();
          }
        }, 1000);
      }
    },
    'checkbox': {
      'template': '<div class="<%= cls.checkboxWrapClass %>">' +
        '<input ' +
        'class=\'<%= cls.checkboxInputClass %><%= (checkboxTitle ? "" : " position-static") %><%= (fieldHtmlClass ? " " + fieldHtmlClass : "") %>\' ' +
        'type="checkbox" ' +
        'id="<%= id %>" ' +
        'value="1" ' +
        'name="<%= node.name %>" ' +
        'aria-label="<%= node.title ? escape(node.title) : node.name %>" ' +
        '<% if (value) {%>checked <% } %>' +
        '<%= (node.isReadOnly() ? "readonly=\'readonly\' " : "") %>' +
        '<%= (node.disabled || node.isReadOnly() ? "disabled " : "") %>' +
        '<%= (node.required && node.schemaElement && (node.schemaElement.type !== "boolean") ? " required=\'required\'" : "") %>' +
        '/>' +
        '<% if (checkboxTitle) { %>' +
        '<label ' +
        'class="<%= cls.checkboxLabelClass %>" ' +
        'for="<%= id %>">' +
        '<%= checkboxTitle || "" %>' +
        '</label>' +
        '<% } %>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        data.checkboxTitle = node.inlinetitle === true ? node.title : node.inlinetitle;
      },
      'onInsert': function(evt, node) {
        if (node.formElement.toggleNext) {
          var nextN = node.formElement.toggleNext === true ? 1 : node.formElement.toggleNext;
          var toggleNextClass = 'jsonform-toggle-next jsonform-toggle-next-' + nextN;
          var $next = nextN === 1 ? $(node.el).next() : (nextN === 'all' ? $(node.el).nextAll() : $(node.el).nextAll().slice(0, nextN));
          $next.addClass('jsonform-toggle-next-target');
          $(node.el).addClass(toggleNextClass).find(':checkbox').on('change', function() {
            var $this = $(this);
            var checked = $this.is(':checked');
            $(node.el).toggleClass('checked', checked);
            $next.toggle(checked).toggleClass('jsonform-toggled-visible', checked);
          }).trigger("change");
        }
      },
      'getElement': function(el) {
        return $(el).parent().get(0);
      }
    },
    'switch': {
      'template': '<div class="<%= cls.switchWrapClass %>">' +
        '<input ' +
        'class=\'<%= cls.switchInputClass %><%= (fieldHtmlClass ? " " + fieldHtmlClass : "") %>\' ' +
        'type="checkbox" ' +
        'id="<%= id %>" ' +
        'value="1" ' +
        'name="<%= node.name %>" ' +
        'aria-label="<%= node.title ? escape(node.title) : node.name %>" ' +
        '<% if (value) {%>checked <% } %>' +
        '<%= (node.isReadOnly() ? "readonly=\'readonly\' " : "") %>' +
        '<%= (node.disabled || node.isReadOnly() ? "disabled " : "") %>' +
        '<%= (node.required && node.schemaElement && (node.schemaElement.type !== "boolean") ? " required=\'required\'" : "") %>' +
        '/>' +
        '<label ' +
        'class="<%= cls.switchLabelClass %>" ' +
        'for="<%= id %>">' +
        '<%= switchTitle || "" %>' +
        '</label>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        data.switchTitle = node.inlinetitle === true ? node.title : node.inlinetitle;
      },
      'onInsert': function(evt, node) {
        if (node.formElement.toggleNext) {
          var nextN = node.formElement.toggleNext === true ? 1 : node.formElement.toggleNext;
          var toggleNextClass = 'jsonform-toggle-next jsonform-toggle-next-' + nextN;
          var $next = nextN === 1 ? $(node.el).next() : (nextN === 'all' ? $(node.el).nextAll() : $(node.el).nextAll().slice(0, nextN));
          $next.addClass('jsonform-toggle-next-target');
          $(node.el).addClass(toggleNextClass).find(':checkbox').on('change', function() {
            var $this = $(this);
            var checked = $this.is(':checked');
            $(node.el).toggleClass('checked', checked);
            $next.toggle(checked).toggleClass('jsonform-toggled-visible', checked);
          }).trigger("change");
        }
      },
      'getElement': function(el) {
        return $(el).parent().get(0);
      }
    },
    'file': {
      'template': '<input class="input-file form-control-file" id="<%= id %>" name="<%= node.name %>" type="file" ' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '<%= (node.formElement && node.formElement.accept ? (" accept=\'" + node.formElement.accept + "\'") : "") %>' +
        '/>',
      'fieldtemplate': true,
      'inputfield': true
    },
    // TODO: Not currently supported
    // 'file-hosted-public':{
    //   'template':'<span><% if (value && (value.type||value.url)) { %>'+fileDisplayTemplate+'<% } %><input class="input-file" id="_transloadit_<%= id %>" type="file" name="<%= transloaditname %>" /><input data-transloadit-name="_transloadit_<%= transloaditname %>" type="hidden" id="<%= id %>" name="<%= node.name %>" value=\'<%= escape(JSON.stringify(node.value)) %>\' /></span>',
    //   'fieldtemplate': true,
    //   'inputfield': true,
    //   'getElement': function (el) {
    //     return $(el).parent().get(0);
    //   },
    //   'onBeforeRender': function (data, node) {
    //
    //     if (!node.ownerTree._transloadit_generic_public_index) {
    //       node.ownerTree._transloadit_generic_public_index=1;
    //     } else {
    //       node.ownerTree._transloadit_generic_public_index++;
    //     }
    //
    //     data.transloaditname = "_transloadit_jsonform_genericupload_public_"+node.ownerTree._transloadit_generic_public_index;
    //
    //     if (!node.ownerTree._transloadit_generic_elts) node.ownerTree._transloadit_generic_elts = {};
    //     node.ownerTree._transloadit_generic_elts[data.transloaditname] = node;
    //   },
    //   'onChange': function(evt,elt) {
    //     // The "transloadit" function should be called only once to enable
    //     // the service when the form is submitted. Has it already been done?
    //     if (elt.ownerTree._transloadit_bound) {
    //       return false;
    //     }
    //     elt.ownerTree._transloadit_bound = true;
    //
    //     // Call the "transloadit" function on the form element
    //     var formElt = $(elt.ownerTree.domRoot);
    //     formElt.transloadit({
    //       autoSubmit: false,
    //       wait: true,
    //       onSuccess: function (assembly) {
    //         // Image has been uploaded. Check the "results" property that
    //         // contains the list of files that Transloadit produced. There
    //         // should be one image per file input in the form at most.
    //         var results = _.values(assembly.results);
    //         results = _.flatten(results);
    //         _.each(results, function (result) {
    //           // Save the assembly result in the right hidden input field
    //           var id = elt.ownerTree._transloadit_generic_elts[result.field].id;
    //           var input = formElt.find('#' + escapeSelector(id));
    //           var nonEmptyKeys = _.filter(_.keys(result.meta), function (key) {
    //             return !!isSet(result.meta[key]);
    //           });
    //           result.meta = _.pick(result.meta, nonEmptyKeys);
    //           input.val(JSON.stringify(result));
    //         });
    //
    //         // Unbind transloadit from the form
    //         elt.ownerTree._transloadit_bound = false;
    //         formElt.off('submit.transloadit');
    //
    //         // Submit the form on next tick
    //         _.delay(function () {
    //           elt.ownerTree.submit();
    //         }, 10);
    //       },
    //       onError: function (assembly) {
    //         // TODO: report the error to the user
    //         console.log('assembly error', assembly);
    //       }
    //     });
    //   },
    //   'onInsert': function (evt, node) {
    //     $(node.el).find('a._jsonform-delete').on('click', function (evt) {
    //       $(node.el).find('._jsonform-preview').remove();
    //       $(node.el).find('a._jsonform-delete').remove();
    //       $(node.el).find('#' + escapeSelector(node.id)).val('');
    //       evt.preventDefault();
    //       return false;
    //     });
    //   },
    //   'onSubmit':function(evt, elt) {
    //     if (elt.ownerTree._transloadit_bound) {
    //       return false;
    //     }
    //     return true;
    //   }
    //
    // },
    // TODO: Not currently supported
    // 'file-transloadit': {
    //   'template': '<span><% if (value && (value.type||value.url)) { %>'+fileDisplayTemplate+'<% } %><input class="input-file" id="_transloadit_<%= id %>" type="file" name="_transloadit_<%= node.name %>" /><input type="hidden" id="<%= id %>" name="<%= node.name %>" value=\'<%= escape(JSON.stringify(node.value)) %>\' /></span>',
    //   'fieldtemplate': true,
    //   'inputfield': true,
    //   'getElement': function (el) {
    //     return $(el).parent().get(0);
    //   },
    //   'onChange': function (evt, elt) {
    //     // The "transloadit" function should be called only once to enable
    //     // the service when the form is submitted. Has it already been done?
    //     if (elt.ownerTree._transloadit_bound) {
    //       return false;
    //     }
    //     elt.ownerTree._transloadit_bound = true;
    //
    //     // Call the "transloadit" function on the form element
    //     var formElt = $(elt.ownerTree.domRoot);
    //     formElt.transloadit({
    //       autoSubmit: false,
    //       wait: true,
    //       onSuccess: function (assembly) {
    //         // Image has been uploaded. Check the "results" property that
    //         // contains the list of files that Transloadit produced. Note
    //         // JSONForm only supports 1-to-1 associations, meaning it
    //         // expects the "results" property to contain only one image
    //         // per file input in the form.
    //         var results = _.values(assembly.results);
    //         results = _.flatten(results);
    //         _.each(results, function (result) {
    //           // Save the assembly result in the right hidden input field
    //           var input = formElt.find('input[name="' +
    //             result.field.replace(/^_transloadit_/, '') +
    //             '"]');
    //           var nonEmptyKeys = _.filter(_.keys(result.meta), function (key) {
    //             return !!isSet(result.meta[key]);
    //           });
    //           result.meta = _.pick(result.meta, nonEmptyKeys);
    //           input.val(JSON.stringify(result));
    //         });
    //
    //         // Unbind transloadit from the form
    //         elt.ownerTree._transloadit_bound = false;
    //         formElt.off('submit.transloadit');
    //
    //         // Submit the form on next tick
    //         _.delay(function () {
    //           elt.ownerTree.submit();
    //         }, 10);
    //       },
    //       onError: function (assembly) {
    //         // TODO: report the error to the user
    //         console.log('assembly error', assembly);
    //       }
    //     });
    //   },
    //   'onInsert': function (evt, node) {
    //     $(node.el).find('a._jsonform-delete').on('click', function (evt) {
    //       $(node.el).find('._jsonform-preview').remove();
    //       $(node.el).find('a._jsonform-delete').remove();
    //       $(node.el).find('#' + escapeSelector(node.id)).val('');
    //       evt.preventDefault();
    //       return false;
    //     });
    //   },
    //   'onSubmit': function (evt, elt) {
    //     if (elt.ownerTree._transloadit_bound) {
    //       return false;
    //     }
    //     return true;
    //   }
    // },
    'select': {
      'template': '<% if (cls.selectWrapClass) { %><div class="<%= cls.selectWrapClass %>"><% } %>' +
        '<select name="<%= node.name %>" id="<%= id %>"' +
        ' class="<%= fieldHtmlClass || cls.textualInputClass %>"' +
        '<%= (node.schemaElement && node.schemaElement.disabled? " disabled" : "")%>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '> ' +
        '<% _.each(node.options, function(key, val) { if(key instanceof Object) { if (value === key.value) { %> <option selected value="<%= key.value %>"><%= key.title %></option> <% } else { %> <option value="<%= key.value %>"><%= key.title %></option> <% }} else { if (value === key) { %> <option selected value="<%= key %>"><%= key %></option> <% } else { %><option value="<%= key %>"><%= key %></option> <% }}}); %> ' +
        '</select>' +
        '<% if (cls.selectWrapClass) { %></div><% } %>',
      'fieldtemplate': true,
      'inputfield': true
    },
    'tagsinput': {
      'template': '<select name="<%= node.name %><%= node.formElement.getValue === "tagsinput" ? "" : "[]" %>" id="<%= id %>"' +
        ' class="<%= fieldHtmlClass || cls.textualInputClass %>" multiple' +
        '<%= (node.disabled? " disabled" : "")%>' +
        '<%= (node.required ? " required=\'required\'" : "") %>' +
        '> ' +
        '</select>',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        if (!$.fn.tagsinput)
          throw new Error('tagsinput is not found');
        var $input = $(node.el).find('select');
        var tagsinputOpts = {};
        if (node.schemaElement && node.schemaElement.type === 'array') {
          if (node.schemaElement.maxItems && node.schemaElement.maxItems > -1)
            tagsinputOpts.maxTags = node.schemaElement.maxItems;
          tagsinputOpts.allowDuplicates = !node.schemaElement.uniqueItems;
          if (typeof node.schemaElement.items === 'object' && node.schemaElement.items.type === 'string')
            tagsinputOpts.maxChars = (node.schemaElement.items.maxLength && node.schemaElement.items.maxLength > -1) ? node.schemaElement.items.maxLength : undefined;
        }
        if (node.formElement && node.formElement.tagsinput) {
          _.extend(tagsinputOpts, node.formElement.tagsinput);
        }
        $input.tagsinput(tagsinputOpts);
        if (node.value) {
          node.value.forEach(function(value) {
            $input.tagsinput('add', value);
          });
        }
      }
    },
    'imageselect': {
      'template': '<div>' +
        '<input type="hidden" name="<%= node.name %>" id="<%= node.id %>" value="<%= value %>" />' +
        '<div class="dropdown">' +
        '<a class="btn <%= cls.buttonClass %> <%= cls.dropdownInputClass %>" data-toggle="dropdown" href="#"<% if (node.value) { %> style="max-width:<%= width %>px;max-height:<%= height %>px"<% } %>>' +
        '<% if (node.value) { %><img class="<%= cls.imgResponsiveClass %>" src="<% if (!node.value.match(/^https?:/)) { %><%= prefix %><% } %><%= node.value %><%= suffix %>" alt="" /><% } else { %><%= buttonTitle %><% } %>' +
        '</a>' +
        '<div class="dropdown-menu <%= cls.dropdownMenuClass %>" id="<%= node.id %>_dropdown">' +
        '<div>' +
        '<% _.each(node.options, function(key, idx) { if ((idx > 0) && ((idx % columns) === 0)) { %></div><div><% } %><a class="btn<% if (buttonClass) { %> <%= buttonClass %><% } %>" style="max-width:<%= width %>px;max-height:<%= height %>px"><% if (key instanceof Object) { %><img class="<%= cls.imgResponsiveClass %>" src="<% if (!key.value.match(/^https?:/)) { %><%= prefix %><% } %><%= key.value %><%= suffix %>" alt="<%= key.title %>" /></a><% } else { %><img class="<%= cls.imgResponsiveClass %>" src="<% if (!key.match(/^https?:/)) { %><%= prefix %><% } %><%= key %><%= suffix %>" alt="" /><% } %></a> <% }); %>' +
        '</div>' +
        '<div class="<%= cls.placementClassPrefix %>-right"><a class="btn <%= cls.buttonClass %>">Reset</a></div>' +
        '</div>' +
        '</div>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        var elt = node.formElement || {};
        var nbRows = null;
        var maxColumns = elt.imageSelectorColumns || 5;
        data.buttonTitle = elt.imageSelectorTitle || 'Select...';
        data.prefix = elt.imagePrefix || '';
        data.suffix = elt.imageSuffix || '';
        data.width = elt.imageWidth || 32;
        data.height = elt.imageHeight || 32;
        data.buttonClass = elt.imageButtonClass || false;
        if (node.options.length > maxColumns) {
          nbRows = Math.ceil(node.options.length / maxColumns);
          data.columns = Math.ceil(node.options.length / nbRows);
        } else {
          data.columns = maxColumns;
        }
      },
      'getElement': function(el) {
        return $(el).parent().get(0);
      },
      'onInsert': function(evt, node) {
        $(node.el).on('click', '.dropdown-menu a', function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          var img = (evt.target.nodeName.toLowerCase() === 'img') ?
            $(evt.target) :
            $(evt.target).find('img');
          var value = img.attr('src');
          var elt = node.formElement || {};
          var prefix = elt.imagePrefix || '';
          var suffix = elt.imageSuffix || '';
          var width = elt.imageWidth || 32;
          var height = elt.imageHeight || 32;
          if (value) {
            if (value.indexOf(prefix) === 0) {
              value = value.substring(prefix.length);
            }
            value = value.substring(0, value.length - suffix.length);
            $(node.el).find('input').attr('value', value);
            $(node.el).find('a[data-toggle="dropdown"]')
              .attr('style', 'max-width:' + width + 'px;max-height:' + height + 'px')
              .html('<img class="' + node.ownerTree.defaultConfig.imgResponsiveClass + '" src="' + (!value.match(/^https?:/) ? prefix : '') + value + suffix + '" alt="" />')
              .dropdown('hide');
          } else {
            $(node.el).find('input').attr('value', '');
            $(node.el).find('a[data-toggle="dropdown"]')
              .removeAttr('style')
              .html(elt.imageSelectorTitle || 'Select...')
              .dropdown('hide');
          }
        });
      }
    },
    'iconselect': {
      'template': '<div>' +
        '<input type="hidden" name="<%= node.name %>" id="<%= node.id %>" value="<%= value %>" />' +
        '<div class="dropdown">' +
        '<a class="btn <%= cls.buttonClass %> <%= cls.dropdownInputClass %>" data-toggle="dropdown" href="#">' +
        '<% if (node.value) { %><i class="<%= cls.iconClassPrefix %>-<%= node.value %><% if (isFaIcon) { %> fa-fw<% } %>" alt="" /><% } else { %><%= buttonTitle %><% } %>' +
        '</a>' +
        '<div class="dropdown-menu <%= cls.dropdownMenuClass %>" id="<%= node.id %>_dropdown">' +
        '<div>' +
        '<% _.each(node.options, function(key, idx) { if ((idx > 0) && ((idx % columns) === 0)) { %></div><div><% } %><a class="btn<% if (buttonClass) { %> <%= buttonClass %><% } %>"><% if (key instanceof Object) { %><i class="<%= cls.iconClassPrefix %>-<%= key.value %><% if (isFaIcon) { %> fa-fw<% } %>" alt="<%= key.title %>"></i><% } else { %><i class="<%= cls.iconClassPrefix %>-<%= key %><% if (isFaIcon) { %> fa-fw<% } %>" alt=""></i><% } %></a> <% }); %>' +
        '</div>' +
        '<div class="<%= cls.placementClassPrefix %>-right"><a class="btn <%= cls.buttonClass %>">Reset</a></div>' +
        '</div>' +
        '</div>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        var elt = node.formElement || {};
        var nbRows = null;
        var maxColumns = elt.imageSelectorColumns || 5;
        data.buttonTitle = elt.imageSelectorTitle || 'Select...';
        data.buttonClass = elt.imageButtonClass || false;
        data.isFaIcon = data.cls.iconClassPrefix.slice(-2) === 'fa' ? true : false;
        if (node.options.length > maxColumns) {
          nbRows = Math.ceil(node.options.length / maxColumns);
          data.columns = Math.ceil(node.options.length / nbRows);
        } else {
          data.columns = maxColumns;
        }
      },
      'getElement': function(el) {
        return $(el).parent().get(0);
      },
      'onInsert': function(evt, node) {
        $(node.el).on('click', '.dropdown-menu a', function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          var i = (evt.target.nodeName.toLowerCase() === 'i') ?
            $(evt.target) :
            $(evt.target).find('i');
          var value = i.attr('class');
          var elt = node.formElement || {};
          var isFaIcon = node.ownerTree.defaultConfig.iconClassPrefix.slice(-2) === 'fa' ? true : false;
          if (value) {
            if (value.indexOf(node.ownerTree.defaultConfig.iconClassPrefix) === 0) {
              value = value.substring(node.ownerTree.defaultConfig.iconClassPrefix.length + 1);
            }
            if (isFaIcon) {
              value = value.substring(0, value.length - ' fa-fw'.length);
            }
            $(node.el).find('input').attr('value', value);
            $(node.el).find('a[data-toggle="dropdown"]')
              .html('<i class="' + node.ownerTree.defaultConfig.iconClassPrefix + '-' + value + (isFaIcon ? ' fa-fw' : '') + '" alt="" />')
              .dropdown('hide');
          } else {
            $(node.el).find('input').attr('value', '');
            $(node.el).find('a[data-toggle="dropdown"]')
              .html(elt.imageSelectorTitle || 'Select...')
              .dropdown('hide');
          }
        });
      }
    },
    'radios': {
      'template': '<div id="<%= node.id %>"<% if (elt.inline) { %> class="<%= cls.formInlineClass %>"<% } %>>' +
        '<% _.each(node.options, function(key, val) { %>' +
        '<div class="<% if (elt.inline) { %><%= cls.radioWrapInlineClass %><% } else { %><%= cls.radioWrapClass %><% } %>">' +
        '<input ' +
        'class=\'<%= cls.radioInputClass %><%= (fieldHtmlClass ? " " + fieldHtmlClass : "") %>\' ' +
        'type="radio" ' +
        'id="<%= node.id %>_<%= escape(key instanceof Object ? key.title : key) %>" ' +
        'value="<%= (key instanceof Object ? key.value : key) %>" ' +
        'name="<%= node.name %>" ' +
        'aria-label="<%= (key instanceof Object ? key.title : key) %>" ' +
        '<% if (((key instanceof Object) && (value === key.value)) || (value === key)) { %>' +
        'checked="checked" ' +
        '<% } else { %>' +
        '<%= (node.isReadOnly() ? "disabled " : "") %>' +
        '<% } %>' +
        '<%= (node.disabled ? "disabled " : "") %>' +
        '<%= (node.required ? "required=\'required\'" : "") %>' +
        '/>' +
        '<label ' +
        'class="<%= cls.radioLabelClass %>" ' +
        'for="<%= node.id %>_<%= escape(key instanceof Object ? key.title : key) %>">' +
        '<%= (key instanceof Object ? key.title : key) %>' +
        '</label>' +
        '</div>' +
        '<% }); %>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        if (node.formElement.toggleNextMap) {
          var valueMapToNext = {};
          var toggleNextClass;
          for (var value in node.formElement.toggleNextMap) {
            var toggleNext = node.formElement.toggleNextMap[value];
            var nextN = toggleNext === true ? 1 : toggleNext;
            toggleNextClass = 'jsonform-toggle-next jsonform-toggle-next-' + nextN;
            var $next = nextN === 1 ? $(node.el).next() : (nextN === 'all' ? $(node.el).nextAll() : $(node.el).nextAll().slice(0, nextN));
            $next.addClass('jsonform-toggle-next-target');
            valueMapToNext[value] = $next;
          }
          $(node.el).addClass(toggleNextClass).find(':radio').on('change', function() {
            var $this = $(this);
            var val = $this.val();
            var checked = $this.is(':checked');
            for (var v in valueMapToNext) {
              var $n = valueMapToNext[v];
              if (checked && v === val) {
                $n.toggle(true).toggleClass('jsonform-toggled-visible', true);
              } else {
                // no option checked yet (or not given value)
                $n.toggle(false).toggleClass('jsonform-toggled-visible', false);
              }
            }
          }).trigger("change");
        }
      }
    },
    'radiobuttons': {
      'template': '<div id="<%= node.id %>" class="<%= cls.buttonGroupClass %> btn-group-toggle" data-toggle="buttons">' +
        '<% _.each(node.options, function(key, val) { %>' +
        '<label class="btn <% if (((key instanceof Object) && (value === key.value)) || (value === key)) { %>active <%= elt.activeClass ? elt.activeClass : cls.buttonClass %><% } else { %><%= cls.buttonClass %><% } %><%= (node.disabled || node.isReadOnly() ? " disabled" : "") %>">' +
        '<input ' +
        'type="radio" ' +
        'style="position:absolute;left:-9999px;" ' +
        '<%= (fieldHtmlClass ? "class=\'" + fieldHtmlClass + "\' ": "") %>' +
        'name="<%= node.name %>" ' +
        'value="<%= (key instanceof Object ? key.value : key) %>" ' +
        '<% if (((key instanceof Object) && (value === key.value)) || (value === key)) { %>checked="checked" <% } %>' +
        '<%= (node.disabled ? "disabled" : "") %>' +
        '/>' +
        '<%= (key instanceof Object ? key.title : key) %>' +
        '</label> ' +
        '<% }); %>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onInsert': function(evt, node) {
        if (!(node.disabled || node.isReadOnly())) {
          var activeClass = 'active';
          var elt = node.formElement || {};
          if (elt.activeClass) {
            activeClass += ' ' + elt.activeClass;
          } else {
            activeClass += ' ' + node.ownerTree.defaultConfig.buttonClass;
          }
          $(node.el).find('label.btn').on('click', function() {
            $(this).parent().find('label.btn').removeClass(activeClass).addClass(node.ownerTree.defaultConfig.buttonClass);
            $(this).removeClass(node.ownerTree.defaultConfig.buttonClass).addClass(activeClass);
          }).find(':checked').closest('label.btn').addClass(activeClass);
        }
      }
    },
    'checkboxes': {
      'template': '<div id="<%= node.id %>"<% if (elt.inline) { %> class="<%= cls.formInlineClass %>"<% } %>><%= choiceshtml %><%= children %></div>',
      'fieldtemplate': true,
      'inputfield': true,
      'childTemplate': function(inner, node) {
        // non-inline style, we do not wrap it.
        if (!node.formElement.otherField)
          return inner;
        // wrapping tag
        var template = '<div class="' + (node.formElement.inline ? '<%= cls.checkboxWrapInlineClass %>' : '<%= cls.checkboxWrapClass %>') + (node.formElement.otherField.inline ? ' inline-' : ' ') + 'other-field">';
        if (node.formElement.otherField.asArrayValue) {
          // XXX: for the novalue mode, the checkbox has no value, value is in the input field
          if (node.otherValues) {
            template += '<% value = node.parentNode.otherValues.join(", ") %>';
          }
        }
        var otherFieldName = node.key + '[' + (node.formElement.otherField.idx !== undefined ? node.formElement.otherField.idx : node.formElement.options.length) + ']';
        // input
        template += '<input ' +
          'class=\'<%= cls.checkboxInputClass %><%= (fieldHtmlClass ? " " + fieldHtmlClass : "") %>\' ' +
          'type="checkbox" ' +
          'id="' + otherFieldName + '" ' +
          'aria-label="<%= node.title || "Other" %>" ' +
          '<% if ((value !== undefined) && (value !== null) && (value !== "")) {%>' +
          'checked="checked" ' +
          '<% } else { %>' +
          '<%= (node.isReadOnly() ? "disabled " : "") %>' +
          '<% } %>' +
          '<%= (node.disabled ? "disabled " : "") %>';
        if (!node.formElement.otherField.asArrayValue && node.formElement.otherField.novalue !== true || node.formElement.otherField.novalue === false) {
          template += ' name="' + otherFieldName + '" value="' + (node.formElement.optionsAsEnumOrder ? 1 : (node.formElement.otherField.otherValue || 'OTHER')) + '"';
        }
        template += '/>';
        // label
        template += '<label class="<%= cls.checkboxLabelClass %>" for="' + otherFieldName + '"><%= node.title || "Other" %></label>';
        // end wrapping tag and insert other field content
        if (node.formElement.otherField.inline) {
          // put the other field inside wrapping tag
          template += '<div class="other-field-content">' + inner + '</div>';
          template += '</div>';
        } else {
          // put the other field just after wrapping tag
          template += '</div>';
          template += '<div class="other-field-content">' + inner + '</div>';
        }
        return template;
      },
      'onBeforeRender': function(data, node) {
        // Build up choices from the enumeration/options list
        if (!node || !node.schemaElement) return;
        var choices = node.formElement.options;
        if (!choices) return;

        var template = '<div class="' + (node.formElement.inline ? data.cls.checkboxWrapInlineClass : data.cls.checkboxWrapClass) + '">' +
          '<input ' +
          'class=\'' + data.cls.checkboxInputClass + '<%= (title ? "" : " position-static") %><%= (node.formElement.fieldHtmlClass ? " " + node.formElement.fieldHtmlClass : "") %>\' ' +
          'type="checkbox" ' +
          'id="<%= name %>" ' +
          'value="<%= escape(value) %>" ' +
          'name="<%= name %>" ' +
          'aria-label="<%= title ? escape(title) : name %>" ' +
          '<% if (checked) {%>' +
          'checked="checked" ' +
          '<% } else { %>' +
          '<%= (node.isReadOnly() ? "disabled " : "") %>' +
          '<% } %>' +
          '<%= (node.disabled ? "disabled" : "") %>' +
          '/>' +
          '<% if (title) { %>' +
          '<label ' +
          'class="' + data.cls.checkboxLabelClass + '" ' +
          'for="<%= name %>">' +
          '<%= title || "" %>' +
          '</label>' +
          '<% } %>' +
          '</div>';

        var choiceshtml = '';
        if (node.formElement.otherField && node.formElement.otherField.asArrayValue && node.value) {
          var choiceValues = choices.map(function(choice) {
            return choice.value;
          });
          // we detect values which are not within our choice values.
          var otherValues = [];
          node.value.forEach(function(val) {
            if (!_.include(choiceValues, val)) {
              otherValues.push(val);
            }
          });
          if (otherValues.length > 0)
            node.otherValues = otherValues;
        } else
          delete node.otherValues;
        _.each(choices, function(choice, idx) {
          if (node.formElement.otherField && choice.value === (node.formElement.otherField.otherValue || 'OTHER')) {
            node.formElement.otherField.idx = idx;
            return;
          }

          choiceshtml += _.template(template, fieldTemplateSettings)({
            name: node.key + '[' + idx + ']',
            value: node.formElement.optionsAsEnumOrder ? 1 : choice.value,
            checked: _.include(node.value, choice.value),
            title: choice.title,
            node: node,
            escape: escapeHTML
          });
        });

        // the otherField could be?
        // 1. key, then use the key as inputField? wrap or not? type?
        // 2. {key: theKey, inline: boolean} type?
        // 2.1 about the type, can it be text type? if so, it will use the title, the template
        //     etc. it's good, but we do not want the title, then use notitle?
        // 3. {nokey, items: [custom elementes]} type?
        if (node.formElement.otherField) {
          // XXX: other field rendered as child, with its own template? e.g. text input
          // Then what about the "Other" checkbox? there are options:
          // 1. "Other" checkbox was rendered already by the options, then the otherField
          //    will following last checkbox div or label (inline), and we need code to
          //    connect between the checkbox and the input.
          // 2. "Other" checkbox render with the textField together? embed the text field
          //    into the "Other" checkbox's label, but HOW?
          // 2.1 with childTemplate, the child text input field can be wrappered, but what
          //     should be for the checkbox's name, value, disabled, title, checked?
          // 2.1.1 title, checked, disabled == text field title, non-blank, disabled
          //       value can be non-value or some special value
          // 2.2 should the value be collected? and how?
          //     it's better it can be collected as a member of the array, maybe special value
          //     how the checkbox array got result value?
          // 2.2.1 if as_value collect, as it follow the name style here node.key[idx]
          //       its value can be collected.
          //       if as_value===true get value from enum then if it's previous rendered
          //       as the last item of enum, then it can get its value too.
        }

        data.choiceshtml = choiceshtml;
      },
      'onInsert': function(evt, node) {
        // FIXME: consider default values?
        function inputHasAnyValue(inputs) {
          var anyValue = false;
          inputs.each(function() {
            var $input = $(this);
            if ($input.is(':checkbox, :radio')) {
              if ($input.prop('checked')) {
                anyValue = true;
                return false;
              }
            }
            if ($input.is('button'))
              return;
            if ($(this).val() !== '') {
              anyValue = true;
              return false;
            }
          });
          return anyValue;
        }
        var $checkbox = node.formElement.otherField && node.formElement.otherField.inline ? $(node.el).find('.inline-other-field :checkbox').first() : $(node.el).find('.other-field :checkbox');
        var $inputs = $(node.el).find('.other-field-content :input');

        function otherFieldValueChange() {
          $checkbox.prop('checked', inputHasAnyValue($inputs));
        }
        $inputs.on('keyup', otherFieldValueChange).on('change', otherFieldValueChange).trigger("change");

        $checkbox.on('change', function() {
          if (this.checked) {
            this.checked = false;
            $inputs.not(':checkbox,:radio,button').trigger("focus");
          } else {
            // FIXME: reset back to default?
            $inputs.filter('input[type=text], textarea').val('');
          }
        });
      }
    },
    'checkboxbuttons': {
      'template': '<div id="<%= node.id %>" class="<%= cls.buttonGroupClass %> btn-group-toggle" data-toggle="buttons"><%= choiceshtml %></div>',
      'fieldtemplate': true,
      'inputfield': true,
      'onBeforeRender': function(data, node) {
        // Build up choices from the enumeration list
        var choices = null;
        var choiceshtml = null;
        var template = '<label class="btn <% if (checked) { %>active <%= node.formElement && node.formElement.activeClass ? node.formElement.activeClass : cls.buttonClass %><% } else { %><%= cls.buttonClass %><% } %><%= (node.disabled || node.isReadOnly() ? " disabled" : "") %>">' +
          '<input type="checkbox" style="position:absolute;left:-9999px;" ' + (data.fieldHtmlClass ? 'class="' + data.fieldHtmlClass + '" ' : '') +
          '<% if (checked) { %> checked="checked" <% } %> name="<%= name %>" value="<%= value %>" <%= (node.disabled ? "disabled" : "") %>' +
          '/><%= title %></label> ';
        if (!node || !node.schemaElement) return;
        choices = node.formElement.options;
        if (!choices) return;
        if (!node.value || !Array.isArray(node.value))
          node.value = [];
        choiceshtml = '';
        _.each(choices, function(choice, idx) {
          choiceshtml += _.template(template, fieldTemplateSettings)({
            name: node.key + '[' + idx + ']',
            checked: _.include(node.value, choice.value),
            value: choice.value,
            title: choice.title,
            node: node,
            cls: data.cls
          });
        });

        data.choiceshtml = choiceshtml;
      },
      'onInsert': function(evt, node) {
        var elt = node.formElement || {};
        var activeClass = elt.activeClass || node.ownerTree.defaultConfig.buttonClass;
        $(node.el).find('label.btn').on('click', function() {
          if ($(this).find('input:checkbox').prop('checked')) {
            $(this).removeClass(node.ownerTree.defaultConfig.buttonClass);
            $(this).toggleClass(activeClass, true);
          } else {
            $(this).toggleClass(activeClass, false);
            $(this).addClass(node.ownerTree.defaultConfig.buttonClass);
          }
        }).find(':checked').closest('label.btn').addClass(activeClass);
      }
    },
    'array': {
      'template': '<div id="<%= id %>"><ul class="_jsonform-array-ul" style="list-style-type:none;"><%= children %></ul>' +
        '<% if (!node.isReadOnly()) { %><span class="_jsonform-array-buttons">' +
        '<a href="#" class="btn <%= cls.buttonClass %> _jsonform-array-addmore"><i class="<%= cls.iconClassPrefix %>-plus" title="<%= node.formElement.addMoreTooltip ? escape(node.formElement.addMoreTooltip) : \'Add new item\'%>"></i> <%= node.formElement.addMoreTitle || \'\'%></a> ' +
        '</span><% } %>' +
        '</div>',
      'fieldtemplate': true,
      'array': true,
      'childTemplate': function(inner, node) {
        // insert legend if defined
        var child_tmpl = '<span class="_jsonform-array-legend"><%= escape(node.legend) || "" %></span> ';
        if (!node.isReadOnly()) {
          // Insert a "draggable" icon only if drag is enabled
          if ($('').sortable && (!isSet(node.formElement.draggable) || node.formElement.draggable)) {
            child_tmpl += '<span class="draggable line"><i class="<%= cls.iconClassPrefix %>-list" title="Move item"></i></span> ';
          }
          // insert remove button
          child_tmpl += '<a href="#" class="_jsonform-array-item-delete"><i class="<%= cls.iconClassPrefix %>-trash" title="Remove item"></i></a>';
        }
        return '<li data-idx="<%= node.childPos %>">' + child_tmpl + inner + '</li>';
      },
      'onInsert': function(evt, node) {
        var $nodeid = $(node.el).find('#' + escapeSelector(node.id));
        var boundaries = node.getArrayBoundaries();
        var addMoreSelector = '> span > a._jsonform-array-addmore';
        var itemDeleteSelector = '> ul > li > a._jsonform-array-item-delete';

        // Switch two nodes in an array
        var moveNodeTo = function(fromIdx, toIdx) {
          // Note "switchValuesWith" extracts values from the DOM since field
          // values are not synchronized with the tree data structure, so calls
          // to render are needed at each step to force values down to the DOM
          // before next move.
          // TODO: synchronize field values and data structure completely and
          // call render only once to improve efficiency.
          if (fromIdx === toIdx) return;
          var incr = (fromIdx < toIdx) ? 1 : -1;
          var i = 0;
          var parentEl = $('> ul', $nodeid);
          for (i = fromIdx; i !== toIdx; i += incr) {
            node.children[i].switchValuesWith(node.children[i + incr]);
            node.children[i].render(parentEl.get(0));
            node.children[i + incr].render(parentEl.get(0));
          }

          // No simple way to prevent DOM reordering with jQuery UI Sortable,
          // so we're going to need to move sorted DOM elements back to their
          // origin position in the DOM ourselves (we switched values but not
          // DOM elements)
          var fromEl = $(node.children[fromIdx].el);
          var toEl = $(node.children[toIdx].el);
          fromEl.detach();
          toEl.detach();
          if (fromIdx < toIdx) {
            if (fromIdx === 0) parentEl.prepend(fromEl);
            else $(node.children[fromIdx - 1].el).after(fromEl);
            $(node.children[toIdx - 1].el).after(toEl);
          } else {
            if (toIdx === 0) parentEl.prepend(toEl);
            else $(node.children[toIdx - 1].el).after(toEl);
            $(node.children[fromIdx - 1].el).after(fromEl);
          }
        };

        // refresh the list
        var updateList = function() {
          _.each(node.children, function(child, idx) {
            $('> ul._jsonform-array-ul > li[data-idx="' + idx + '"] > span._jsonform-array-legend', $nodeid).html(escapeHTML(child.legend || ""));
          });
          var canDelete = boundaries.minItems >= 0 && node.children.length <= boundaries.minItems;
          $nodeid.find(itemDeleteSelector).toggle(!canDelete);
        };

        // Deletes item
        var deleteItem = function(idx) {
          var itemNumCanDelete = node.children.length - Math.max(boundaries.minItems, 0);
          $nodeid.find(itemDeleteSelector).toggle(itemNumCanDelete > 1);
          if (itemNumCanDelete < 1) {
            return false;
          }

          node.deleteArrayItem(idx);
          updateList();

          $nodeid.find(addMoreSelector)
            .toggleClass('disabled', boundaries.maxItems >= 0 && node.children.length >= boundaries.maxItems);
        };

        // Adds item
        var addItem = function(idx) {
          if (boundaries.maxItems >= 0) {
            var slotNum = boundaries.maxItems - node.children.length;
            $nodeid.find(addMoreSelector)
              .toggleClass('disabled', slotNum <= 1);
            if (slotNum < 1) {
              return false;
            }
          }

          node.insertArrayItem(idx, $('> ul', $nodeid).get(0));
          if (node.ownerTree.defaultConfig.useTooltip) {
            initializeTooltip();
          }

          updateList();
        };

        $nodeid
          .off('click', addMoreSelector)
          .on('click', addMoreSelector, function(evt) {
            var idx = node.children.length;
            evt.preventDefault();
            evt.stopPropagation();
            addItem(idx);
          });

        $nodeid
          .off('click', itemDeleteSelector)
          .on('click', itemDeleteSelector, function(e) {
            e.preventDefault();
            e.stopPropagation();
            var idx = $(e.currentTarget).parent().data('idx');
            deleteItem(idx);
          });

        $(node.el).on('legendUpdated', function(evt) {
          updateList();
          evt.preventDefault();
          evt.stopPropagation();
        });

        // only allow drag if default or enabled
        if (!isSet(node.formElement.draggable) || node.formElement.draggable) {
          if (!node.isReadOnly() && $(node.el).sortable) {
            $('> ul', $nodeid).sortable();
            $('> ul', $nodeid).on('sortstop', function(event, ui) {
              var idx = $(ui.item).data('idx');
              var newIdx = $(ui.item).index();
              moveNodeTo(idx, newIdx);
              updateList();
            });
          }
        }

        // Simulate User's click to setup the form with its minItems
        if (boundaries.minItems >= 0) {
          for (var i = node.children.length; i < boundaries.minItems; i++) {
            addItem(node.children.length);
          }
        }
        updateList();

        $nodeid.find(addMoreSelector)
          .toggleClass('disabled', boundaries.maxItems >= 0 && node.children.length >= boundaries.maxItems);
        var canDelete = boundaries.minItems >= 0 && node.children.length <= boundaries.minItems;
        $nodeid.find(itemDeleteSelector).toggle(!canDelete);
      }
    },
    'tabarray': {
      'template': '<div id="<%= id %>"><div class="jsonform-tabbable">' +
        '<ul class="nav <%= cls.navTabsClass %>">' +
        '<%= tabs %>' +
        '</ul>' +
        '<div style="clear: both;"></div>' +
        '<div class="tab-content">' +
        '<%= children %>' +
        '</div>' +
        '</div>' +
        '</div>',
      'fieldtemplate': true,
      'array': true,
      'childTemplate': function(inner) {
        return '<div data-idx="<%= node.childPos %>" class="tab-pane">' +
          inner +
          '</div>';
      },
      'onBeforeRender': function(data, node) {
        data.tabs = '';
      },
      'onInsert': function(evt, node) {
        var $nodeid = $(node.el).find('#' + escapeSelector(node.id));
        var boundaries = node.getArrayBoundaries();
        var addMoreSelector = '> .jsonform-tabbable > ul.nav > li > ._jsonform-array-addmore';
        var itemDeleteSelector = '> .jsonform-tabbable > ul.nav > li > a > ._jsonform-array-item-delete';

        // Switch two nodes in an tabarray
        var moveNodeTo = function(fromIdx, toIdx) {
          // Note "switchValuesWith" extracts values from the DOM since field
          // values are not synchronized with the tree data structure, so calls
          // to render are needed at each step to force values down to the DOM
          // before next move.
          // TODO: synchronize field values and data structure completely and
          // call render only once to improve efficiency.
          if (fromIdx === toIdx) return;
          var incr = (fromIdx < toIdx) ? 1 : -1;
          var i = 0;
          var tabEl = $('> .jsonform-tabbable > .tab-content', $nodeid).get(0);
          for (i = fromIdx; i !== toIdx; i += incr) {
            node.children[i].switchValuesWith(node.children[i + incr]);
            node.children[i].render(tabEl);
            node.children[i + incr].render(tabEl);
          }
        };

        // Refreshes the list of tabs
        var updateTabs = function(selIdx) {
          var tabs = '';
          var activateFirstTab = false;
          if (selIdx === undefined) {
            selIdx = $('> .jsonform-tabbable > ul.nav .active', $nodeid).data('idx');
            if (selIdx) {
              selIdx = parseInt(selIdx, 10);
            } else {
              activateFirstTab = true;
              selIdx = 0;
            }
          }
          if (selIdx >= node.children.length) {
            selIdx = node.children.length - 1;
          }
          _.each(node.children, function(child, idx) {
            $('> .jsonform-tabbable > .tab-content > [data-idx="' + idx + '"] > fieldset > legend', $nodeid).html(child.legend);
            var title = child.legend || child.title || ('Item ' + (idx + 1));
            tabs += '<li class="tabwrap ' + node.ownerTree.defaultConfig.navItemClass + '" data-idx="' + idx + '">' +
              '<a class="draggable tab ' + node.ownerTree.defaultConfig.navLinkClass + '" data-toggle="tab" rel="' + escape(title) + '">' +
              escapeHTML(title);
            if (!node.isReadOnly()) {
              tabs += ' <span href="#" class="_jsonform-array-item-delete"><i class="' +
                node.ownerTree.defaultConfig.iconClassPrefix + '-trash" title="Remove item"></i></span>' +
                '</a>';
            }
            tabs += '</li>';
          });
          if (!node.isReadOnly() && (boundaries.maxItems < 0 || node.children.length < boundaries.maxItems)) {
            tabs += '<li class="tabwrap ' + node.ownerTree.defaultConfig.navItemClass + '" data-idx="-1"><a class="tab ' + node.ownerTree.defaultConfig.navLinkClass + ' _jsonform-array-addmore" title="' + (node.formElement.addMoreTooltip ? escapeHTML(node.formElement.addMoreTooltip) : 'Add new item') + '"><i class="' +
              node.ownerTree.defaultConfig.iconClassPrefix + '-plus"></i> ' + (node.formElement.addMoreTitle || 'New') + '</a></li>';
          }
          $('> .jsonform-tabbable > ul.nav', $nodeid).html(tabs);
          var canDelete = boundaries.minItems >= 0 && node.children.length <= boundaries.minItems;
          $nodeid.find(itemDeleteSelector).toggle(!canDelete);
          if (activateFirstTab) {
            $('> .jsonform-tabbable > ul.nav [data-idx="0"]', $nodeid).addClass('active').find('> a').addClass('active');
          }
          $('> .jsonform-tabbable > ul.nav [data-toggle="tab"]', $nodeid).eq(selIdx).trigger("click");
        };

        // Deletes item
        var deleteItem = function(idx) {
          var itemNumCanDelete = node.children.length - Math.max(boundaries.minItems, 0);
          $nodeid.find(itemDeleteSelector).toggle(itemNumCanDelete > 1);
          if (itemNumCanDelete < 1) {
            return false;
          }

          node.deleteArrayItem(idx);
          updateTabs();

          $nodeid.find(addMoreSelector)
            .toggleClass('disabled', boundaries.maxItems >= 0 && node.children.length >= boundaries.maxItems);
        };

        // Adds item
        var addItem = function(idx) {
          if (boundaries.maxItems >= 0) {
            var slotNum = boundaries.maxItems - node.children.length;
            $nodeid.find(addMoreSelector)
              .toggleClass('disabled', slotNum <= 1);
            if (slotNum < 1) {
              return false;
            }
          }

          node.insertArrayItem(idx, $nodeid.find('> .jsonform-tabbable > .tab-content').get(0));
          if (node.ownerTree.defaultConfig.useTooltip) {
            initializeTooltip();
          }

          updateTabs(idx);
        };

        $nodeid
          .off('click', addMoreSelector)
          .on('click', addMoreSelector, function(evt) {
            var idx = node.children.length;
            evt.preventDefault();
            evt.stopPropagation();
            addItem(idx);
          });

        $nodeid
          .off('click', itemDeleteSelector)
          .on('click', itemDeleteSelector, function(e) {
            e.preventDefault();
            e.stopPropagation();
            var idx = $(e.currentTarget).closest('li').data('idx');
            deleteItem(idx);
          });

        $(node.el).on('legendUpdated', function(evt) {
          updateTabs();
          evt.preventDefault();
          evt.stopPropagation();
        });

        // only allow drag if default or enabled
        if (!isSet(node.formElement.draggable) || node.formElement.draggable) {
          if (!node.isReadOnly() && $(node.el).sortable) {
            $('> .jsonform-tabbable > ul.nav', $nodeid).sortable({
              containment: node.el,
              cancel: '._jsonform-array-addmore',
              tolerance: 'pointer'
            }).on('sortchange', function(event, ui) {
              if (ui.placeholder.index() == $(this).children().length - 1 && ui.placeholder.prev().data('idx') == -1) {
                ui.placeholder.prev().before(ui.placeholder);
              }
            }).on('sortstop', function(event, ui) {
              var idx = $(ui.item).data('idx');
              var newIdx = $(ui.item).index();
              moveNodeTo(idx, newIdx);
              updateTabs(newIdx);
            });
          }
        }

        // Simulate User's click to setup the form with its minItems
        if (boundaries.minItems >= 0) {
          for (var i = node.children.length; i < boundaries.minItems; i++) {
            addItem(node.children.length);
          }
        }
        updateTabs();

        $nodeid.find(addMoreSelector)
          .toggleClass('disabled', boundaries.maxItems >= 0 && node.children.length >= boundaries.maxItems);
        var canDelete = boundaries.minItems >= 0 && node.children.length <= boundaries.minItems;
        $nodeid.find(itemDeleteSelector).toggle(!canDelete);
      }
    },
    'help': {
      'template': '<small <%= id ? \'id="\' + id + \'"\' : "" %> class="<%= cls.helpClass %>" style="padding-top:5px"><%= node.helpvalue || elt.helpvalue %></small>',
      'fieldtemplate': true
    },
    'null': {
      'template': '<input type="hidden" id="<%= id %>" name="<%= node.name %>" value="null" <%= (node.disabled? " disabled" : "")%> />',
      'inputfield': true,
      'fieldtemplate': true
    },
    'msg': {
      'template': '<%= elt.msg %>'
    },
    'html': {
      'template': '<%= elt.html %>'
    },
    'textview': {
      'template': '<pre id="<%= id %>" name="<%= node.name %>"><%= value %></pre>',
      'inputfield': true,
      'fieldtemplate': true
    },
    'fieldset': {
      'template': '<fieldset class="jsonform-node jsonform-error-<%= keydash %> <% if (elt.expandable) { %>expandable<% } %> <%= elt.htmlClass?elt.htmlClass:"" %>" ' +
        '<% if (id) { %> id="<%= id %>"<% } %>' +
        ' data-jsonform-type="fieldset"<%= (node.disabled ? " disabled" : "") %>>' +
        '<% if (node.title || node.legend) { %>' +
        '<legend class="<%= cls.legendClass %>" role="treeitem" aria-expanded="false"><%= node.title || node.legend %>' +
        '<% if (node.description && (elt.useTooltip === true || (elt.useTooltip === undefined && cls.useTooltip))) { %>' +
        '<span data-toggle="tooltip" data-placement="right" title="<%= node.description %>" class="<%= cls.tooltipClass %> jsonform-description-tooltip"><i class="<%= cls.iconClassPrefix %>-<%= cls.tooltipIconSuffix %>"></i></span>' +
        '<% } %>' +
        '</legend>' +
        '<% } %>' +
        '<% if (node.description && !(elt.useTooltip === true || (elt.useTooltip === undefined && cls.useTooltip))) { %>' +
        '<small class="<%= cls.helpClass %> jsonform-description"><%= node.description %></small>' +
        '<% } %>' +
        '<% if (elt.expandable) { %><div class="<%= cls.formsGroupClass %>"><% } %>' +
        '<%= children %>' +
        '<% if (elt.expandable) { %></div><% } %>' +
        '<small class="<%= cls.errorTextClass %> jsonform-errortext" style="display:none;"></small>' +
        '</fieldset>',
      onInsert: function(evt, node) {
        if (node.el !== null) {
          $('.expandable > div, .expandable > fieldset', node.el).hide();
          // See #233
          $(".expandable", node.el).removeClass("expanded");
        }
      }
    },
    'advancedfieldset': {
      'template': '<fieldset class="jsonform-node jsonform-error-<%= keydash %> <% if (elt.expandable !== false) { %>expandable<% } %> <%= elt.htmlClass?elt.htmlClass:"" %>"' +
        '<% if (id) { %> id="<%= id %>"<% } %>' +
        ' data-jsonform-type="advancedfieldset"<%= (node.disabled ? " disabled" : "") %>>' +
        '<legend class="<%= cls.legendClass %>" role="treeitem" aria-expanded="false"><%= (node.title || node.legend) ? (node.title || node.legend) : "Advanced options" %></legend>' +
        '<% if (elt.expandable !== false) { %><div class="<%= cls.formsGroupClass %>"><% } %>' +
        '<%= children %>' +
        '<% if (elt.expandable !== false) { %></div><% } %>' +
        '<small class="<%= cls.errorTextClass %> jsonform-errortext" style="display:none;"></small>' +
        '</fieldset>',
      onInsert: function(evt, node) {
        if (node.el !== null) {
          $('.expandable > div, .expandable > fieldset', node.el).hide();
          // See #233
          $(".expandable", node.el).removeClass("expanded");
        }
      }
    },
    'authfieldset': {
      'template': '<fieldset class="jsonform-node jsonform-error-<%= keydash %> <% if (elt.expandable !== false) { %>expandable<% } %> <%= elt.htmlClass?elt.htmlClass:"" %>"' +
        '<% if (id) { %> id="<%= id %>"<% } %>' +
        ' data-jsonform-type="authfieldset"<%= (node.disabled ? " disabled" : "") %>>' +
        '<legend class="<%= cls.legendClass %>" role="treeitem" aria-expanded="false"><%= (node.title || node.legend) ? (node.title || node.legend) : "Authentication settings" %></legend>' +
        '<% if (elt.expandable !== false) { %><div class="<%= cls.formsGroupClass %>"><% } %>' +
        '<%= children %>' +
        '<% if (elt.expandable !== false) { %></div><% } %>' +
        '<small class="<%= cls.errorTextClass %> jsonform-errortext" style="display:none;"></small>' +
        '</fieldset>',
      onInsert: function(evt, node) {
        if (node.el !== null) {
          $('.expandable > div, .expandable > fieldset', node.el).hide();
          // See #233
          $(".expandable", node.el).removeClass("expanded");
        }
      }
    },
    'submit': {
      'template': '<input type="submit" <% if (id) { %> id="<%= id %>" <% } %> class="btn <%= cls.submitButtonClass %> <%= elt.htmlClass?elt.htmlClass:"" %>" value="<%= value || node.title %>"<%= (node.disabled? " disabled" : "")%>/>'
    },
    'reset': {
      'template': '<input type="reset" <% if (id) { %> id="<%= id %>" <% } %> class="btn <%= cls.resetButtonClass %> <%= elt.htmlClass?elt.htmlClass:"" %>" value="<%= value || node.title %>"<%= (node.disabled? " disabled" : "")%>/>'
    },
    'button': {
      'template': '<button type="button" <% if (id) { %> id="<%= id %>" <% } %> class="btn <%= cls.buttonClass %> <%= elt.htmlClass?elt.htmlClass:"" %>"><%= node.title %></button>'
    },
    'actions': {
      'template': '<div class="<%= cls.actionsClass %> <%= elt.htmlClass?elt.htmlClass:"" %>"><%= children %></div>'
    },
    'hidden': {
      'template': '<input type="hidden" id="<%= id %>" name="<%= node.name %>" value="<%= escape(value) %>" <%= (node.disabled? " disabled" : "")%> />',
      'inputfield': true
    },
    'tabs': {
      'template': '<div class="jsonform-tabbable"><ul class="nav <%= cls.navTabsClass %> <%= elt.htmlClass?elt.htmlClass:"" %>"' +
        '<% if (elt.id) { %> id="<%= elt.id %>"<% } %>' +
        '><%=tab_list%></ul><div style="clear: both;"></div><div class="tab-content" <% if (elt.id) { %> data-tabset="<%= elt.id %>"<% } %>><%=children%></div></div>',
      'getElement': function(el) {
        return $(el).parent().parent().get(0);
      },
      'onBeforeRender': function(data, node) {
        // Generate the initial 'tabs' from the children
        var parentID = escapeHTML(node.id ? node.id + "-" : "");
        var tab_list = '';
        _.each(node.children, function(child, idx) {
          var title = escapeHTML(child.title || ('Item ' + (idx + 1)));
          var title_escaped = title.replace(" ", "_");
          tab_list += '<li class="tabwrap ' + node.ownerTree.defaultConfig.navItemClass +
            ((idx === 0) ? ' active' : '') + '">' +
            '<a href="#' + parentID + title_escaped + '" class="tab ' + node.ownerTree.defaultConfig.navLinkClass + ((idx === 0) ? ' active' : '') + '"' +
            ' data-tab="' + parentID + title_escaped + '"' +
            ' data-toggle="tab">' + title +
            (child.formElement && child.formElement.addIcon ? '<i class="' + node.ownerTree.defaultConfig.iconClassPrefix + '-' + child.formElement.addIcon + '"></i>' : '') +
            '</a></li>';
        });
        data.tab_list = tab_list;
        return data;
      },
      'onInsert': function(evt, node) {
        $("#" + node.id + ">li.tabwrap").on("click", function(e) {
          e.preventDefault();
          $(node.el).find("div[data-tabset='" + node.id + "']>div.tab-pane.active").each(function() {
            $(this).removeClass("active");
          });
          var tab_id = $(this).find('a').attr('data-tab');
          $("#" + tab_id).addClass("active");
        });
      }
    },
    'tab': {
      'template': '<div class="tab-pane' +
        '<% if (elt.htmlClass) { %> <%= elt.htmlClass %> <% } %>' +
        //Set the first tab as active
        '<% if (node.childPos === 0) { %> active<% } %>' +
        '"' + //Finish end quote of class tag
        ' id="<%= tabId %>"' +
        '><%= children %></div>',
      'onBeforeRender': function(data, node) {
        // get tab id according to 'tabs'
        data.tabId = escapeHTML(node.parentNode.id ? node.parentNode.id + "-" : "") + escapeHTML(node.title || ('Item ' + (node.childPos + 1))).replace(" ", "_");
        return data;
      }
    },
    'selectfieldset': {
      'template': '<fieldset class="tab-container <%= elt.htmlClass?elt.htmlClass:"" %>"<%= (node.disabled ? " disabled" : "") %>>' +
        '<% if (node.legend) { %><legend class="<%= cls.legendClass %>" role="treeitem" aria-expanded="false"><%= node.legend %></legend><% } %>' +
        '<% if (node.formElement.key) { %><input type="hidden" id="<%= node.id %>" name="<%= node.name %>" value="<%= escape(value) %>" /><% } else { %>' +
        '<a id="<%= node.id %>"></a><% } %>' +
        '<div class="jsonform-tabbable">' +
        '<div class="<%= cls.formClass %><%= node.formElement.hideMenu ? " hide" : "" %><%= (node.isReadOnly() ? " " + cls.formReadonlyClass : "") %><%= (node.disabled ? " " + cls.formDisabledClass : "") %>">' +
        '<% if (!elt.notitle) { %><label class="<%= cls.labelClass %>" for="<%= node.id %>"><%= node.getTitle() %></label><% } %>' +
        '<div<% if (cls.controlClass) { %> class="<%= cls.controlClass %>"<% } %>><%= tabs %></div>' +
        '</div>' +
        '<div class="tab-content">' +
        '<%= children %>' +
        '</div>' +
        '</div>' +
        '</fieldset>',
      'inputfield': true,
      'getElement': function(el) {
        return $(el).parent().get(0);
      },
      'childTemplate': function(inner) {
        return '<div data-idx="<%= node.childPos %>" class="tab-pane' +
          '<% if (node.active) { %> active<% } %>">' +
          inner +
          '</div>';
      },
      'onBeforeRender': function(data, node) {
        // Before rendering, this function ensures that:
        // 1. direct children have IDs (used to show/hide the tabs contents)
        // 2. the tab to active is flagged accordingly. The active tab is
        // the first one, except if form values are available, in which case
        // it's the first tab for which there is some value available (or back
        // to the first one if there are none)
        // 3. the HTML of the select field used to select tabs is exposed in the
        // HTML template data as "tabs"

        var children = null;
        var choices = [];
        if (node.schemaElement) {
          choices = node.schemaElement['enum'] || [];
        }
        if (node.options) {
          children = _.map(node.options, function(option, idx) {
            var child = node.children[idx];
            child.childPos = idx; // When nested the childPos is always 0.
            if (option instanceof Object) {
              option = _.extend({
                node: child
              }, option);
              option.title = option.title ||
                child.legend ||
                child.title ||
                ('Option ' + (child.childPos + 1));
              option.value = isSet(option.value) ? option.value :
                isSet(choices[idx]) ? choices[idx] : idx;
              return option;
            } else {
              return {
                title: option,
                value: isSet(choices[child.childPos]) ?
                  choices[child.childPos] : child.childPos,
                node: child
              };
            }
          });
        } else {
          children = _.map(node.children, function(child, idx) {
            child.childPos = idx; // When nested the childPos is always 0.
            return {
              title: child.legend || child.title || ('Option ' + (child.childPos + 1)),
              value: choices[child.childPos] || child.value || child.childPos,
              node: child
            };
          });
        }

        // Reset each children to inactive so that they are not shown on insert
        // The active one will then be shown later one. This is useful when sorting
        // arrays with selectfieldset, otherwise both fields could be active at the
        // same time.
        _.each(children, function(child, idx) {
          child.node.active = false;
        });

        var activeChild = null;
        if (typeof data.value != 'undefined') {
          activeChild = _.find(children, function(child) {
            return (child.value == node.value);
          });
        }
        if (!activeChild) {
          activeChild = _.find(children, function(child) {
            return child.node.hasNonDefaultValue();
          });
        }
        if (!activeChild) {
          activeChild = children[0];
        }
        activeChild.node.active = true;
        data.value = activeChild.value;

        var elt = node.formElement;

        var tabs = '';

        if (data.cls.selectWrapClass) {
          tabs += '<div class="' + (data.cls.selectWrapClass) + '">';
        }

        tabs += '<select class="nav ' + (data.cls.textualInputClass) + '"' +
          (node.disabled ? ' disabled' : '') +
          '>';
        _.each(children, function(child, idx) {
          tabs += '<option data-idx="' + idx + '" value="' + child.value + '"' +
            (child.node.active ? ' selected="selected" class="active"' : '') +
            '>' +
            escapeHTML(child.title) +
            '</option>';
        });
        tabs += '</select>';

        if (data.cls.selectWrapClass) {
          tabs += '</div>';
        }

        data.tabs = tabs;
        return data;
      },
      'onInsert': function(evt, node) {
        $(node.el).find('select.nav').first().on('change', function(evt) {
          var $option = $(this).find('option:selected');
          $(node.el).find('input[type="hidden"]').first().val($option.attr('value'));
        });
      }
    },
    'optionfieldset': {
      'template': '<div' +
        '<% if (node.id) { %> id="<%= node.id %>"<% } %>' +
        '>' +
        '<%= children %>' +
        '</div>'
    },
    'section': {
      'template': '<div' +
        '<% if (node.id) { %> id="<%= node.id %>"<% } %> class="jsonform-node jsonform-error-<%= keydash %> <%= elt.htmlClass?elt.htmlClass:"" %>"' +
        '><%= children %></div>'
    },

    /**
     * A "questions" field renders a series of question fields and binds the
     * result to the value of a schema key.
     */
    'questions': {
      'template': '<div>' +
        '<input type="hidden" id="<%= node.id %>" name="<%= node.name %>" value="<%= escape(value) %>" />' +
        '<%= children %>' +
        '</div>',
      'fieldtemplate': true,
      'inputfield': true,
      'getElement': function(el) {
        return $(el).parent().get(0);
      },
      'onInsert': function(evt, node) {
        if (!node.children || (node.children.length === 0)) return;
        _.each(node.children, function(child) {
          $(child.el).hide();
        });
        $(node.children[0].el).show();
      }
    },

    /**
     * A "question" field lets user choose a response among possible choices.
     * The field is not associated with any schema key. A question should be
     * part of a "questions" field that binds a series of questions to a
     * schema key.
     */
    'question': {
      'template': '<div id="<%= node.id %>"<% if (elt.optionsType === "radiobuttons") { %> class="<%= cls.buttonGroupClass %> btn-group-toggle" data-toggle="buttons"<% } %><% if (elt.inline) { %> class="<%= cls.formInlineClass %>"<% } %>>' +
        '<% _.each(node.options, function(key, val) { %>' +
        '<% if (elt.optionsType === "radiobuttons") { %>' +
        '<label class="btn <%= cls.buttonClass %><%= ((key instanceof Object && key.htmlClass) ? " " + key.htmlClass : "") %><%= (node.disabled || node.isReadOnly() ? " disabled" : "") %>">' +
        '<input ' +
        'type="radio" ' +
        'style="position:absolute;left:-9999px;" ' +
        'name="<%= node.id %>" ' +
        'value="<%= val %>" ' +
        '<%= (node.disabled ? "disabled" : "") %>' +
        '/>' +
        '<%= (key instanceof Object ? key.title : key) %>' +
        '</label> ' +
        '<% } else { %>' +
        '<div class="<% if (elt.inline) { %><%= cls.radioWrapInlineClass %><% } else { %><%= cls.radioWrapClass %><% } %>">' +
        '<input ' +
        'class=\'<%= cls.radioInputClass %><%= ((key instanceof Object && key.htmlClass) ? " " + key.htmlClass : "") %>\' ' +
        'type="radio" ' +
        'id="<%= node.id %>_<%= escape(val) %>" ' +
        'value="<%= val %>" ' +
        'name="<%= node.id %>" ' +
        '<%= (node.disabled || node.isReadOnly() ? "disabled" : "") %>' +
        '/>' +
        '<label class="<%= cls.radioLabelClass %>" for="<%= node.id %>_<%= escape(val) %>">' +
        '<%= (key instanceof Object ? key.title : key) %>' +
        '</label>' +
        '</div>' +
        '<% } %>' +
        '<% }); %>' +
        '</div>',
      'fieldtemplate': true,
      'onInsert': function(evt, node) {
        var activeClass = 'active';
        var elt = node.formElement || {};
        if (elt.activeClass) {
          activeClass += ' ' + elt.activeClass;
        } else if (elt.optionsType === "radiobuttons") {
          activeClass += ' ' + node.ownerTree.defaultConfig.buttonClass;
        }

        // Bind to change events on radio buttons
        $(node.el).find('input[type="radio"]').on('change', function(evt) {
          var questionNode = null;
          var option = node.options[$(this).val()];
          if (!node.parentNode || !node.parentNode.el) return;

          $(node.el).find("label").removeClass(activeClass);
          $(node.el).find("label.btn").addClass(node.ownerTree.defaultConfig.buttonClass);
          $(this).closest("label.btn").removeClass(node.ownerTree.defaultConfig.buttonClass);
          $(this).closest("label").addClass(activeClass);
          $(this).siblings("label").addClass(activeClass);
          $(node.el).nextAll().hide();
          $(node.el).nextAll().find('input[type="radio"]').prop('checked', false);

          // Execute possible actions (set key value, form submission, open link,
          // move on to next question)
          if (option.value) {
            // Set the key of the 'Questions' parent
            $(node.parentNode.el).find('input[type="hidden"]').val(option.value);
          }
          if (option.next) {
            questionNode = _.find(node.parentNode.children, function(child) {
              return (child.formElement && (child.formElement.qid === option.next));
            });
            $(questionNode.el).show();
            $(questionNode.el).nextAll().hide();
            $(questionNode.el).nextAll().find('input[type="radio"]').prop('checked', false);
          }
          if (option.href) {
            if (option.target) {
              window.open(option.href, option.target);
            } else {
              window.location = option.href;
            }
          }
          if (option.submit) {
            setTimeout(function() {
              node.ownerTree.submit();
            }, 0);
          }
        });
      }
    }
  };


  //Allow to access subproperties by splitting "."
  /**
   * Retrieves the key identified by a path selector in the structured object.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with [x]. For instance:
   *  foo.bar[3].baz
   *
   * @function
   * @param {Object} obj Structured object to parse
   * @param {String} key Path to the key to retrieve
   * @param {boolean} ignoreArrays True to use first element in an array when
   *   stucked on a property. This parameter is basically only useful when
   *   parsing a JSON schema for which the "items" property may either be an
   *   object or an array with one object (only one because JSON form does not
   *   support mix of items for arrays).
   * @return {Object} The key's value.
   */
  jsonform.util.getObjKey = function(obj, key, ignoreArrays) {
    var innerobj = obj;
    var keyparts = key.split(".");
    var subkey = null;
    var arrayMatch = null;
    var prop = null;

    for (var i = 0; i < keyparts.length; i++) {
      if ((innerobj === null) || (typeof innerobj !== "object")) return null;
      subkey = keyparts[i];
      prop = subkey.replace(reArray, '');
      reArray.lastIndex = 0;
      arrayMatch = reArray.exec(subkey);
      if (arrayMatch) {
        while (true) {
          if (prop && !_.isArray(innerobj[prop])) return null;
          innerobj = prop ? innerobj[prop][parseInt(arrayMatch[1])] : innerobj[parseInt(arrayMatch[1])];
          arrayMatch = reArray.exec(subkey);
          if (!arrayMatch) break;
          // In the case of multidimensional arrays,
          // we should not take innerobj[prop][0] anymore,
          // but innerobj[0] directly
          prop = null;
        }
      } else if (ignoreArrays &&
        !innerobj[prop] &&
        _.isArray(innerobj) &&
        innerobj[0]) {
        innerobj = innerobj[0][prop];
      } else {
        innerobj = innerobj[prop];
      }
    }

    if (ignoreArrays && _.isArray(innerobj) && innerobj[0]) {
      return innerobj[0];
    } else {
      return innerobj;
    }
  };

  //Allow to access subproperties by splitting "."
  /**
   * Retrieves the key identified by a path selector in the structured object.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with [x]. For instance:
   *  foo.bar[3].baz
   *
   * @function
   * @param {Object} obj Structured object to parse, can be array too
   * @param {String} key Path to the key to retrieve
   * @return {Object} The key's value.
   */
  jsonform.util.getObjKeyEx = function(obj, key, objKey) {
    var innerobj = obj;

    if (key === null || key === undefined || key === '')
      return obj;

    if (typeof objKey === 'string' && objKey.length > 0) {
      if (key.slice(0, objKey.length) !== objKey) {
        throw new Error('key [' + key + '] does not match the objKey [' + objKey + ']');
      }
      key = key.slice(objKey.length);
      if (key[0] === '.')
        key = key.slice(1);
    }

    var m = key.match(/^((([^\\\[.]|\\.)+)|\[(\d+)\])\.?(.*)$/);
    if (!m)
      throw new Error('bad format key: ' + key);

    if (typeof m[2] === 'string' && m[2].length > 0) {
      innerobj = innerobj[m[2]];
    } else if (typeof m[4] === 'string' && m[4].length > 0) {
      innerobj = innerobj[Number(m[4])];
    } else
      throw new Error('impossible reach here');
    if (innerobj && m[5].length > 0)
      innerobj = this.getObjKeyEx(innerobj, m[5]);

    return innerobj;
  };


  /**
   * Sets the key identified by a path selector to the given value.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with [x]. For instance:
   *  foo.bar[3].baz
   *
   * The hierarchy is automatically created if it does not exist yet.
   *
   * @function
   * @param {Object} obj The object to build
   * @param {String} key The path to the key to set where each level
   *  is separated by a dot, and array items are flagged with [x].
   * @param {Object} value The value to set, may be of any type.
   */
  jsonform.util.setObjKey = function(obj, key, value) {
    var innerobj = obj;
    var keyparts = key.split(".");
    var subkey = null;
    var arrayMatch = null;
    var prop = null;

    for (var i = 0; i < keyparts.length - 1; i++) {
      subkey = keyparts[i];
      prop = subkey.replace(reArray, '');
      reArray.lastIndex = 0;
      arrayMatch = reArray.exec(subkey);
      if (arrayMatch) {
        // Subkey is part of an array
        while (true) {
          if (!_.isArray(innerobj[prop])) {
            innerobj[prop] = [];
          }
          innerobj = innerobj[prop];
          prop = parseInt(arrayMatch[1], 10);
          arrayMatch = reArray.exec(subkey);
          if (!arrayMatch) break;
        }
        if ((typeof innerobj[prop] !== 'object') ||
          (innerobj[prop] === null)) {
          innerobj[prop] = {};
        }
        innerobj = innerobj[prop];
      } else {
        // "Normal" subkey
        if ((typeof innerobj[prop] !== 'object') ||
          (innerobj[prop] === null)) {
          innerobj[prop] = {};
        }
        innerobj = innerobj[prop];
      }
    }

    // Set the final value
    subkey = keyparts[keyparts.length - 1];
    prop = subkey.replace(reArray, '');
    reArray.lastIndex = 0;
    arrayMatch = reArray.exec(subkey);
    if (arrayMatch) {
      while (true) {
        if (!_.isArray(innerobj[prop])) {
          innerobj[prop] = [];
        }
        innerobj = innerobj[prop];
        prop = parseInt(arrayMatch[1], 10);
        arrayMatch = reArray.exec(subkey);
        if (!arrayMatch) break;
      }
      innerobj[prop] = value;
    } else {
      innerobj[prop] = value;
    }
  };


  /**
   * Retrieves the key definition from the given schema.
   *
   * The key is identified by the path that leads to the key in the
   * structured object that the schema would generate. Each level is
   * separated by a '.'. Array levels are marked with []. For instance:
   *  foo.bar[].baz
   * ... to retrieve the definition of the key at the following location
   * in the JSON schema (using a dotted path notation):
   *  foo.properties.bar.items.properties.baz
   *
   * @function
   * @param {Object} schema The JSON schema to retrieve the key from
   * @param {String} key The path to the key, each level being separated
   *  by a dot and array items being flagged with [].
   * @return {Object} The key definition in the schema, null if not found.
   */
  var getSchemaKey = function(schema, key) {
    var schemaKey = key
      .replace(/\./g, '.properties.')
      .replace(/\[[0-9]*\]/g, '.items');
    var schemaDef = jsonform.util.getObjKey(schema, schemaKey, true);
    if (schemaDef && schemaDef.$ref) {
      throw new Error('JSONForm does not yet support schemas that use the ' +
        '$ref keyword. See: https://github.com/joshfire/jsonform/issues/54');
    }
    return schemaDef;
  };

  /**
   * Retrieves the key default value from the given schema.
   *
   * The key is identified by the path that leads to the key in the
   * structured object that the schema would generate. Each level is
   * separated by a '.'. Array levels are marked with [idx]. For instance:
   *  foo.bar[3].baz
   * ... to retrieve the definition of the key at the following location
   * in the JSON schema (using a dotted path notation):
   *  foo.properties.bar.items.properties.baz
   *
   * @function
   * @param {Object} schema The top level JSON schema to retrieve the key from
   * @param {String} key The path to the key, each level being separated
   *  by a dot and array items being flagged with [idx].
   * @param {Number} top array level of schema within it we search the default.
   * @return {Object} The key definition in the schema, null if not found.
   */
  var getSchemaDefaultByKeyWithArrayIdx = function(schema, key, topDefaultArrayLevel) {
    topDefaultArrayLevel = topDefaultArrayLevel || 0;
    var defaultValue;
    if (!isSet(key) || key === '') {
      if (topDefaultArrayLevel == 0)
        defaultValue = schema.default;
    } else if (schema.default && topDefaultArrayLevel == 0) {
      defaultValue = jsonform.util.getObjKeyEx(schema.default, key);
    } else {
      var m = key.match(/^((([^\\\[.]|\\.)+)|\[(\d+)\])\.?(.*)$/);
      if (!m)
        throw new Error('bad format key: ' + key);

      if (typeof m[2] === 'string' && m[2].length > 0) {
        schema = schema.properties[m[2]];
      } else if (typeof m[4] === 'string' && m[4].length > 0) {
        schema = schema.items;
        if (topDefaultArrayLevel > 0)
          --topDefaultArrayLevel;
      } else
        throw new Error('impossible reach here');

      if (schema) {
        if (schema.default && topDefaultArrayLevel == 0) {
          defaultValue = jsonform.util.getObjKeyEx(schema.default, m[5]);
        } else {
          defaultValue = getSchemaDefaultByKeyWithArrayIdx(schema, m[5], topDefaultArrayLevel);
        }
      }
    }
    return defaultValue;
  };

  /**
   * Truncates the key path to the requested depth.
   *
   * For instance, if the key path is:
   *  foo.bar[].baz.toto[].truc[].bidule
   * and the requested depth is 1, the returned key will be:
   *  foo.bar[].baz.toto
   *
   * Note the function includes the path up to the next depth level.
   *
   * @function
   * @param {String} key The path to the key in the schema, each level being
   *  separated by a dot and array items being flagged with [].
   * @param {Number} depth The array depth
   * @return {String} The path to the key truncated to the given depth.
   */
  var truncateToArrayDepth = function(key, arrayDepth) {
    var depth = 0;
    var pos = 0;
    if (!key) return null;

    if (arrayDepth > 0) {
      while (depth < arrayDepth) {
        pos = key.indexOf('[]', pos);
        if (pos === -1) {
          // Key path is not "deep" enough, simply return the full key
          return key;
        }
        pos = pos + 2;
        depth += 1;
      }
    }

    // Move one step further to the right without including the final []
    pos = key.indexOf('[]', pos);
    if (pos === -1) return key;
    else return key.substring(0, pos);
  };

  /**
   * Applies the array path to the key path.
   *
   * For instance, if the key path is:
   *  foo.bar[].baz.toto[].truc[].bidule
   * and the arrayPath [4, 2], the returned key will be:
   *  foo.bar[4].baz.toto[2].truc[].bidule
   *
   * @function
   * @param {String} key The path to the key in the schema, each level being
   *  separated by a dot and array items being flagged with [].
   * @param {Array(Number)} arrayPath The array path to apply, e.g. [4, 2]
   * @return {String} The path to the key that matches the array path.
   */
  var applyArrayPath = function(key, arrayPath, emptyIdxOnly) {
    var depth = 0;
    if (!key) return null;
    if (!arrayPath || (arrayPath.length === 0)) return key;
    var newKey = key.replace(reArray, function(str, p1) {
      // Note this function gets called as many times as there are [x] in the ID,
      // from left to right in the string. The goal is to replace the [x] with
      // the appropriate index in the new array path, if defined.
      var newIndex = str;
      if ((!emptyIdxOnly || newIndex.length == 2) && isSet(arrayPath[depth])) {
        newIndex = '[' + arrayPath[depth] + ']';
      }
      depth += 1;
      return newIndex;
    });
    return newKey;
  };


  /**
   * Returns the initial value that a field identified by its key
   * should take.
   *
   * The "initial" value is defined as:
   * 1. the previously submitted value if already submitted
   * 2. the default value defined in the layout of the form
   * 3. the default value defined in the schema
   *
   * The "value" returned is intended for rendering purpose,
   * meaning that, for fields that define a titleMap property,
   * the function returns the label, and not the intrinsic value.
   *
   * The function handles values that contains template strings,
   * e.g. {{values.foo[].bar}} or {{idx}}.
   *
   * When the form is a string, the function truncates the resulting string
   * to meet a potential "maxLength" constraint defined in the schema, using
   * "..." to mark the truncation. Note it does not validate the resulting
   * string against other constraints (e.g. minLength, pattern) as it would
   * be hard to come up with an automated course of action to "fix" the value.
   *
   * @function
   * @param {Object} formObject The JSON Form object
   * @param {String} key The generic key path (e.g. foo[].bar.baz[])
   * @param {Array(Number)} arrayPath The array path that identifies
   *  the unique value in the submitted form (e.g. [1, 3])
   * @param {Object} tpldata Template data object
   * @param {Boolean} usePreviousValues true to use previously submitted values
   *  if defined.
   */
  var getInitialValue = function(formObject, key, arrayPath, tpldata, usePreviousValues) {
    var value = null;

    // Complete template data for template function
    tpldata = tpldata || {};
    tpldata.idx = tpldata.idx ||
      (arrayPath ? arrayPath[arrayPath.length - 1] : 1);
    tpldata.value = isSet(tpldata.value) ? tpldata.value : '';
    tpldata.getValue = tpldata.getValue || function(key) {
      return getInitialValue(formObject, key, arrayPath, tpldata, usePreviousValues);
    };

    // Helper function that returns the form element that explicitly
    // references the given key in the schema.
    var getFormElement = function(elements, key) {
      var formElement = null;
      if (!elements || !elements.length) return null;
      _.each(elements, function(elt) {
        if (formElement) return;
        if (elt === key) {
          formElement = {
            key: elt
          };
          return;
        }
        if (_.isString(elt)) return;
        if (elt.key === key) {
          formElement = elt;
        } else if (elt.items) {
          formElement = getFormElement(elt.items, key);
        }
      });
      return formElement;
    };
    var formElement = getFormElement(formObject.form || [], key);
    var schemaElement = getSchemaKey(formObject.schema.properties, key);

    if (usePreviousValues && formObject.value) {
      // If values were previously submitted, use them directly if defined
      value = jsonform.util.getObjKey(formObject.value, applyArrayPath(key, arrayPath));
    }
    if (!isSet(value)) {
      if (formElement && (typeof formElement.value !== 'undefined')) {
        // Extract the definition of the form field associated with
        // the key as it may override the schema's default value
        // (note a "null" value overrides a schema default value as well)
        value = formElement.value;
      } else if (schemaElement) {
        // Simply extract the default value from the schema
        if (isSet(schemaElement['default'])) {
          value = schemaElement['default'];
        }
      }
      if (value && value.indexOf('{{values.') !== -1) {
        // This label wants to use the value of another input field.
        // Convert that construct into {{getValue(key)}} for
        // Underscore to call the appropriate function of formData
        // when template gets called (note calling a function is not
        // exactly Mustache-friendly but is supported by Underscore).
        value = value.replace(
          /\{\{values\.([^\}]+)\}\}/g,
          '{{getValue("$1")}}');
      }
      if (value) {
        value = _.template(value, valueTemplateSettings)(tpldata);
      }
    }

    // TODO: handle on the formElement.options, because user can setup it too.
    // Apply titleMap if needed
    if (isSet(value) && formElement && hasOwnProperty(formElement.titleMap, value)) {
      value = _.template(formElement.titleMap[value], valueTemplateSettings)(tpldata);
    }

    // Check maximum length of a string
    if (value && _.isString(value) &&
      schemaElement && schemaElement.maxLength) {
      if (value.length > schemaElement.maxLength) {
        // Truncate value to maximum length, adding continuation dots
        value = value.substr(0, schemaElement.maxLength - 1) + '…';
      }
    }

    if (!isSet(value)) {
      return null;
    } else {
      return value;
    }
  };


  /**
   * Represents a node in the form.
   *
   * Nodes that have an ID are linked to the corresponding DOM element
   * when rendered
   *
   * Note the form element and the schema elements that gave birth to the
   * node may be shared among multiple nodes (in the case of arrays).
   *
   * @class
   */
  var formNode = function() {
    /**
     * The node's ID (may not be set)
     */
    this.id = null;

    /**
     * The node's key path (may not be set)
     */
    this.key = null;

    /**
     * DOM element associated witht the form element.
     *
     * The DOM element is set when the form element is rendered.
     */
    this.el = null;

    /**
     * Link to the form element that describes the node's layout
     * (note the form element is shared among nodes in arrays)
     */
    this.formElement = null;

    /**
     * Link to the schema element that describes the node's value constraints
     * (note the schema element is shared among nodes in arrays)
     */
    this.schemaElement = null;

    /**
     * Pointer to the "view" associated with the node, typically the right
     * object in jsonform.elementTypes
     */
    this.view = null;

    /**
     * Node's subtree (if one is defined)
     */
    this.children = [];

    /**
     * A pointer to the form tree the node is attached to
     */
    this.ownerTree = null;

    /**
     * A pointer to the parent node of the node in the tree
     */
    this.parentNode = null;

    /**
     * Child template for array-like nodes.
     *
     * The child template gets cloned to create new array items.
     */
    this.childTemplate = null;


    /**
     * Direct children of array-like containers may use the value of a
     * specific input field in their subtree as legend. The link to the
     * legend child is kept here and initialized in computeInitialValues
     * when a child sets "valueInLegend"
     */
    this.legendChild = null;


    /**
     * The path of indexes that lead to the current node when the
     * form element is not at the root array level.
     *
     * Note a form element may well be nested element and still be
     * at the root array level. That's typically the case for "fieldset"
     * elements. An array level only gets created when a form element
     * is of type "array" (or a derivated type such as "tabarray").
     *
     * The array path of a form element linked to the foo[2].bar.baz[3].toto
     * element in the submitted values is [2, 3] for instance.
     *
     * The array path is typically used to compute the right ID for input
     * fields. It is also used to update positions when an array item is
     * created, moved around or suppressed.
     *
     * @type {Array(Number)}
     */
    this.arrayPath = [];

    /**
     * Position of the node in the list of children of its parents
     */
    this.childPos = 0;
  };


  /**
   * Clones a node
   *
   * @function
   * @param {formNode} New parent node to attach the node to
   * @return {formNode} Cloned node
   */
  formNode.prototype.clone = function(parentNode) {
    var node = new formNode();
    node.childPos = this.childPos;
    node.arrayPath = _.clone(this.arrayPath);
    node.ownerTree = this.ownerTree;
    node.parentNode = parentNode || this.parentNode;
    node.formElement = this.formElement;
    node.schemaElement = this.schemaElement;
    node.view = this.view;
    node.children = _.map(this.children, function(child) {
      return child.clone(node);
    });
    /*  if (this.childTemplate) {
        node.childTemplate = this.childTemplate.clone(node);
      }*/
    return node;
  };


  /**
   * Returns true if the subtree that starts at the current node
   * has some non empty value attached to it
   */
  formNode.prototype.hasNonDefaultValue = function() {

    // hidden elements don't count because they could make the wrong selectfieldset element active
    if (this.formElement && this.formElement.type == "hidden") {
      return false;
    }

    if (this.value && !this.defaultValue) {
      return true;
    }
    var child = _.find(this.children, function(child) {
      return child.hasNonDefaultValue();
    });
    return !!child;
  };


  /**
   * Returns a property value of node, optional look for in parents chain
   *
   * @function
   * @param {String} prop Property name for looking
   * @param {Boolean} searchInParents Search the property in parents chain if not found in current node
   * @return {Any} The property value
   */
  formNode.prototype.getProperty = function(prop, searchInParents) {
    var value = this[prop];
    if (value !== undefined || !searchInParents || !this.parentNode)
      return value;
    return this.parentNode.getProperty(prop, true);
  };

  formNode.prototype.isReadOnly = function() {
    return this.getProperty('readOnly', true);
  };

  formNode.prototype.getTitle = function() {
    var nodeTitle = this.name;
    if (this.title) {
      nodeTitle = this.title;
    } else if (this.name === this.key && this.parentNode && this.parentNode.key) {
      nodeTitle = nodeTitle.substring(this.parentNode.key.length);
      if (this.parentNode.schemaElement && this.parentNode.schemaElement.type) {
        if (this.parentNode.schemaElement.type === 'object') {
          nodeTitle = nodeTitle.substring(1);
        } else if (this.parentNode.schemaElement.type === 'array') {
          nodeTitle = nodeTitle.replace(/[\[\]']+/g, '');
        }
      }
    }
    return nodeTitle;
  };

  /**
   * Attaches a child node to the current node.
   *
   * The child node is appended to the end of the list.
   *
   * @function
   * @param {formNode} node The child node to append
   * @return {formNode} The inserted node (same as the one given as parameter)
   */
  formNode.prototype.appendChild = function(node) {
    node.parentNode = this;
    node.childPos = this.children.length;
    this.children.push(node);
    return node;
  };


  /**
   * Removes the last child of the node.
   *
   * @function
   */
  formNode.prototype.removeChild = function() {
    var child = this.children[this.children.length - 1];
    if (!child) return;

    // Remove the child from the DOM
    $(child.el).remove();

    // Remove the child from the array
    return this.children.pop();
  };


  /**
   * Moves the user entered values set in the current node's subtree to the
   * given node's subtree.
   *
   * The target node must follow the same structure as the current node
   * (typically, they should have been generated from the same node template)
   *
   * The current node MUST be rendered in the DOM.
   *
   * TODO: when current node is not in the DOM, extract values from formNode.value
   * properties, so that the function be available even when current node is not
   * in the DOM.
   *
   * Moving values around allows to insert/remove array items at arbitrary
   * positions.
   *
   * @function
   * @param {formNode} node Target node.
   */
  formNode.prototype.moveValuesTo = function(node) {
    var values = this.getFormValues(node.arrayPath);
    node.resetValues();
    node.computeInitialValues(values, true);
  };


  /**
   * Switches nodes user entered values.
   *
   * The target node must follow the same structure as the current node
   * (typically, they should have been generated from the same node template)
   *
   * Both nodes MUST be rendered in the DOM.
   *
   * TODO: update getFormValues to work even if node is not rendered, using
   * formNode's "value" property.
   *
   * @function
   * @param {formNode} node Target node
   */
  formNode.prototype.switchValuesWith = function(node) {
    var values = this.getFormValues(node.arrayPath);
    var nodeValues = node.getFormValues(this.arrayPath);
    node.resetValues();
    node.computeInitialValues(values, true);
    this.resetValues();
    this.computeInitialValues(nodeValues, true);
  };


  /**
   * Resets all DOM values in the node's subtree.
   *
   * This operation also drops all array item nodes.
   * Note values are not reset to their default values, they are rather removed!
   *
   * @function
   */
  formNode.prototype.resetValues = function() {
    var params = null;
    var idx = 0;

    // Reset value
    this.value = null;

    // Propagate the array path from the parent node
    // (adding the position of the child for nodes that are direct
    // children of array-like nodes)
    if (this.parentNode) {
      this.arrayPath = _.clone(this.parentNode.arrayPath);
      if (this.parentNode.view && this.parentNode.view.array) {
        this.arrayPath.push(this.childPos);
      }
    } else {
      this.arrayPath = [];
    }

    if (this.view && this.view.inputfield) {
      // Simple input field, extract the value from the origin,
      // set the target value and reset the origin value
      params = $(':input', this.el).serializeArray();
      _.each(params, function(param) {
        // TODO: check this, there may exist corner cases with this approach
        // (with multiple checkboxes for instance)
        $('[name="' + escapeSelector(param.name) + '"]', $(this.el)).val('');
      }, this);
    } else if (this.view && this.view.array) {
      // The current node is an array, drop all children
      while (this.children.length > 0) {
        this.removeChild();
      }
    }

    // Recurse down the tree
    _.each(this.children, function(child) {
      child.resetValues();
    });
  };


  /**
   * Sets the child template node for the current node.
   *
   * The child template node is used to create additional children
   * in an array-like form element. The template is never rendered.
   *
   * @function
   * @param {formNode} node The child template node to set
   */
  formNode.prototype.setChildTemplate = function(node) {
    this.childTemplate = node;
    node.parentNode = this;
  };

  /**
   * Gets the child template node for the current node.
   *
   * The child template node is used to create additional children
   * in an array-like form element. We delay create it when first use.
   *
   * @function
   * @param {formNode} node The child template node to set
   */
  formNode.prototype.getChildTemplate = function() {
    if (!this.childTemplate) {
      if (this.view.array) {
        // The form element is an array. The number of items in an array
        // is by definition dynamic, up to the form user (through "Add more",
        // "Delete" commands). The positions of the items in the array may
        // also change over time (through "Move up", "Move down" commands).
        //
        // The form node stores a "template" node that serves as basis for
        // the creation of an item in the array.
        //
        // Array items may be complex forms themselves, allowing for nesting.
        //
        // The initial values set the initial number of items in the array.
        // Note a form element contains at least one item when it is rendered.
        if (this.formElement.items) {
          key = this.formElement.items[0] || this.formElement.items;
        } else {
          key = this.formElement.key + '[]';
        }
        if (_.isString(key)) {
          key = {
            key: key
          };
        }
        this.setChildTemplate(this.ownerTree.buildFromLayout(key));
      }
    }
    return this.childTemplate;
  };


  /**
   * Recursively sets values to all nodes of the current subtree
   * based on previously submitted values, or based on default
   * values when the submitted values are not enough
   *
   * The function should be called once in the lifetime of a node
   * in the tree. It expects its parent's arrayPath to be up to date.
   *
   * Three cases may arise:
   * 1. if the form element is a simple input field, the value is
   * extracted from previously submitted values of from default values
   * defined in the schema.
   * 2. if the form element is an array-like node, the child template
   * is used to create as many children as possible (and at least one).
   * 3. the function simply recurses down the node's subtree otherwise
   * (this happens when the form element is a fieldset-like element).
   *
   * @function
   * @param {Object} values Previously submitted values for the form
   * @param {Boolean} ignoreDefaultValues Ignore default values defined in the
   *  schema when set.
   * @param {Integer} the top array level of the default value scope, used when
   *  add new item into array, at that time won't consider all default values
   *  above the array schema level.
   */
  formNode.prototype.computeInitialValues = function(values, ignoreDefaultValues, topDefaultArrayLevel) {
    var self = this;
    var node = null;
    var nbChildren = 1;
    var i = 0;
    var formData = this.ownerTree.formDesc.tpldata || {};
    topDefaultArrayLevel = topDefaultArrayLevel || 0;

    // Propagate the array path from the parent node
    // (adding the position of the child for nodes that are direct
    // children of array-like nodes)
    if (this.parentNode) {
      this.arrayPath = _.clone(this.parentNode.arrayPath);
      if (this.parentNode.view && this.parentNode.view.array) {
        this.arrayPath.push(this.childPos);
      }
    } else {
      this.arrayPath = [];
    }

    // Prepare special data param "idx" for templated values
    // (is is the index of the child in its wrapping array, starting
    // at 1 since that's more human-friendly than a zero-based index)
    formData.idx = (this.arrayPath.length > 0) ?
      this.arrayPath[this.arrayPath.length - 1] + 1 :
      this.childPos + 1;

    // Prepare special data param "value" for templated values
    formData.value = '';

    // Prepare special function to compute the value of another field
    formData.getValue = function(key) {
      if (!values) {
        return '';
      }
      var returnValue = values;
      var listKey = key.split('[].');
      var i;
      for (i = 0; i < listKey.length - 1; i++) {
        returnValue = returnValue[listKey[i]][self.arrayPath[i]];
      }
      return returnValue[listKey[i]];
    };

    if (this.formElement) {
      // Compute the ID of the field (if needed)
      if (this.formElement.id) {
        this.id = applyArrayPath(this.formElement.id, this.arrayPath);
      } else if (this.view && this.view.array) {
        this.id = escapeSelector(this.ownerTree.formDesc.prefix) +
          '-elt-counter-' + _.uniqueId();
      } else if (this.parentNode && this.parentNode.view &&
        this.parentNode.view.array) {
        // Array items need an array to associate the right DOM element
        // to the form node when the parent is rendered.
        this.id = escapeSelector(this.ownerTree.formDesc.prefix) +
          '-elt-counter-' + _.uniqueId();
      } else if ((this.formElement.type === 'button') ||
        (this.formElement.type === 'selectfieldset') ||
        (this.formElement.type === 'question') ||
        (this.formElement.type === 'buttonquestion')) {
        // Buttons do need an id for "onClick" purpose
        this.id = escapeSelector(this.ownerTree.formDesc.prefix) +
          '-elt-counter-' + _.uniqueId();
      }

      // Compute the actual key (the form element's key is index-free,
      // i.e. it looks like foo[].bar.baz[].truc, so we need to apply
      // the array path of the node to get foo[4].bar.baz[2].truc)
      if (this.formElement.key) {
        this.key = applyArrayPath(this.formElement.key, this.arrayPath);
        this.keydash = slugify(this.key.replace(/\./g, '---'));
      }

      // Same idea for the field's name
      this.name = applyArrayPath(this.formElement.name, this.arrayPath);

      // Consider that label values are template values and apply the
      // form's data appropriately (note we also apply the array path
      // although that probably doesn't make much sense for labels...)
      _.each([
        'title',
        'legend',
        'description',
        'append',
        'prepend',
        'inlinetitle',
        'helpvalue',
        'value',
        'disabled',
        'required',
        'placeholder',
        'readOnly'
      ], function(prop) {
        if (_.isString(this.formElement[prop])) {
          if (this.formElement[prop].indexOf('{{values.') !== -1) {
            // This label wants to use the value of another input field.
            // Convert that construct into {{jsonform.getValue(key)}} for
            // Underscore to call the appropriate function of formData
            // when template gets called (note calling a function is not
            // exactly Mustache-friendly but is supported by Underscore).
            this[prop] = this.formElement[prop].replace(
              /\{\{values\.([^\}]+)\}\}/g,
              '{{getValue("$1")}}');
          } else {
            // Note applying the array path probably doesn't make any sense,
            // but some geek might want to have a label "foo[].bar[].baz",
            // with the [] replaced by the appropriate array path.
            this[prop] = applyArrayPath(this.formElement[prop], this.arrayPath);
          }
          if (this[prop]) {
            this[prop] = _.template(this[prop], valueTemplateSettings)(formData);
          }
        } else {
          this[prop] = this.formElement[prop];
        }
      }, this);

      // Apply templating to options created with "titleMap" as well
      if (this.formElement.options) {
        this.options = _.map(this.formElement.options, function(option) {
          var title = null;
          if (_.isObject(option) && option.title) {
            // See a few lines above for more details about templating
            // preparation here.
            if (option.title.indexOf('{{values.') !== -1) {
              title = option.title.replace(
                /\{\{values\.([^\}]+)\}\}/g,
                '{{getValue("$1")}}');
            } else {
              title = applyArrayPath(option.title, self.arrayPath);
            }
            return _.extend({}, option, {
              value: (isSet(option.value) ? option.value : ''),
              title: _.template(title, valueTemplateSettings)(formData)
            });
          } else {
            return option;
          }
        });
      }
    }

    if (this.view && this.view.inputfield && this.schemaElement) {
      // Case 1: simple input field
      if (values) {
        // Form has already been submitted, use former value if defined.
        // Note we won't set the field to its default value otherwise
        // (since the user has already rejected it)
        if (isSet(jsonform.util.getObjKey(values, this.key))) {
          this.value = jsonform.util.getObjKey(values, this.key);
        } else if (isSet(this.schemaElement['default'])) {
          // the value is not provided in the values section but the
          // default is set in the schemaElement (which we have)
          this.value = this.schemaElement['default'];
          // We only apply a template if it's a string
          if (typeof this.value === 'string') {
            this.value = _.template(this.value, valueTemplateSettings)(formData);
          }

        }
      } else if (!ignoreDefaultValues) {
        // No previously submitted form result, use default value
        // defined in the schema if it's available and not already
        // defined in the form element
        if (!isSet(this.value)) {
          // XXX: the default value could comes from the top upper level default
          //      value in the schema parent chain, maybe under a certain parent
          //      level(e.g. when handle new itemn for array)
          var val_default = getSchemaDefaultByKeyWithArrayIdx(self.ownerTree.formDesc.schema, this.key, topDefaultArrayLevel);
          if (isSet(val_default)) {
            this.value = val_default;
            if (_.isString(this.value)) {
              if (this.value.indexOf('{{values.') !== -1) {
                // This label wants to use the value of another input field.
                // Convert that construct into {{jsonform.getValue(key)}} for
                // Underscore to call the appropriate function of formData
                // when template gets called (note calling a function is not
                // exactly Mustache-friendly but is supported by Underscore).
                this.value = this.value.replace(
                  /\{\{values\.([^\}]+)\}\}/g,
                  '{{getValue("$1")}}');
              } else {
                // Note applying the array path probably doesn't make any sense,
                // but some geek might want to have a label "foo[].bar[].baz",
                // with the [] replaced by the appropriate array path.
                this.value = applyArrayPath(this.value, this.arrayPath, true);
              }
              if (this.value) {
                this.value = _.template(this.value, valueTemplateSettings)(formData);
              }
            }
            this.defaultValue = true;
          }
        }
      }
    } else if (this.view && this.view.array) {
      // Case 2: array-like node

      // If there are no :
      // - previously submitted values
      // - default values in top array scope
      // - minItems > 0,
      // , the array gets rendered without children items. Someone could arguing
      // that is not natural from a user experience perspective, but that
      // procedure prevents some confusions and erros:
      // - recursive references are properly handled (previously it must define
      //   default empty array)
      // - previously if array subitems has defined default values it was
      //   propagated to `new empty item`, but if user won't delete this item the
      //   default values are submitted rather than omiting that item
      nbChildren = 0;

      if (values) {
        var previousArrayValue = jsonform.util.getObjKeyEx(values, this.key);
        if (previousArrayValue && Array.isArray(previousArrayValue)) {
          nbChildren = previousArrayValue.length;
        } else if (!_.isEmpty(previousArrayValue)) {
          // piorek94: checking if previousArrayValue is empty object helps out
          // with disappearing one empty item in rendered array while sorting
          nbChildren = this.getPreviousNumberOfItems(values, this.arrayPath);
        }
      }
      // TODO: use default values at the array level when form has not been
      // submitted before. Note it's not that easy because each value may
      // be a complex structure that needs to be pushed down the subtree.
      // The easiest way is probably to generate a "values" object and
      // compute initial values from that object
      else if (!ignoreDefaultValues) {
        var arr_default = getSchemaDefaultByKeyWithArrayIdx(self.ownerTree.formDesc.schema, this.key, topDefaultArrayLevel);
        if (arr_default && Array.isArray(arr_default)) {
          nbChildren = arr_default.length;
        }
      }

      for (i = 0; i < nbChildren; i++) {
        this.appendChild(this.getChildTemplate().clone());
      }
    }

    // Case 3 and in any case: recurse through the list of children
    _.each(this.children, function(child) {
      child.computeInitialValues(values, ignoreDefaultValues, topDefaultArrayLevel);
    });

    // If the node's value is to be used as legend for its "container"
    // (typically the array the node belongs to), ensure that the container
    // has a direct link to the node for the corresponding tab.
    if (this.formElement && this.formElement.valueInLegend) {
      node = this;
      while (node) {
        if (node.parentNode &&
          node.parentNode.view &&
          node.parentNode.view.array) {
          node.legendChild = this;
          if (node.formElement && node.formElement.legend) {
            node.legend = applyArrayPath(node.formElement.legend, node.arrayPath);
            formData.idx = (node.arrayPath.length > 0) ?
              node.arrayPath[node.arrayPath.length - 1] + 1 :
              node.childPos + 1;
            formData.value = isSet(this.value) ? this.value : '';
            node.legend = _.template(node.legend, valueTemplateSettings)(formData);
            break;
          }
        }
        node = node.parentNode;
      }
    }
  };


  /**
   * Returns the number of items that the array node should have based on
   * previously submitted values.
   *
   * The whole difficulty is that values may be hidden deep in the subtree
   * of the node and may actually target different arrays in the JSON schema.
   *
   * @function
   * @param {Object} values Previously submitted values
   * @param {Array(Number)} arrayPath the array path we're interested in
   * @return {Number} The number of items in the array
   */
  formNode.prototype.getPreviousNumberOfItems = function(values, arrayPath) {
    var key = null;
    var arrayValue = null;
    var childNumbers = null;
    var idx = 0;

    if (!values) {
      // No previously submitted values, no need to go any further
      return 0;
    }

    if (this.view.inputfield && this.schemaElement) {
      // Case 1: node is a simple input field that links to a key in the schema.
      // The schema key looks typically like:
      //  foo.bar[].baz.toto[].truc[].bidule
      // The goal is to apply the array path and truncate the key to the last
      // array we're interested in, e.g. with an arrayPath [4, 2]:
      //  foo.bar[4].baz.toto[2]
      key = truncateToArrayDepth(this.formElement.key, arrayPath.length);
      key = applyArrayPath(key, arrayPath);
      arrayValue = jsonform.util.getObjKey(values, key);
      if (!arrayValue) {
        // No key? That means this field had been left empty
        // in previous submit
        return 0;
      }
      childNumbers = _.map(this.children, function(child) {
        return child.getPreviousNumberOfItems(values, arrayPath);
      });
      return _.max([_.max(childNumbers) || 0, arrayValue.length]);
    } else if (this.view.array) {
      // Case 2: node is an array-like node, look for input fields
      // in its child template
      return this.getChildTemplate().getPreviousNumberOfItems(values, arrayPath);
    } else {
      // Case 3: node is a leaf or a container,
      // recurse through the list of children and return the maximum
      // number of items found in each subtree
      childNumbers = _.map(this.children, function(child) {
        return child.getPreviousNumberOfItems(values, arrayPath);
      });
      return _.max(childNumbers) || 0;
    }
  };


  /**
   * Returns the structured object that corresponds to the form values entered
   * by the user for the node's subtree.
   *
   * The returned object follows the structure of the JSON schema that gave
   * birth to the form.
   *
   * Obviously, the node must have been rendered before that function may
   * be called.
   *
   * @function
   * @param {Array(Number)} updateArrayPath Array path to use to pretend that
   *  the entered values were actually entered for another item in an array
   *  (this is used to move values around when an item is inserted/removed/moved
   *  in an array)
   * @return {Object} The object that follows the data schema and matches the
   *  values entered by the user.
   */
  formNode.prototype.getFormValues = function(updateArrayPath) {
    // The values object that will be returned
    var values = {};

    if (!this.el) {
      throw new Error('formNode.getFormValues can only be called on nodes that are associated with a DOM element in the tree');
    }

    // Form fields values
    var formArray = $(':input', this.el).serializeArray();

    // Set values to false for unset checkboxes and radio buttons
    // because serializeArray() ignores them
    formArray = formArray.concat(
      $(':input[type=checkbox]:not(:disabled):not(:checked)[name]', this.el).map(function() {
        return {
          "name": this.name,
          "value": this.checked
        };
      }).get()
    );
    // get values from readonly checkboxes (which is also disabled)
    formArray = formArray.concat(
      $(':input[type=checkbox]:disabled[name][readonly="readonly"]', this.el).map(function() {
        return {
          "name": this.name,
          "value": this.checked
        };
      }).get()
    );

    if (updateArrayPath) {
      _.each(formArray, function(param) {
        param.name = applyArrayPath(param.name, updateArrayPath);
      });
    }

    // The underlying data schema
    var formSchema = this.ownerTree.formDesc.schema;

    for (var i = 0; i < formArray.length; i++) {
      // Retrieve the key definition from the data schema
      var name = formArray[i].name;
      var eltSchema = getSchemaKey(formSchema.properties, name);
      var arrayMatch = null;
      var cval = null;

      // Skip the input field if it's not part of the schema
      if (!eltSchema) continue;

      // Handle multiple checkboxes separately as the idea is to generate
      // an array that contains the list of enumeration items that the user
      // selected.
      if (eltSchema._jsonform_checkboxes_as_array) {
        arrayMatch = name.match(/\[([0-9]*)\]$/);
        if (arrayMatch) {
          name = name.replace(/\[([0-9]*)\]$/, '');
          cval = jsonform.util.getObjKey(values, name) || [];
          if (eltSchema._jsonform_checkboxes_as_array === 'value' && formArray[i].value !== false && formArray[i].value !== '') {
            // Value selected, push the corresponding enumeration item
            // to the data result
            cval.push(formArray[i].value);
          } else if (eltSchema._jsonform_checkboxes_as_array === true && formArray[i].value === '1') {
            // Value selected, push the corresponding enumeration item
            // to the data result
            cval.push(eltSchema['enum'][parseInt(arrayMatch[1], 10)]);
          }
          jsonform.util.setObjKey(values, name, cval);
          continue;
        }
      }
      if (eltSchema._jsonform_get_value_by_tagsinput === 'tagsinput') {
        var vals;
        if (updateArrayPath) {
          var oriName = applyArrayPath(name, this.arrayPath);
          vals = $(':input[name="' + oriName + '"]', this.el).tagsinput('items');
        } else
          vals = $(':input[name="' + name + '"]', this.el).tagsinput('items');
        // this may be called multiple times, but it's ok.
        jsonform.util.setObjKey(values, name, vals);
        continue;
      }
      if (name.slice(-2) === '[]') {
        name = name.slice(0, -2);
        eltSchema = getSchemaKey(formSchema.properties, name);
        if (eltSchema.type === 'array') {
          cval = jsonform.util.getObjKey(values, name) || [];
          cval.push(formArray[i].value);
          jsonform.util.setObjKey(values, name, cval);
          continue;
        }
      }

      // Type casting
      if (eltSchema.type === 'boolean') {
        if (formArray[i].value === '0' || formArray[i].value === 'false') {
          formArray[i].value = false;
        } else if (formArray[i].value === '') {
          formArray[i].value = null;
        } else {
          formArray[i].value = !!formArray[i].value;
        }
      }
      if ((eltSchema.type === 'number') ||
        (eltSchema.type === 'integer')) {
        if (_.isString(formArray[i].value)) {
          if (!formArray[i].value.length) {
            formArray[i].value = null;
          } else if (!isNaN(Number(formArray[i].value))) {
            formArray[i].value = Number(formArray[i].value);
          }
        }
      }
      if ((eltSchema.type === 'string') &&
        (formArray[i].value === '') &&
        !eltSchema._jsonform_allowEmpty) {
        formArray[i].value = null;
      }
      if ((eltSchema.type === 'object') &&
        _.isString(formArray[i].value) &&
        (formArray[i].value.substring(0, 1) === '{')) {
        try {
          formArray[i].value = JSON.parse(formArray[i].value);
        } catch (e) {
          formArray[i].value = {};
        }
      }
      if ((eltSchema.type === 'array') && _.isString(formArray[i].value)) {
        if (formArray[i].value.substring(0, 1) === '[') {
          try {
            formArray[i].value = JSON.parse(formArray[i].value);
          } catch (e) {
            formArray[i].value = []; // or null?
          }
        } else
          formArray[i].value = null;
      }
      if ((eltSchema.type === 'null') &&
        (formArray[i].value === 'null')) {
        formArray[i].value = null;
      }
      //TODO: is this due to a serialization bug?
      if ((eltSchema.type === 'object') &&
        (formArray[i].value === 'null' || formArray[i].value === '')) {
        formArray[i].value = null;
      }

      if (formArray[i].name && ((formArray[i].value !== null) || ((eltSchema.type === 'null') && (formArray[i].value === null)))) {
        jsonform.util.setObjKey(values, formArray[i].name, formArray[i].value);
      }
    }
    return values;
  };



  /**
   * Renders the node.
   *
   * Rendering is done in three steps: HTML generation, DOM element creation
   * and insertion, and an enhance step to bind event handlers.
   *
   * @function
   * @param {Node} el The DOM element where the node is to be rendered. The
   *  node is inserted at the right position based on its "childPos" property.
   */
  formNode.prototype.render = function(el) {
    var html = this.generate();
    this.setContent(html, el);
    this.enhance();
  };


  /**
   * Inserts/Updates the HTML content of the node in the DOM.
   *
   * If the HTML is an update, the new HTML content replaces the old one.
   * The new HTML content is not moved around in the DOM in particular.
   *
   * The HTML is inserted at the right position in its parent's DOM subtree
   * otherwise (well, provided there are enough children, but that should always
   * be the case).
   *
   * @function
   * @param {string} html The HTML content to render
   * @param {Node} parentEl The DOM element that is to contain the DOM node.
   *  This parameter is optional (the node's parent is used otherwise) and
   *  is ignored if the node to render is already in the DOM tree.
   */
  formNode.prototype.setContent = function(html, parentEl) {
    var node = $(html);
    var parentNode = parentEl ||
      (this.parentNode ? this.parentNode.el : this.ownerTree.domRoot);
    var nextSibling = null;

    if (this.el) {
      // Replace the contents of the DOM element if the node is already in the tree
      $(this.el).replaceWith(node);
    } else {
      // Insert the node in the DOM if it's not already there
      nextSibling = $(parentNode).children().get(this.childPos);
      if (nextSibling) {
        $(nextSibling).before(node);
      } else {
        $(parentNode).append(node);
      }
    }

    // Save the link between the form node and the generated HTML
    this.el = node;

    // Update the node's subtree, extracting DOM elements that match the nodes
    // from the generated HTML
    this.updateElement(this.el);
  };


  /**
   * Updates the DOM element associated with the node.
   *
   * Only nodes that have ID are directly associated with a DOM element.
   *
   * @function
   */
  formNode.prototype.updateElement = function(domNode) {
    if (this.id) {
      this.el = $('#' + escapeSelector(this.id), domNode).get(0);
      if (this.view && this.view.getElement) {
        this.el = this.view.getElement(this.el);
      }
      if ((this.fieldtemplate !== false) &&
        this.view && this.view.fieldtemplate) {
        // The field template wraps the element two or three level deep
        // in the DOM tree, depending on whether there is anything prepended
        // or appended to the input field
        this.el = $(this.el).parent().parent();
        if (this.prepend || this.append) {
          this.el = this.el.parent();
        }
        this.el = this.el.get(0);
      }
      if (this.parentNode && this.parentNode.view &&
        this.parentNode.view.childTemplate) {
        // TODO: the child template may introduce more than one level,
        // so the number of levels introduced should rather be exposed
        // somehow in jsonform.fieldtemplate.
        this.el = $(this.el).parent().get(0);
      }
    }

    for (const k in this.children) {
      if (this.children.hasOwnProperty(k) == false) {
        continue;
      }
      this.children[k].updateElement(this.el || domNode);
    }
  };


  /**
   * Generates the view's HTML content for the underlying model.
   *
   * @function
   */
  formNode.prototype.generate = function() {
    var data = {
      id: this.id,
      keydash: this.keydash,
      elt: this.formElement,
      schema: this.schemaElement,
      node: this,
      value: isSet(this.value) ? this.value : '',
      cls: this.ownerTree.defaultConfig,
      escape: escapeHTML
    };
    var template = null;
    var html = '';

    // Complete the data context if needed
    if (this.ownerTree.formDesc.onBeforeRender) {
      this.ownerTree.formDesc.onBeforeRender(data, this);
    }
    if (this.view.onBeforeRender) {
      this.view.onBeforeRender(data, this);
    }

    // Use the template that 'onBeforeRender' may have set,
    // falling back to that of the form element otherwise
    if (this.template) {
      template = this.template;
    } else if (this.formElement && this.formElement.template) {
      template = this.formElement.template;
    } else {
      template = this.view.template;
    }

    // Wrap the view template in the generic field template
    // (note the strict equality to 'false', needed as we fallback
    // to the view's setting otherwise)
    if ((this.fieldtemplate !== false) &&
      (this.fieldtemplate || this.view.fieldtemplate)) {
      template = jsonform.fieldTemplate(template);
    }

    // Wrap the content in the child template of its parent if necessary.
    if (this.parentNode && this.parentNode.view &&
      this.parentNode.view.childTemplate) {
      template = this.parentNode.view.childTemplate(template, this.parentNode);
    }

    // Prepare the HTML of the children
    var childrenhtml = '';
    _.each(this.children, function(child) {
      childrenhtml += child.generate();
    });
    data.children = childrenhtml;

    data.fieldHtmlClass = '';
    if (this.ownerTree &&
      this.ownerTree.formDesc &&
      this.ownerTree.formDesc.params &&
      this.ownerTree.formDesc.params.fieldHtmlClass) {
      data.fieldHtmlClass = this.ownerTree.formDesc.params.fieldHtmlClass;
    }
    if (this.formElement &&
      (typeof this.formElement.fieldHtmlClass !== 'undefined')) {
      data.fieldHtmlClass = this.formElement.fieldHtmlClass;
    }

    // Apply the HTML template
    html = _.template(template, fieldTemplateSettings)(data);
    return html;
  };


  /**
   * Enhances the view with additional logic, binding event handlers
   * in particular.
   *
   * The function also runs the "insert" event handler of the view and
   * form element if they exist (starting with that of the view)
   *
   * @function
   */
  formNode.prototype.enhance = function() {
    var node = this;
    var handlers = null;
    var handler = null;
    var formData = _.clone(this.ownerTree.formDesc.tpldata) || {};

    if (this.formElement) {
      // Check the view associated with the node as it may define an "onInsert"
      // event handler to be run right away
      if (this.view.onInsert) {
        this.view.onInsert({
          target: $(this.el)
        }, this);
      }

      handlers = this.handlers || this.formElement.handlers;

      // Trigger the "insert" event handler
      handler = this.onInsert || this.formElement.onInsert;
      if (handler) {
        handler({
          target: $(this.el)
        }, this);
      }
      if (handlers) {
        _.each(handlers, function(handler, onevent) {
          if (onevent === 'insert') {
            handler({
              target: $(this.el)
            }, this);
          }
        }, this);
      }

      // No way to register event handlers if the DOM element is unknown
      // TODO: find some way to register event handlers even when this.el is not set.
      if (this.el) {

        // Register specific event handlers
        // TODO: Add support for other event handlers
        if (this.onChange)
          $(this.el).on('change', function(evt) {
            node.onChange(evt, node);
          });
        if (this.view.onChange)
          $(this.el).on('change', function(evt) {
            node.view.onChange(evt, node);
          });
        if (this.formElement.onChange)
          $(this.el).on('change', function(evt) {
            node.formElement.onChange(evt, node);
          });

        if (this.onInput)
          $(this.el).on('input', function(evt) {
            node.onInput(evt, node);
          });
        if (this.view.onInput)
          $(this.el).on('input', function(evt) {
            node.view.onInput(evt, node);
          });
        if (this.formElement.onInput)
          $(this.el).on('input', function(evt) {
            node.formElement.onInput(evt, node);
          });

        if (this.onClick)
          $(this.el).on('click', function(evt) {
            node.onClick(evt, node);
          });
        if (this.view.onClick)
          $(this.el).on('click', function(evt) {
            node.view.onClick(evt, node);
          });
        if (this.formElement.onClick)
          $(this.el).on('click', function(evt) {
            node.formElement.onClick(evt, node);
          });

        if (this.onKeyUp)
          $(this.el).on('keyup', function(evt) {
            node.onKeyUp(evt, node);
          });
        if (this.view.onKeyUp)
          $(this.el).on('keyup', function(evt) {
            node.view.onKeyUp(evt, node);
          });
        if (this.formElement.onKeyUp)
          $(this.el).on('keyup', function(evt) {
            node.formElement.onKeyUp(evt, node);
          });

        if (handlers) {
          _.each(handlers, function(handler, onevent) {
            if (onevent !== 'insert') {
              $(this.el).on(onevent, function(evt) {
                handler(evt, node);
              });
            }
          }, this);
        }
      }

      // Auto-update legend based on the input field that's associated with it
      if (this.formElement.legend && this.legendChild && this.legendChild.formElement) {
        var onChangeHandler = function(evt) {
          if (node.formElement && node.formElement.legend && node.parentNode) {
            node.legend = applyArrayPath(node.formElement.legend, node.arrayPath);
            formData.idx = (node.arrayPath.length > 0) ?
              node.arrayPath[node.arrayPath.length - 1] + 1 :
              node.childPos + 1;
            formData.value = $(evt.target).val();
            node.legend = _.template(node.legend, valueTemplateSettings)(formData);
            $(node.parentNode.el).trigger('legendUpdated');
          }
        };
        $(this.legendChild.el).on('change', onChangeHandler);
        $(this.legendChild.el).on('keyup', onChangeHandler);
      }
    }

    // Recurse down the tree to enhance children
    _.each(this.children, function(child) {
      child.enhance();
    });
  };



  /**
   * Inserts an item in the array at the requested position and renders the item.
   *
   * @function
   * @param {Number} idx Insertion index
   */
  formNode.prototype.insertArrayItem = function(idx, domElement) {
    var i = 0;

    // Insert element at the end of the array if index is not given
    if (idx === undefined) {
      idx = this.children.length;
    }

    // Create the additional array item at the end of the list,
    // using the item template created when tree was initialized
    // (the call to resetValues ensures that 'arrayPath' is correctly set)
    var child = this.getChildTemplate().clone();
    this.appendChild(child);
    child.resetValues();

    // To create a blank array item at the requested position,
    // shift values down starting at the requested position
    // one to insert (note we start with the end of the array on purpose)
    for (i = this.children.length - 2; i >= idx; i--) {
      this.children[i].moveValuesTo(this.children[i + 1]);
    }

    // Initialize the blank node we've created with default values
    this.children[idx].resetValues();

    // XXX: new array item won't follow upper level default.
    this.children[idx].computeInitialValues(null, false, this.children[idx].arrayPath.length);

    // Re-render all children that have changed
    for (i = idx; i < this.children.length; i++) {
      this.children[i].render(domElement);
    }
  };


  /**
   * Remove an item from an array
   *
   * @function
   * @param {Number} idx The index number of the item to remove
   */
  formNode.prototype.deleteArrayItem = function(idx) {
    var i = 0;
    var child = null;

    // Delete last item if no index is given
    if (idx === undefined) {
      idx = this.children.length - 1;
    }

    // Move values up in the array
    for (i = idx; i < this.children.length - 1; i++) {
      this.children[i + 1].moveValuesTo(this.children[i]);
      this.children[i].render();
    }

    // Remove the last array item from the DOM tree and from the form tree
    this.removeChild();
  };

  /**
   * Returns the minimum/maximum number of items that an array field
   * is allowed to have according to the schema definition of the fields
   * it contains.
   *
   * The function parses the schema definitions of the array items that
   * compose the current "array" node and returns the minimum value of
   * "maxItems" it encounters as the maximum number of items, and the
   * maximum value of "minItems" as the minimum number of items.
   *
   * The function reports a -1 for either of the boundaries if the schema
   * does not put any constraint on the number of elements the current
   * array may have of if the current node is not an array.
   *
   * Note that array boundaries should be defined in the JSON Schema using
   * "minItems" and "maxItems". The code also supports "minLength" and
   * "maxLength" as a fallback, mostly because it used to by mistake (see #22)
   * and because other people could make the same mistake.
   *
   * @function
   * @return {Object} An object with properties "minItems" and "maxItems"
   *  that reports the corresponding number of items that the array may
   *  have (value is -1 when there is no constraint for that boundary)
   */
  formNode.prototype.getArrayBoundaries = function() {
    var boundaries = {
      minItems: -1,
      maxItems: -1
    };

    if (!this.view || !this.view.array) return boundaries;

    var getNodeBoundaries = function(node, initialNode) {
      var schemaKey = null;
      var arrayKey = null;
      var boundaries = {
        minItems: -1,
        maxItems: -1
      };
      initialNode = initialNode || node;

      if (node.view && node.view.array && (node !== initialNode)) {
        // New array level not linked to an array in the schema,
        // so no size constraints
        return boundaries;
      }

      if (node.key) {
        // Note the conversion to target the actual array definition in the
        // schema where minItems/maxItems may be defined. If we're still looking
        // at the initial node, the goal is to convert from:
        //  foo[0].bar[3].baz to foo[].bar[].baz
        // If we're not looking at the initial node, the goal is to look at the
        // closest array parent:
        //  foo[0].bar[3].baz to foo[].bar
        arrayKey = node.key.replace(/\[[0-9]+\]/g, '[]');
        if (node !== initialNode) {
          arrayKey = arrayKey.replace(/\[\][^\[\]]*$/, '');
        }
        schemaKey = getSchemaKey(
          node.ownerTree.formDesc.schema.properties,
          arrayKey
        );
        if (!schemaKey) return boundaries;

        if (schemaKey.minItems >= 0) {
          boundaries.minItems = schemaKey.minItems;
        }

        if (schemaKey.minLength >= 0) {
          boundaries.minItems = schemaKey.minLength;
        }

        if (schemaKey.maxItems >= 0) {
          boundaries.maxItems = schemaKey.maxItems;
        }

        if (schemaKey.maxLength >= 0) {
          boundaries.maxItems = schemaKey.maxLength;
        }

        return boundaries;
      } else {
        _.each(node.children, function(child) {
          var subBoundaries = getNodeBoundaries(child, initialNode);
          if (subBoundaries.minItems !== -1) {
            if (boundaries.minItems !== -1) {
              boundaries.minItems = Math.max(
                boundaries.minItems,
                subBoundaries.minItems
              );
            } else {
              boundaries.minItems = subBoundaries.minItems;
            }
          }
          if (subBoundaries.maxItems !== -1) {
            if (boundaries.maxItems !== -1) {
              boundaries.maxItems = Math.min(
                boundaries.maxItems,
                subBoundaries.maxItems
              );
            } else {
              boundaries.maxItems = subBoundaries.maxItems;
            }
          }
        });
      }
      return boundaries;
    };
    return getNodeBoundaries(this);
  };


  /**
   * Form tree class.
   *
   * Holds the internal representation of the form.
   * The tree is always in sync with the rendered form, this allows to parse
   * it easily.
   *
   * @class
   */
  var formTree = function() {
    this.eventhandlers = [];
    this.root = null;
    this.formDesc = null;
  };

  /**
   * Initializes the form tree structure from the JSONForm object
   *
   * This function is the main entry point of the JSONForm library.
   *
   * Initialization steps:
   * 1. the internal tree structure that matches the JSONForm object
   *  gets created (call to buildTree)
   * 2. initial values are computed from previously submitted values
   *  or from the default values defined in the JSON schema.
   *
   * When the function returns, the tree is ready to be rendered through
   * a call to "render".
   *
   * @function
   */
  formTree.prototype.initialize = function(formDesc) {
    formDesc = formDesc || {};

    // Keep a pointer to the initial JSONForm
    // (note clone returns a shallow copy, only first-level is cloned)
    this.formDesc = _.clone(formDesc);

    jsonform.defaultConfig = getdefaultConfig();
    this.defaultConfig = _.clone(jsonform.defaultConfig);
    if (this.formDesc.defaultConfig)
      _.extend(this.defaultConfig, this.formDesc.defaultConfig);

    // Compute form prefix if no prefix is given.
    this.formDesc.prefix = this.formDesc.prefix ||
      'jsonform-' + _.uniqueId();

    /**
     * Checks if given object is JSON schema shorthand i.e. contents of top level
     * object type properties.
     */
    var isJSONSchemaShorthand = function(schema) {
      // check if type is defined (as string or array), otherwise we can assume it
      // is property
      if (schema.type && (_.isString(schema.type) || Array.isArray(schema.type))) {
        return false;
      }
      // there are several keywords that may indicate to full JSON schema
      // but we do not have type defined so we can assume e.g. missed object type
      var keyPredicatesFullJSONSchema = ['$schema', 'properties', 'definitions'];
      for (var key in schema) {
        if (_.contains(keyPredicatesFullJSONSchema, key)) {
          return false;
        }
      }
      return true;
    };

    // JSON schema shorthand
    if (this.formDesc.schema && isJSONSchemaShorthand(this.formDesc.schema) === true) {
      this.formDesc.schema = {
        type: 'object',
        properties: this.formDesc.schema
      };
    }

    // Schema V4 adjust - migrate v3 draft to v4 draft
    // orginal code: https://github.com/geraintluff/json-schema-compatibility
    function convert3to4Type(types, always) {
      if (!Array.isArray(types)) {
        types = [types];
      }
      var needsReplacement = !!always;
      var result = [];
      for (var i = 0; i < types.length; i++) {
        var entry = types[i];
        if (typeof entry === 'object') {
          result.push(entry);
          needsReplacement = true;
        } else {
          result.push({
            "type": entry
          });
        }
      }
      return needsReplacement && result;
    }

    function convertSchemaV3ToV4(schema) {
      if (schema) {
        // Old-style "type"
        if (schema.type) {
          if (typeof schema.type !== 'string') {
            var anyOf = convert3to4Type(schema.type);
            if (anyOf) {
              schema.anyOf = anyOf;
              delete schema.type;
            }
          } else if (schema.type == 'any') {
            delete schema.type;
          }
        }
        if (schema['extends']) {
          var allOf = schema['extends'];
          if (!Array.isArray(allOf)) {
            allOf = [allOf];
          }
          schema.allOf = allOf;
          delete schema['extends'];
        }
        if (schema.disallow) {
          if (typeof schema.disallow === 'string') {
            schema.not = {
              "type": schema.disallow
            };
          } else {
            schema.not = {
              "anyOf": convert3to4Type(schema.disallow, true)
            };
          }
          delete schema.disallow;
        }

        // Object concerns
        if (schema.properties) {
          var required = Array.isArray(schema.required) ? schema.required : [];
          for (var field in schema.properties) {
            var fieldSchema = schema.properties[field];
            if (fieldSchema && typeof fieldSchema.required === 'boolean') {
              if (fieldSchema.required) {
                if (required.indexOf(field) < 0)
                  required.push(field);
              }
              delete fieldSchema.required;
            } else if (fieldSchema.required !== undefined && typeof fieldSchema.required !== 'boolean' && !Array.isArray(fieldSchema.required)) {
              // just in case
              throw new Error('field ' + field + "'s required property should be either boolean or array of strings");
            }
            // jsonForm specific limitation
            if (fieldSchema.type === 'array' && fieldSchema.items && Array.isArray(fieldSchema.items)) {
              throw new Error('the items property of array property ' + field + ' in the schema definition must be an object');
            }
          }
          if (required.length) {
            schema.required = required;
          }
        }
        if (schema.dependencies) {
          for (var deps_field in schema.dependencies) {
            if (typeof schema.dependencies[deps_field] === 'string') {
              schema.dependencies[deps_field] = [schema.dependencies[deps_field]];
            }
          }
        }
        // This is safe as long as we process our children *after* we collect their "required" properties
        // - otherwise, they'd delete their "required" booleans before we got a chance to see them
        if (typeof schema.required === 'boolean') {
          delete schema.required;
        }

        // Numeric concerns
        if (typeof schema.divisibleBy !== 'undefined') {
          schema.multipleOf = schema.divisibleBy;
          delete schema.divisibleBy;
        }

        // This MUST happen at the end of the function, otherwise it'll screw up "required" collection
        for (var key in schema) {
          if (key === "properties" || key === "patternProperties" || key === "dependencies") {
            for (var subKey in schema[key]) {
              schema[key][subKey] = convertSchemaV3ToV4(schema[key][subKey]);
            }
          } else if (key !== "enum") {
            if (Array.isArray(schema[key])) {
              for (var i = 0; i < schema[key].length; i++) {
                schema[key][i] = convertSchemaV3ToV4(schema[key][i]);
              }
            } else if (typeof schema[key] === "object") {
              schema[key] = convertSchemaV3ToV4(schema[key]);
            }
          }
        }
        return schema;
      }
    }

    this.formDesc._originalSchema = this.formDesc.schema;
    this.formDesc.schema = JSON.parse(JSON.stringify(this.formDesc.schema));

    convertSchemaV3ToV4(this.formDesc.schema);

    this.formDesc._originalSchemaV4 = this.formDesc.schema;
    this.formDesc.schema = JSON.parse(JSON.stringify(this.formDesc.schema));

    // z-schema reports errors UNRESOLVABLE_REFERENCE on $schema
    if (this.formDesc._originalSchemaV4.$schema) {
      delete this.formDesc._originalSchemaV4.$schema;
    }

    // Resolve inline $ref definitions, result schema not work with z-schema at least
    var resolvedSchemaRefNodes = [];
    var depth = 0;

    function resolveRefs(obj, defs) {
      Object.keys(obj).forEach(function(prop, index, array) {
        var def = obj[prop];
        var ref;
        if (depth === 0 && prop === '$ref' && def !== null && typeof def === 'string') {
          if (def.slice(0, 14) === '#/definitions/') {
            ref = def.replace(/^#\/definitions\//, '');
            obj = _.extend(obj, defs[ref]);
            delete obj.$ref;
          } else {
            throw new Error('Unresolved $ref: ' + def);
          }
          if (resolvedSchemaRefNodes.indexOf(obj) < 0) {
            resolvedSchemaRefNodes.push(obj);
          }
        } else if (def !== null && typeof def === 'object') {
          if (def.$ref) {
            if (def.$ref.slice(0, 14) === '#/definitions/') {
              ref = def.$ref.replace(/^#\/definitions\//, '');
              obj[prop] = _.extend(obj[prop], defs[ref]);
              delete obj[prop].$ref;
            } else {
              throw new Error('Unresolved $ref: ' + def.$ref);
            }
          } else if (resolvedSchemaRefNodes.indexOf(def) < 0) {
            depth += 1;
            resolveRefs(def, defs);
            depth -= 1;
            resolvedSchemaRefNodes.push(def);
          }
        }
      });
    }

    if (this.formDesc.schema.definitions) {
      resolveRefs(this.formDesc.schema, this.formDesc.schema.definitions);
    }

    /**
     * Checks if given JSON schema represents simple (not object) root level
     * schema.
     */
    var isSimpleRootSchema = function(schema) {
      // checks for object root type
      if (schema.type) {
        if (_.isString(schema.type) && schema.type === 'object') {
          return false;
        } else if (Array.isArray(schema.type) && _.contains(schema.type, 'object')) {
          return false;
        }
      } else if (schema.properties) {
        // for backward compatibility: if schema has defined properties then
        // assume that root level schema is object
        return false;
      }
      return true;
    };

    // JSONForm can not deal with 'simple' (not 'object') types as schema root
    // handle this case by moving it to special created schema root object
    // type element and revert it on validate/gathering values
    if (this.formDesc.schema && isSimpleRootSchema(this.formDesc.schema) === true) {
      var distortedSchema = {};
      var distortedSchemaKey = this.formDesc.prefix + '-distortedSchema';
      for (var key in this.formDesc.schema) {
        if (!_.contains(['$schema', 'definitions'], key)) {
          distortedSchema[key] = this.formDesc.schema[key];
          delete this.formDesc.schema[key];
        }
      }
      this.formDesc.schema.properties = {};
      this.formDesc.schema.properties[distortedSchemaKey] = distortedSchema;
      this.formDesc._isDistorted = true;
      // change accordingly value given by user - only if it is not object (maybe
      // someone looked at sourcecode and knows what the key is)
      if (this.formDesc.value) {
        if (typeof this.formDesc.value !== 'object' || Array.isArray(this.formDesc.value)) {
          this.formDesc.value = {
            [distortedSchemaKey]: this.formDesc.value
          };
        }
      }
    } else {
      this.formDesc._isDistorted = false;
    }


    // Ensure layout is set
    this.formDesc.form = this.formDesc.form || [
      '*',
      {
        type: 'actions',
        items: [{
          type: 'submit',
          value: 'Submit'
        }]
      }
    ];
    this.formDesc.form = (_.isArray(this.formDesc.form) ?
      this.formDesc.form : [this.formDesc.form]);

    this.formDesc.params = this.formDesc.params || {};

    // Create the root of the tree
    this.root = new formNode();
    this.root.ownerTree = this;
    this.root.view = jsonform.elementTypes.root;

    // Generate the tree from the form description
    this.buildTree();

    // Compute the values associated with each node
    // (for arrays, the computation actually creates the form nodes)
    this.computeInitialValues();
  };


  /**
   * Constructs the tree from the form description.
   *
   * The function must be called once when the tree is first created.
   *
   * @function
   */
  formTree.prototype.buildTree = function() {
    // Parse and generate the form structure based on the elements encountered:
    // - '*' means "generate all possible fields using default layout"
    // - a key reference to target a specific data element
    // - a more complex object to generate specific form sections
    _.each(this.formDesc.form, function(formElement) {
      if (formElement === '*') {
        _.each(this.formDesc.schema.properties, function(element, key) {
          if (this.formDesc.nonDefaultFormItems && this.formDesc.nonDefaultFormItems.indexOf(key) >= 0)
            return;
          this.root.appendChild(this.buildFromLayout({
            key: key
          }));
        }, this);
      } else {
        if (_.isString(formElement)) {
          formElement = {
            key: formElement
          };
        }
        this.root.appendChild(this.buildFromLayout(formElement));
      }
    }, this);
  };


  /**
   * Builds the internal form tree representation from the requested layout.
   *
   * The function is recursive, generating the node children as necessary.
   * The function extracts the values from the previously submitted values
   * (this.formDesc.value) or from default values defined in the schema.
   *
   * @function
   * @param {Object} formElement JSONForm element to render
   * @param {Object} context The parsing context (the array depth in particular)
   * @return {Object} The node that matches the element.
   */
  formTree.prototype.buildFromLayout = function(formElement, context) {
    var schemaElement = null;
    var node = new formNode();
    var view = null;
    var key = null;

    // XXX: we now support setup formElement for specific key by customFormItems
    if (formElement.key && this.formDesc.customFormItems) {
      var formEl = this.formDesc.customFormItems[formElement.key];
      if (formEl !== undefined) {
        formEl.key = formElement.key;
        formElement = formEl;
      }
    }

    // The form element parameter directly comes from the initial
    // JSONForm object. We'll make a shallow copy of it and of its children
    // not to pollute the original object.
    // (note JSON.parse(JSON.stringify()) cannot be used since there may be
    // event handlers in there!)
    formElement = _.clone(formElement);
    if (formElement.items) {
      if (_.isArray(formElement.items)) {
        formElement.items = _.map(formElement.items, _.clone);
      } else {
        formElement.items = [_.clone(formElement.items)];
      }
    }

    if (formElement.key) {
      // The form element is directly linked to an element in the JSON
      // schema. The properties of the form element override those of the
      // element in the JSON schema. Properties from the JSON schema complete
      // those of the form element otherwise.

      // Retrieve the element from the JSON schema
      schemaElement = getSchemaKey(
        this.formDesc.schema.properties,
        formElement.key);
      if (!schemaElement) {
        // The JSON Form is invalid!
        throw new Error('The JSONForm object references the schema key "' +
          formElement.key + '" but that key does not exist in the JSON schema');
      }

      // Schema element has just been found, let's trigger the
      // "onElementSchema" event
      // (tidoust: not sure what the use case for this is, keeping the
      // code for backward compatibility)
      if (this.formDesc.onElementSchema) {
        this.formDesc.onElementSchema(formElement, schemaElement);
      }

      formElement.name =
        formElement.name ||
        formElement.key;
      formElement.title =
        formElement.title ||
        schemaElement.title;
      formElement.description =
        formElement.description ||
        schemaElement.description;
      formElement.readOnly =
        formElement.readOnly ||
        schemaElement.readOnly ||
        formElement.readonly ||
        schemaElement.readonly;

      // A input field should be marked required unless formElement mark required
      // or it's an array's item's required field
      // or it's a required field of a required object (need verify the object parent chain's required)
      var isRequiredField = function(key, schema) {
        var parts = key.split('.');
        var field = parts.pop();
        // whether an array element field is required?
        // array element has minItems and maxItems which control whether the item is required
        // so, for array item, we do not consider it as required
        // then for array itself? it maybe required or not, yes. so, what does it matter?
        // a required array always has value, even empty array, it still cound has value.
        // a non-required array, can not appear in the result json at all.
        // here we try to figure out whether a form input element should be mark required.
        // all of them are default non-required, unless:
        // 1. it's top level element and it's marked required
        // 2. it's direct child of an array item and it's marked required
        // 3. it's direct child of an object and both it and its parent are marked required.
        if (field.slice(-2) == '[]') return false;
        var parentKey = parts.join('.');
        var required = false;
        // we need get parent schema's required value
        if (!parentKey) {
          required = schema.required && schema.required.indexOf(field) >= 0;
        } else {
          var parentSchema = getSchemaKey(schema.properties, parentKey);
          required = parentSchema.required && parentSchema.required.indexOf(field) >= 0;
          if (required)
            required = parentKey.slice(-2) == '[]' || isRequiredField(parentKey, schema);
        }
        return required;
      };
      formElement.required = formElement.required === true || schemaElement.required === true || isRequiredField(formElement.key, this.formDesc.schema);

      // Compute the ID of the input field
      if (!formElement.id) {
        formElement.id = escapeSelector(this.formDesc.prefix) +
          '-elt-' + slugify(formElement.key);
      }

      // Should empty strings be included in the final value?
      // TODO: it's rather unclean to pass it through the schema.
      if (formElement.allowEmpty) {
        schemaElement._jsonform_allowEmpty = true;
      }

      // If the form element does not define its type, use the type of
      // the schema element.
      if (!formElement.type) {
        // If schema type is an array containing only a type and "null",
        // remove null and make the element non-required
        if (_.isArray(schemaElement.type)) {
          if (_.contains(schemaElement.type, "null")) {
            schemaElement.type = _.without(schemaElement.type, "null");
            schemaElement.required = false;
          }
          if (schemaElement.type.length > 1) {
            throw new Error("Cannot process schema element with multiple types.");
          }
          schemaElement.type = _.first(schemaElement.type);
        }

        if ((schemaElement.type === 'string') &&
          (!_.isUndefined(schemaElement.format)) &&
          (_.contains(['url', 'time', 'email', 'date-time', 'date', 'color'], schemaElement.format))) {
          if (schemaElement.format === 'date-time') {
            formElement.type = 'datetime-local';
          } else {
            formElement.type = schemaElement.format;
          }
        } else if ((schemaElement.type === 'number' ||
            schemaElement.type === 'integer') &&
          !schemaElement['enum']) {
          formElement.type = 'number';
        } else if ((schemaElement.type === 'string' ||
            schemaElement.type === 'any') &&
          !schemaElement['enum']) {
          formElement.type = 'text';
        } else if (schemaElement.type === 'boolean') {
          formElement.type = 'checkbox';
        } else if (schemaElement.type === 'object') {
          if (schemaElement.properties) {
            formElement.type = 'fieldset';
          } else {
            formElement.type = 'textarea';
          }
        } else if (!_.isUndefined(schemaElement['enum'])) {
          formElement.type = 'select';
        } else {
          formElement.type = schemaElement.type;
        }
      }

      var prepareOptions = function(formElement, enumValues) {
        if (formElement.options) {
          if (Array.isArray(formElement.options)) {
            formElement.options = formElement.options.map(function(value) {
              return hasOwnProperty(value, 'value') ? value : {
                value: value,
                title: value
              };
            });
          } else if (typeof formElement.options === 'object') {
            // titleMap like options
            formElement.options = Object.keys(formElement.options).map(function(value) {
              return {
                value: value,
                title: formElement.options[value]
              };
            });
          }
        } else if (formElement.titleMap) {
          formElement.options = _.map(enumValues, function(value) {
            var title = value.toString();
            return {
              value: value,
              title: hasOwnProperty(formElement.titleMap, title) ? formElement.titleMap[title] : title
            };
          });
        } else {
          formElement.options = enumValues.map(function(value) {
            return {
              value: value,
              title: value.toString()
            };
          });
        }
      };
      // Unless overridden in the definition of the form element (or unless
      // there's a titleMap defined), use the enumeration list defined in
      // the schema
      if (formElement.options) {
        // FIXME: becareful certin type form element may has special format for options
        prepareOptions(formElement);
      } else if (schemaElement['enum'] || schemaElement.type === 'boolean') {
        var enumValues = schemaElement['enum'];
        if (!enumValues) {
          enumValues = formElement.type === 'select' ? ['', true, false] : [true, false];
        } else {
          formElement.optionsAsEnumOrder = true;
        }
        prepareOptions(formElement, enumValues);
      }

      // Flag a list of checkboxes with multiple choices
      if ((formElement.type === 'checkboxes' || formElement.type === 'checkboxbuttons') && schemaElement.items) {
        var theItem = Array.isArray(schemaElement.items) ? schemaElement.items[0] : schemaElement.items;
        if (formElement.options) {
          // options only but no enum mode, since no enum, we can use only the value mode
          prepareOptions(formElement);
          theItem._jsonform_checkboxes_as_array = 'value';
        } else {
          var checkbox_enums = theItem['enum'];
          if (checkbox_enums) {
            prepareOptions(formElement, checkbox_enums);
            formElement.optionsAsEnumOrder = true;
            theItem._jsonform_checkboxes_as_array = formElement.type === 'checkboxes' ? true : 'value';
          }
        }
      }
      if (formElement.getValue === 'tagsinput') {
        schemaElement._jsonform_get_value_by_tagsinput = 'tagsinput';
      }

      // If the form element targets an "object" in the JSON schema,
      // we need to recurse through the list of children to create an
      // input field per child property of the object in the JSON schema
      if (schemaElement.type === 'object') {
        _.each(schemaElement.properties, function(prop, propName) {
          var key = formElement.key + '.' + propName;
          if (this.formDesc.nonDefaultFormItems && this.formDesc.nonDefaultFormItems.indexOf(key) >= 0)
            return;
          node.appendChild(this.buildFromLayout({
            key: key
          }));
        }, this);
      }
    }

    if (!formElement.type) {
      formElement.type = 'text';
    }
    view = jsonform.elementTypes[formElement.type];
    if (!view) {
      throw new Error('The JSONForm contains an element whose type is unknown: "' +
        formElement.type + '"');
    }


    if (schemaElement) {
      // The form element is linked to an element in the schema.
      // Let's make sure the types are compatible.
      // In particular, the element must not be a "container"
      // (or must be an "object" or "array" container)
      if (!view.inputfield && !view.array &&
        (formElement.type !== 'selectfieldset') &&
        (schemaElement.type !== 'object')) {
        throw new Error('The JSONForm contains an element that links to an ' +
          'element in the JSON schema (key: "' + formElement.key + '") ' +
          'and that should not based on its type ("' + formElement.type + '")');
      }
    } else {
      // The form element is not linked to an element in the schema.
      // This means the form element must be a "container" element,
      // and must not define an input field.
      if (view.inputfield && (formElement.type !== 'selectfieldset')) {
        throw new Error('The JSONForm defines an element of type ' +
          '"' + formElement.type + '" ' +
          'but no "key" property to link the input field to the JSON schema');
      }
    }

    // A few characters need to be escaped to use the ID as jQuery selector
    formElement.iddot = escapeSelector(formElement.id || '');

    // Initialize the form node from the form element and schema element
    node.formElement = formElement;
    node.schemaElement = schemaElement;
    node.view = view;
    node.ownerTree = this;

    // Set event handlers
    if (!formElement.handlers) {
      formElement.handlers = {};
    }

    // Parse children recursively
    if (node.view.array) {
      // Do not create childTemplate until we first use it.
    } else if (formElement.items) {
      // The form element defines children elements
      _.each(formElement.items, function(item) {
        if (_.isString(item)) {
          item = {
            key: item
          };
        }
        node.appendChild(this.buildFromLayout(item));
      }, this);
    } else if (formElement.otherField) {
      var item = formElement.otherField;
      if (_.isString(item)) {
        item = formElement.otherField = {
          key: item,
          notitle: true
        };
      } else if (item.notitle === undefined) {
        item.notitle = true;
      }
      if (item.inline === undefined)
        item.inline = formElement.inline;
      node.appendChild(this.buildFromLayout(item));
    }

    return node;
  };


  /**
   * Computes the values associated with each input field in the tree based
   * on previously submitted values or default values in the JSON schema.
   *
   * For arrays, the function actually creates and inserts additional
   * nodes in the tree based on previously submitted values (also ensuring
   * that the array has at least one item).
   *
   * The function sets the array path on all nodes.
   * It should be called once in the lifetime of a form tree right after
   * the tree structure has been created.
   *
   * @function
   */
  formTree.prototype.computeInitialValues = function() {
    this.root.computeInitialValues(this.formDesc.value);
  };


  /**
   * Renders the form tree
   *
   * @function
   * @param {Node} domRoot The "form" element in the DOM tree that serves as
   *  root for the form
   */
  formTree.prototype.render = function(domRoot) {
    if (!domRoot) return;
    this.domRoot = domRoot;
    this.root.render();

    // If the schema defines required fields, flag the form with the
    // "jsonform-hasrequired" class for styling purpose
    // (typically so that users may display a legend)
    if (this.hasRequiredField()) {
      $(domRoot).addClass('jsonform-hasrequired');
    }
    $(domRoot).addClass('jsonform');
    $(domRoot).attr("novalidate", "novalidate");
  };

  /**
   * Walks down the element tree with a callback
   *
   * @function
   * @param {Function} callback The callback to call on each element
   */
  formTree.prototype.forEachElement = function(callback) {

    var f = function(root) {
      for (var i = 0; i < root.children.length; i++) {
        callback(root.children[i]);
        f(root.children[i]);
      }
    };
    f(this.root);

  };

  formTree.prototype.validate = function(noErrorDisplay) {

    var values = jsonform.getFormValue(this.domRoot);
    var errors = false;

    var options = this.formDesc;
    if (options.validate !== false) {
      var validator = false;
      if (this.domRoot.checkValidity() === false) {
        // browser validation
        this.formDesc._validatorVendor = 'browser';
        validator = true;
      } else if (typeof options.validate != "object") {
        if (global.Ajv) {
          validator = new global.Ajv({
            allErrors: true,
            schemaId: 'auto',
            unknownFormats: 'ignore',
            validateSchema: 'log',
            parseDate:false
          });
          this.formDesc._validatorVendor = 'ajv';
        } else if (global.ZSchema) {
          validator = new global.ZSchema({
            ignoreUnknownFormats: true
          });
          this.formDesc._validatorVendor = 'z-schema';
        } else if (global.JSONFormValidator) {
          validator = global.JSONFormValidator.createEnvironment("json-schema-draft-03");
          this.formDesc._validatorVendor = 'jsv';
        }
      } else {
        validator = options.validate;
      }
      if (validator) {
        $(this.domRoot).jsonFormErrors(false, options);
        if (this.formDesc._validatorVendor == 'browser') {
          var browserErrors = [];
          Array.from(this.domRoot.elements).forEach(function(field) {
            if (field.checkValidity() === false) {
              if (field.id) {
                browserErrors.push({
                  id: field.id,
                  message: field.validationMessage || 'Invalid value.'
                });
              }
            }
          });
          if (browserErrors.length) {
            if (!errors) errors = [];
            errors = errors.concat(browserErrors);
          }
        } else if (this.formDesc._validatorVendor == 'ajv') {
          console.log(values);

          var validateAjv = validator.compile(this.formDesc._originalSchemaV4);
          var valid = validateAjv(values);
          if (!valid && validateAjv.errors && validateAjv.errors.length) {
            errors = validateAjv.errors;
            console.log(errors);
          }
        } else if (this.formDesc._validatorVendor == 'z-schema') {

          var vZSchema = validator.validate(values, this.formDesc._originalSchemaV4);
          errors = validator.getLastErrors();
          vZSchema = vZSchema ? null : {
            errors: errors
          };
        } else if (this.formDesc._validatorVendor == 'jsv') {
          var vJSV = validator.validate(values, this.formDesc._originalSchema);
          if (vJSV && vJSV.errors && vJSV.errors.length) {
            if (!errors) errors = [];
            errors = errors.concat(vJSV.errors);
          }
        } else {
          var customValidate = validator.validate(values, this.formDesc._originalSchema);
          if (customValidate && customValidate.errors && customValidate.errors.length) {
            if (!errors) errors = [];
            errors = errors.concat(customValidate.errors);
          }
        }
      }
    }

    if (errors && !noErrorDisplay) {
      if (options.displayErrors) {
        options.displayErrors(errors, this.domRoot);
      } else {
        $(this.domRoot).jsonFormErrors(errors, options);
      }
    }

    return {
      "errors": errors,
      "values": values
    };

  };

  formTree.prototype.submit = function(evt) {

    var stopEvent = function() {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      return false;
    };
    var values = jsonform.getFormValue(this.domRoot);
    var options = this.formDesc;

    var brk = false;
    this.forEachElement(function(elt) {
      if (brk) return;
      if (elt.view.onSubmit) {
        brk = !elt.view.onSubmit(evt, elt); //may be called multiple times!!
      }
    });

    if (brk) return stopEvent();

    var validated = this.validate();

    if (options.onSubmit && !options.onSubmit(validated.errors, values)) {
      return stopEvent();
    }

    if (validated.errors) return stopEvent();

    if (options.onSubmitValid && !options.onSubmitValid(values)) {
      return stopEvent();
    }

    return false;

  };


  /**
   * Returns true if the form displays a "required" field.
   *
   * To keep things simple, the function just return true if detect any
   * jsonform-required class in the form dom.
   *
   * @function
   * @return {boolean} True when the form has some required field,
   *  false otherwise.
   */
  formTree.prototype.hasRequiredField = function() {
    return $(this.domRoot).find('.jsonform-required').length > 0;
  };


  /**
   * Returns the structured object that corresponds to the form values entered
   * by the use for the given form.
   *
   * The form must have been previously rendered through a call to jsonform.
   *
   * @function
   * @param {Node} The <form> tag in the DOM
   * @return {Object} The object that follows the data schema and matches the
   *  values entered by the user.
   */
  jsonform.getFormValue = function(formelt) {
    var form = $(formelt).data('jsonform-tree');
    if (!form) return null;
    var values = form.root.getFormValues();
    if (form.formDesc._isDistorted) {
      values = values[form.formDesc.prefix + '-distortedSchema'];
    }
    return values;
  };


  /**
   * Highlights errors reported by the JSON schema validator in the document.
   *
   * @function
   * @param {Object} errors List of errors reported by the JSON schema validator
   * @param {Object} options The JSON Form object that describes the form
   *  (unused for the time being, could be useful to store example values or
   *   specific error messages)
   */
  $.fn.jsonFormErrors = function(errors, options) {
    var form = $(this).data("jsonform-tree");
    $("." + form.defaultConfig.groupMarkClassPrefix + "error", this).removeClass(form.defaultConfig.groupMarkClassPrefix + "error");
    $("." + form.defaultConfig.groupMarkClassPrefix + "warning", this).removeClass(form.defaultConfig.groupMarkClassPrefix + "warning");

    $(".jsonform-errortext", this).hide();
    if (form.defaultConfig.bootstrapValidation === true) {
      this.addClass("was-validated");
    }
    if (!errors) return;

    var errorSelectors = [];
    for (var i = 0; i < errors.length; i++) {
      // Compute the address of the input field in the form from the URI
      // returned by the JSON schema validator.
      // These URIs typically look like:
      //  urn:uuid:cccc265e-ffdd-4e40-8c97-977f7a512853#/pictures/1/thumbnail
      // What we need from that is the path in the value object:
      //  pictures[1].thumbnail
      // ... and the jQuery-friendly class selector of the input field:
      //  .jsonform-error-pictures\[1\]---thumbnail
      var key;
      if (form.formDesc._validatorVendor === 'browser') {
        // browser errors
        key = errors[i].id;
      } else if (form.formDesc._validatorVendor === 'ajv') {
        // newer ajv versions use instancePath instead dataPath
        key = errors[i].dataPath || errors[i].instancePath;
        if (['dependencies', 'required', 'additionalProperties'].indexOf(errors[i].keyword) >= 0) {
          if (errors[i].params && _.isObject(errors[i].params)) {
            if (key && key.slice(-1) != '/')
              key += '/';
            key += errors[i].params.missingProperty || errors[i].params.property;
          }
        }
      } else if (form.formDesc._validatorVendor === 'z-schema') {
        key = errors[i].path;
        if (['OBJECT_DEPENDENCY_KEY', 'OBJECT_MISSING_REQUIRED_PROPERTY'].indexOf(errors[i].code) >= 0) {
          if (key.slice(-1) != '/')
            key += '/';
          key += errors[i].params[0];
        }
      } else if (form.formDesc._validatorVendor === 'jsv') {
        key = errors[i].uri;
        if (['dependencies', 'required'].indexOf(errors[i].attribute) >= 0) {
          if (key.slice(-1) != '/')
            key += '/';
          if (errors[i].details && _.isObject(errors[i].details)) {
            var firstDetailsKey = Object.keys(errors[i].details)[0];
            if (Array.isArray(errors[i].details[firstDetailsKey])) {
              key += errors[i].details[firstDetailsKey][0];
            } else {
              key += firstDetailsKey;
            }
          }
        }
      } else {
        // dunno where error key should be located
        key = errors[i].uri || errors[i].path || errors[i].dataPath;
      }
      if (key) {
        if (form.formDesc._validatorVendor === 'ajv') {
          // Remove leading point from error key
          if (key.charAt(0) === '.' || key.charAt(0) === '/') {
            key = key.substring(1);
          }
        }
        key = key.replace(/.*#\//, '')
          .replace(/\//g, '.')
          .replace(/\.([0-9]+)(?=\.|$)/g, '[$1]');
        if (key === '' && form.formDesc._isDistorted) {
          // distorted schema - path is pointing to the root but key is given
          key = form.formDesc.prefix + '-distortedSchema';
        }
        var node;
        var errormarkerclass;
        if (form.formDesc._validatorVendor === 'browser') {
          $node = $('#' + escapeSelector(key), this).closest(".jsonform-node");
          if ($node.length) {
            var error_class = $node.attr('class').split(/\s+/).filter(function(value) {
              return value.startsWith('jsonform-error-');
            }).shift();
            if (error_class) {
              errormarkerclass = "." + escapeSelector(error_class);
            }
          }
        } else {
          errormarkerclass = ".jsonform-error-" +
            escapeSelector(key.replace(/\./g, "---"));
          $node = $(errormarkerclass, this);
        }

        errorSelectors.push(errormarkerclass);
        var errorType = errors[i].type || "error";
        // FIXME: Ideally, we should retrieve the formNode or formElement
        //        But becuase we generate html as text, and did not have a direct
        //        way get the formNode or formElement from the key...
        if (form.formDesc._validatorVendor === 'ajv') {
          if (['minItems', 'maxItems'].indexOf(errors[i].keyword) >= 0) {
            if (['checkboxes', 'checkboxbuttons'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please select at ' + (errors[i].keyword == 'minItems' ? 'least' : 'most') + ' ' + errors[i].params.limit + (errors[i].params.limit > 1 ? ' options' : ' option') + '.';
            } else if (['tagsinput'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please insert at ' + (errors[i].keyword == 'minItems' ? 'least' : 'most') + ' ' + errors[i].params.limit + (errors[i].params.limit > 1 ? ' tags' : ' tag') + '.';
            }
          }
        } else if (form.formDesc._validatorVendor === 'z-schema') {
          if (errors[i].code == 'ARRAY_LENGTH_SHORT' || errors[i].code == 'ARRAY_LENGTH_LONG') {
            if (['checkboxes', 'checkboxbuttons'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please select at ' + (errors[i].code == 'ARRAY_LENGTH_SHORT' ? 'least' : 'most') + ' ' + errors[i].params[1] + (errors[i].params[1] > 1 ? ' options' : ' option') + '.';
            } else if (['tagsinput'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please insert at ' + (errors[i].code == 'ARRAY_LENGTH_SHORT' ? 'least' : 'most') + ' ' + errors[i].params[1] + (errors[i].params[1] > 1 ? ' tags' : ' tag') + '.';
            }
          }
        } else if (form.formDesc._validatorVendor === 'jsv') {
          if (['minItems', 'maxItems'].indexOf(errors[i].attribute) >= 0) {
            if (['checkboxes', 'checkboxbuttons'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please select at ' + (errors[i].attribute == 'minItems' ? 'least' : 'most') + ' ' + errors[i].details + (errors[i].details > 1 ? ' options' : ' option') + '.';
            } else if (['tagsinput'].indexOf($node.data('jsonform-type')) >= 0) {
              errors[i].message = 'Please insert at ' + (errors[i].attribute == 'minItems' ? 'least' : 'most') + ' ' + errors[i].details + (errors[i].details > 1 ? ' tags' : ' tag') + '.';
            }
          }
        }
        $node.addClass(form.defaultConfig.groupMarkClassPrefix + errorType);
        $node.find("> div > .jsonform-errortext, > .jsonform-errortext").text(errors[i].message).show();
      }
    }

    // Look for the first error in the DOM and ensure the element
    // is visible so that the user understands that something went wrong
    errorSelectors = errorSelectors.join(',');
    var $errorSelectors = $(errorSelectors, this);
    // XXX: check invisible panels if error happens there
    var $errorInvisiblePanels = $errorSelectors.parents('.tab-pane');
    var $errorTabs = $();
    $errorInvisiblePanels.each(function() {
      var $this = $(this);
      $errorTabs = $errorTabs.add($this.closest('.jsonform-tabbable').find('> .nav > li').eq($this.index()).addClass(form.defaultConfig.groupMarkClassPrefix + 'error'));
    });

    var firstError = $errorSelectors.filter(':visible').get(0);
    if (!firstError && $errorTabs.length > 0) {
      firstError = $errorTabs.get(0);
    }
    if (firstError && firstError.scrollIntoView) {
      firstError.scrollIntoView(true, {
        behavior: 'smooth'
      });
    }
  };


  /**
   * Generates the HTML form from the given JSON Form object and renders the form.
   *
   * Main entry point of the library. Defined as a jQuery function that typically
   * needs to be applied to a <form> element in the document.
   *
   * The function handles the following properties for the JSON Form object it
   * receives as parameter:
   * - schema (required): The JSON Schema that describes the form to render
   * - form: The options form layout description, overrides default layout
   * - prefix: String to use to prefix computed IDs. Default is an empty string.
   *  Use this option if JSON Form is used multiple times in an application with
   *  schemas that have overlapping parameter names to avoid running into multiple
   *  IDs issues. Default value is "jsonform-[counter]".
   * - transloadit: Transloadit parameters when transloadit is used (TODO: Not currently supported)
   * - validate: Validates form against schema upon submission. Uses the value
   * of the "validate" property as validator if it is an object.
   * - displayErrors: Function to call with errors upon form submission.
   *  Default is to render the errors next to the input fields.
   * - submitEvent: Name of the form submission event to bind to.
   *  Default is "submit". Set this option to false to avoid event binding.
   * - onSubmit: Callback function to call when form is submitted
   * - onSubmitValid: Callback function to call when form is submitted without
   *  errors.
   *
   * @function
   * @param {Object} options The JSON Form object to use as basis for the form
   */
  $.fn.jsonForm = function(options, param1) {
    if (options === 'values') {
      return jsonform.getFormValue(this);
    }
    if (options === 'submit' || options === 'validate') {
      var form = this.data('jsonform-tree');
      if (!form) return null;
      if (options === 'submit') {
        return form.submit();
      } else {
        return form.validate(param1);
      }
    }

    var formElt = this;

    options = _.defaults({}, options, {
      submitEvent: 'submit'
    });

    var new_form = new formTree();
    new_form.initialize(options);
    new_form.render(formElt.get(0));

    // TODO: Not currently supported
    // TODO: move that to formTree.render
    // if (options.transloadit) {
    //   formElt.append('<input type="hidden" name="params" value=\'' +
    //     escapeHTML(JSON.stringify(options.transloadit.params)) +
    //     '\'>');
    // }

    // Keep a direct pointer to the JSON schema for form submission purpose
    formElt.data("jsonform-tree", new_form);

    if (options.submitEvent) {
      formElt.off((options.submitEvent) + '.jsonform');
      formElt.on((options.submitEvent) + '.jsonform', function(evt) {
        new_form.submit(evt);
      });
    }

    // Initialize tabs sections, if any
    initializeTabs(formElt);

    // Initialize expandable sections, if any
    $('.expandable > div, .expandable > fieldset', formElt).hide();
    formElt.on('click', '.expandable > legend', function() {
      var parent = $(this).parent();
      parent.toggleClass('expanded');
      parent.find('legend').attr("aria-expanded", parent.hasClass("expanded"));
      $('> div', parent).slideToggle(100);
    });

    // init tooltips
    if (new_form.defaultConfig.useTooltip) {
      initializeTooltip();
    }

    return new_form;
  };


  /**
   * Retrieves the structured values object generated from the values
   * entered by the user and the data schema that gave birth to the form.
   *
   * Defined as a jQuery function that typically needs to be applied to
   * a <form> element whose content has previously been generated by a
   * call to "jsonForm".
   *
   * Unless explicitly disabled, the values are automatically validated
   * against the constraints expressed in the schema.
   *
   * @function
   * @return {Object} Structured values object that matches the user inputs
   *  and the data schema.
   */
  $.fn.jsonFormValue = function() {
    return jsonform.getFormValue(this);
  };

  // Expose the getFormValue method to the global object
  // (other methods exposed as jQuery functions)
  if (!global.JSONForm) {
    global.JSONForm = jsonform;
  }

})((typeof exports !== 'undefined'),
  ((typeof exports !== 'undefined') ? exports : window),
  ((typeof jQuery !== 'undefined') ? jQuery : {
    fn: {}
  }),
  ((typeof _ !== 'undefined') ? _ : null),
  JSON);
