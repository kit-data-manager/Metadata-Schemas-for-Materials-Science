/**
 * operation type enumeration
 * @type type
 */
const operationType = {
    READ: "READ",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
};

/**
 * modal type enumeration
 * @type type
 */
const modalType = {
    ALERT: "ALERT",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS"
};

/**
 * Default icons
 * 
 * @type type
 */
var icons = {
    'EYE': {
        'FONTAWESOME': 'fa fa-eye',
        'TOOLTIP': 'Read'
    },
    'EDIT': {
        'FONTAWESOME': 'fa fa-edit',
         'TOOLTIP': 'Update'
    },
    'TRASH': {
        'FONTAWESOME': 'fa fa-trash',
         'TOOLTIP': 'Delete'
    },
    'LIST': {
        'FONTAWESOME': 'fa fa-list',
         'TOOLTIP': 'List'
    },
    'EXCLAMATION': {
        'FONTAWESOME': 'fas fa-exclamation'
    },
    'CHECK': {
        'FONTAWESOME': 'fas fa-check'
    }
};
/**
 * 
 * @type type
 */
var modal = {
    'success': {
        'type': modalType.SUCCESS,
        'id': 'success-modal',
        'icon': "<i class='" + icons.CHECK.FONTAWESOME + "'></i>"
    },
    'alert': {
        'type': modalType.ALERT,
        'id': 'alert-modal',
        'icon': "<i class='" + icons.EXCLAMATION.FONTAWESOME + "'></i>"
    },
    'failed': {
        'type': modalType.FAILED,
        'id': 'failed-modal',
        'icon': "<i class='" + icons.EXCLAMATION.FONTAWESOME + "'></i>"
    }
};
/**
 * Default buttons
 * @type type
 */
var buttons = {
    'CREATE': {
        'title': 'Create'
    },
    'RETURN': {
        'title': 'Return'
    }
};

/**
* Resolve $ref elements in model. This is a workaround for limitation of jsonform library.
* To apply resolution, this function has to be called on the JSON model in the following way: 
* 
* resolveRefs(dataModel, dataModel.$defs);
* 
* The function assumes, that internal definitions are defined in an element named '$defs', e.g.:

* "$defs": {
*    "IDENTIFIER_TYPE": {
*        "type": "string",
*         "enum": ["ARK", "AR_XIV", "BIBCODE", "DOI", "EAN_13"]
*    }
* }
*
* and that these references are used in the following way:
*
* "identifierType": {
*     "$ref": "#/$defs/IDENTIFIER_TYPE"
* }
*
* In that case, the resulting structure will look as follows:
*
* "identifierType": {
*     "type": "string",
*     "enum": ["ARK", "AR_XIV", "BIBCODE", "DOI", "EAN_13"]
* }
*/
function resolveRefs(obj, defs)
{
  Object.keys(obj).forEach(function(prop, index, array){
    var def = obj[prop];
	
    if (def.$ref) {
      var ref = def.$ref.replace(/^#\/\$defs\//, '');
      obj[prop] = defs[ref];
    } else if (typeof def === 'object') {
      resolveRefs(def, defs);
    }
  })
}


/**
 * Genereate icon
 * 
 * @param {type} fontAwesome
 * @param {type} tooltip
 * @returns {String}
 */
function generateIcon(fontAwesome, tooltip) {
    return "<i class='" + fontAwesome + "' title='" + tooltip + "'>\n\</i>";
};

/**
 * Default table layout
 * 
 * @type type
 */
var defaultTableLayout = {
    layout: "fitColumns",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector:[3, 6, 8, 10, 15, 20]
};
//form element
var formElt = null;

//static table input as json file
var input = null;

/**
 * Based on the modalInput,a modal is generated.
 * @param {type} modalInput indicates if an alert, success or a failed modal has to be generated.
 * @returns {String} modal
 */
function modalTemplate(modalInput) {
    var modalId;
    var icon;
    var button;

    if (modalInput === modalType.ALERT) {
        modalId = modal.alert.id;
        icon = modal.alert.icon;
        button = '<button type="button" class="btn btn-default btn-alert" data-dismiss="modal">Close</button>';
    } else if (modalInput === modalType.SUCCESS) {
        modalId = modal.success.id;
        icon = modal.success.icon;
        button = '<button type="button" class="btn btn-default">Close</button>';
    } else if (modalInput === modalType.FAILED) {
        modalId = modal.failed.id;
        icon = modal.failed.icon;
        button = '<button type="button" class="btn btn-default btn-failed">Close</button>';
    }

    return '<div id="' + modalId + '" class="modal fade" data-keyboard="false" data-backdrop="static" data-id="' + modalId + '">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header justify-content-center">' +
            '<div class="icon-box">' +
            icon +
            '</div>' +
            '</div>' +
            '<div id="alert-modal-body" class="modal-body text-center">' +
            '<p></p>' +
            button +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
};

/**
 * describes the internal representation of the Editor in case a form will be generated.
 * @returns {editorDefinitionForm}
 */
var editorDefinitionForm = function () {
    /**
     * form element.
     */
    this.renderElt = null;
    /*
     *  operation
     */
    this.operation = null;
    /*
     * JSON data Model
     */
    this.dataModel = null;
    /*
     * JSON uiForm
     */
    this.uiForm = null;
    /*
     * JSON resource
     */
    this.resource = null;
    /*
     * Validate property
     */
    this.validate = true;
};

/**
 * describes the internal representation of the Editor in case a table will be generated.
 * @returns {editorDefinitionTable}
 */
var editorDefinitionTable = function () {

    /*
     * table Element
     */
    this.renderElt = null;

    /*
     * identifer of the table, which will be created.
     */
    this.tableId = null;

    /*
     * JSON dataModel 
     */
    this.dataModel = null;

    /*
     * JSON resource
     */
    this.resource = null;

    /*
     * columns of the table 
     */
    this.items = null;

    /*
     * layout of the form
     */
    this.uiForm = null;

    /*
     * eye icon used for the read operation
     */
    this.readIcon = null;

    /*
     * edit icon used for the update operation
     */
    this.editIcon = null;

    /*
     * trash icon used for the delete operation
     */
    this.deleteIcon = null;

    /*
     * list icon used to list resources.
     */
    this.listIcon = null;
};

/**
 * shows an alert modal and throws an error message.
 * @param {type} errorMsg error message that should be shown in the modal
 * @returns {undefined}
 */
_throw = errorMsg => {
    showModal(modalType.ALERT, errorMsg, "");
    throw errorMsg;
};
/**
 * shows a modal.
 * @param {type} type represents the modal type. It can be an ALERT, FAILED or SUCCESS.
 * @param {type} message represents the message, which should be shown in the modal.
 * @param {type} link represents the link of the page, where should be redirected.
 * @returns {undefined}
 */
showModal = (type, message, link) => {
    var modelId;
    if (type === modalType.ALERT) {
        modelId = "#" + modal.alert.id;
    } else if (type === modalType.FAILED) {
        modelId = "#" + modal.failed.id;
        $(modelId + " .btn").on('click', function () {
            window.location.href = link;
        });
    } else if (type === modalType.SUCCESS) {
        modelId = "#" + modal.success.id;
        $(modelId + " .btn").on('click', function () {
            window.location.href = link;
        });
    } else {
        _throw(type + ": Unknown model type!");
        return;
    }
    $(modelId + " .modal-body>p").empty();
    $(modelId + " .modal-body>p").append(message);
    $(modelId).modal('show');
};

/**
* Initialize modal dialogs for alert, failure and success. 
* Those are required, as they are used in internal callbacks
* for the JSON Form Library.
*/
$.fn.initializeModals = function(){
     $('body').append(modalTemplate("ALERT"));
     $('body').append(modalTemplate("FAILED"));
     $('body').append(modalTemplate("SUCCESS"));
};

$.fn.registerAdditionalComponents = function(){
    
    
}

/**
 * main method in case a FORM will be generated.
 * 
 * @param {type} options inputs of the method.
 * @param {type} callback 
 * @returns {undefined}
 */
$.fn.metadataeditorForm = function (options, callback) {
    var renderElt = this;
    formElt = renderElt;
    var editor = new editorDefinitionForm();
    editor.initializeInputsForm(options, renderElt);
    editor.render(callback, options.buttonTitle);
    return editor;
};
/**
 * main method in case a TABLE will be generated.
 * @param {type} options inputs of the method.
 * @returns {editorDefinitionForTable|editorDefinitionTable|$.fn.metadataeditorTable.editor|window.$.fn.metadataeditorTable.editor}
 * @returns {editorDefinitionForTable|editorDefinitionTable|$.fn.metadataeditorTable.editor|window.$.fn.metadataeditorTable.editor}
 */
$.fn.metadataeditorTable = function (options) {
    var renderElt = this;
    var editor = new editorDefinitionTable();
    editor.initializeInputsTable(options, renderElt);
    editor.generateTable(options);
    return editor;
};
/**
 * Initializes the editor definition structure in case a TABLE will be generated.
 *  
 * @param {type} options inputs
 * @param {type} renderElt
 * @returns {undefined}
 */

editorDefinitionTable.prototype.initializeInputsTable = function (options, renderElt) {

    if (options.dataModel !== undefined && options.dataModel !== null && options.dataModel !== '') {
        this.dataModel = options.dataModel;
    } else {
        _throw("JSON Data Model is missing");
    }

    if (options.items !== undefined && options.items !== null && options.items !== '') {
        if (options.items.length <= 6) {
            this.items = options.items;
        } else {
            _throw("JSON Items List should contain maximal 6 items");
        }
    } else {
        _throw("JSON Items List is missing");
    }

    var tooltip4ReadIcon = (options.tooltip4ReadIcon !== undefined && options.tooltip4ReadIcon !== null && options.tooltip4ReadIcon !== '') ? options.tooltip4ReadIcon : icons.EYE.TOOLTIP;
 
    var tooltip4EditIcon = (options.tooltip4EditIcon !== undefined && options.tooltip4EditIcon !== null && options.tooltip4EditIcon !== '') ? options.tooltip4EditIcon : icons.EDIT.TOOLTIP;
 
 
    var tooltip4DeleteIcon = (options.tooltip4DeleteIcon !== undefined && options.tooltip4DeleteIcon !== null && options.tooltip4DeleteIcon !== '') ? options.tooltip4DeleteIcon : icons.TRASH.TOOLTIP;
 
 
    var tooltip4ListIcon = (options.tooltip4ListIcon !== undefined && options.tooltip4ListIcon !== null && options.tooltip4ListIcon !== '') ? options.tooltip4ListIcon : icons.LIST.TOOLTIP;

    if (options.readIcon !== undefined && options.readIcon !== null && options.readIcon !== '') {
        this.readIcon = function () {
            return generateIcon(options.readIcon, tooltip4ReadIcon);
        };
    } else {
        this.readIcon = function () {
            return generateIcon(icons.EYE.FONTAWESOME, tooltip4ReadIcon);
        };
    }

    if (options.editIcon !== undefined && options.editIcon !== null && options.editIcon !== '') {
        this.editIcon = function () {
            return generateIcon(options.editIcon, tooltip4EditIcon);
        };
    } else {
        this.editIcon = function () {
            return generateIcon(icons.EDIT.FONTAWESOME, tooltip4EditIcon);
        };
    }

    if (options.deleteIcon !== undefined && options.deleteIcon !== null && options.deleteIcon !== '') {
        this.deleteIcon = function () {
            return generateIcon(options.deleteIcon, tooltip4DeleteIcon);
        };
    } else {
        this.deleteIcon = function () {
            return generateIcon(icons.TRASH.FONTAWESOME, tooltip4DeleteIcon);
        };
    }

    if (options.listIcon !== undefined && options.lisIcon !== null && options.listIcon !== '') {
        this.listIcon = function () {
            return generateIcon(options.listIcon, tooltip4ListIcon);
        };
    } else {
        this.listIcon = function () {
            return generateIcon(icons.LIST.FONTAWESOME, tooltip4ListIcon);
        };
    }

    if (options.tableLayout) {
        //use provided tableLayout containing all information including ajaxURL
        this.tableLayout = options.tableLayout;
    }else{
        this.tableLayout = defaultTableLayout;
    }

    if (options.tableLayout.ajaxURL) {
        //use default layout but set ajaxURL manually from input
        this.tableLayout.ajaxURL = options.tableLayout.ajaxURL;
    }else if (options.data) {
         this.tableLayout.data = options.data;
    }else{
         _throw("Neither paginationURL nor a static input data file are provided.");
    }


    this.uiForm = options.uiForm || "*";
    this.tableId = "#" + renderElt.attr('id');
    this.renderElt = renderElt;
};
/**
 * Initializes the editor definition structure
 *  
 * @param {type} options
 * @param {type} renderElt
 * @returns {undefined}
 */
editorDefinitionForm.prototype.initializeInputsForm = function (options, renderElt) {
    this.operation = options.operation || _throw("Operation is missing");
    this.dataModel = options.dataModel || _throw("JSON Data Model is missing");
    this.validate = options.validate;
    this.uiForm = options.uiForm || "*";
    this.resource = options.resource || null;
    this.renderElt = renderElt;

};
/**
 * Based on the given operation, a form will be generated.
 * @param {type} callback callback function
 * @returns {undefined}
 */
editorDefinitionForm.prototype.render = function (callback, buttonTitle) {
    emptyElt(formElt);
    (this.operation === operationType.READ) ? this.generateReadForm(callback, buttonTitle) : ((this.operation === operationType.CREATE) ? this.generateCreateForm(callback, buttonTitle) :
            ((this.operation === operationType.UPDATE) ? this.generateUpdateForm(callback, buttonTitle) : ((this.operation === operationType.DELETE) ?
                    this.generateDeleteForm(callback) : _throw("Unknown operation!"))));
};

/**
 *  generates and initializes the table as well as the icons. 
 *  
 * @param {type} readOperation callback function, which is executed when the user clicks on the eye icon.
 * @param {type} updateOperation callback function, which is executed when the user clicks on the edit icon.
 * @param {type} deleteOperation callback function, which is executed when the user clicks on the trash icon.
 * @param {type} listOperation callback function, which is executed when the user clicks on the list icon.
 * @param {type} createOperation callback function, which is executed when the user clicks on the create button.
 * @returns {undefined}
 */
editorDefinitionTable.prototype.generateTable = function (options) {
    if (options.readOperation !== undefined) {
        this.items.push({formatter: this.readIcon, hozAlign: "left", minWidth: 40, width: 40, headerSort: false, frozen : true, cellClick: function (e, cell) {
                emptyElt(formElt);
                options.readOperation(cell.getRow().getData());
            }});
    }

    if (options.updateOperation !== undefined) {
        this.items.push({formatter: this.editIcon, hozAlign: "left", minWidth: 40,width: 40, headerSort: false, frozen : true,cellClick: function (e, cell) {
                emptyElt(formElt);
                options.updateOperation(cell.getRow().getData());
            }});
    }

    if (options.deleteOperation !== undefined) {
        this.items.push({formatter: this.deleteIcon, hozAlign: "left", minWidth: 40,width: 40, headerSort: false, frozen : true,cellClick: function (e, cell) {
                emptyElt(formElt);
                options.deleteOperation(cell.getRow().getData());
            }});
    }

    if (options.listOperation !== undefined) {
        this.items.push({formatter: this.listIcon, hozAlign: "left",minWidth: 40, width: 40, headerSort: false, frozen : true,cellClick: function (e, cell) {
                emptyElt(formElt);
                options.listOperation(cell.getRow().getData());
            }});
    }


    this.tableLayout.columns = this.items;
    var table = new Tabulator(this.tableId, this.tableLayout);
  
    //add buttons after table
    $("<div class=\"row\"><div class=\"col-md-12 text-right\" id= \"editor-buttons\"></div></div>").insertAfter(this.tableId);
    if (options.createOperation !== undefined) {
        var buttonTitle = (options.createOperation.buttonTitle !== undefined) ? options.createOperation.buttonTitle : buttons.CREATE.title;
        $("#editor-buttons").append(generateButton("editor-create-button", buttonTitle, "right"));
        $("#editor-create-button").click(function () {
            emptyElt(formElt);
            options.createOperation.callback();
        });
    }

    if (options.returnOperation !== undefined) {
        var buttonTitle = (options.returnOperation.buttonTitle !== undefined) ? options.returnOperation.buttonTitle : buttons.RETURN.title;
        $("#editor-buttons").append(generateButton("editor-return-button", buttonTitle, "left"));
        $("#editor-return-button").click(function () {
            options.returnOperation.callback();
        });
    }
};
var generateButton = function (buttonId, buttonTitle, float) {
    return "<button type=\"button\" class=\"btn btn-primary\" style=\"float:" + float + ";\" id=\"" + buttonId + "\">" + buttonTitle + "</button>";
}

/**
 * resets an element.
 * 
 * @param {type} elt element
 * @returns {undefined}
 */
emptyElt = elt => {
    if (elt !== null)
        elt.empty();
};
/**
 * generates an empty form. 
 * @param {type} callback
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateCreateForm = function (callback, buttonTitle) {
    if (buttonTitle !== undefined) {
        this.buttonTitle = buttonTitle;
    }else{
        this.buttonTitle = operationType.CREATE;
    }

    this.renderElt.jsonForm({
        schema: this.dataModel,
        validate: this.validate,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.buttonTitle
            }
        ],
        "onSubmitValid": function (values) {
            callback(JSON.stringify(values, null, '\t'));
        },
        "displayErrors": function(errors){
            $("#alert-modal .modal-body>p").empty();
            var path = errors[0].instancePath;
            var message = errors[0].message;
                        
            $("#alert-modal .modal-body>p").append('Error at ' + path + '<br/>Message: ' + message);
             var id = $(this).data('alert-modal');
   
            $("#alert-modal").modal('show');
            $("#alert-modal .btn").on('click', function () {
                $("#alert-modal").modal('hide');
            });
        }
    });
};
/**
 * generates a form filled with values.
 * @param {type} callback
 * @returns {undefined}
 */

editorDefinitionForm.prototype.generateUpdateForm = function (callback, buttonTitle) {
if (buttonTitle !== undefined) {
        this.buttonTitle = buttonTitle;
    }else{
        this.buttonTitle = operationType.UPDATE;
    }
    if (!this.resource) {
        throw new Error('JSON resource is missing');
    }
    this.renderElt.jsonForm({
        schema: this.dataModel,
        validate: this.validate,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.buttonTitle
            }
        ],
        value: this.resource,
        "onSubmitValid": function (values) {
            callback(JSON.stringify(values, null, '\t'));
        },
        "displayErrors": function(errors){
            $("#alert-modal .modal-body>p").empty();
            var path = errors[0].instancePath;
            var message = errors[0].message;
                        
            $("#alert-modal .modal-body>p").append('Error at ' + path + '<br/>Message: ' + message);
             var id = $(this).data('alert-modal');
   
            $("#alert-modal").modal('show');
            $("#alert-modal .btn").on('click', function () {
                $("#alert-modal").modal('hide');
            });
        }
    });
};
/**
 * generates a form filled with values. It is used only to show the values, no button is generated.
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateFilledReadForm = function (callback, buttonTitle) {
    if (buttonTitle !== undefined) {
        this.renderElt.jsonForm({
            schema: this.dataModel,
            form: [
                this.uiForm,
                {
                    "type": "submit",
                    "title": buttonTitle
                }
            ],
            value: this.resource,
            readonly: "true",
            "onSubmit": function () {
                callback();
            }
        });
    } else {
        this.renderElt.jsonForm({
            schema: this.dataModel,
            form: [
                this.uiForm
            ],
            value: this.resource,
            readonly: "true"
        });
    }

};

editorDefinitionForm.prototype.generateReadForm = function (callback, buttonTitle) {
    if (this.resource) {
        this.generateFilledReadForm(callback, buttonTitle);
    } else {
        this.generateEmptyFieldFormWithoutButton();
    }
};

/**
 * generates a form with empty values.
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateEmptyFieldFormWithoutButton = function () {
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm
        ],
        readonly: "true",
        "onSubmit": function () {
        }
    });
};
/**
 * generates a form filled with read-only values.
 * @param {type} callback cb function returns the form as a JSON value in case the actual method is coorectly executed.
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateDeleteForm = function (callback, buttonTitle) {
if (buttonTitle !== undefined) {
        this.buttonTitle = buttonTitle;
    }else{
        this.buttonTitle = operationType.DELETE;
    }
    var copyResource = this.resource;
    if (!this.resource) {
        throw new Error('JSON resource is missing');
    }
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.buttonTitle
            }
        ],
        value: this.resource,
        readonly: "true",
        "onSubmit": function () {
            callback(JSON.stringify(copyResource, null, '\t'));
        }
    });
};
