var dataModel = {
   "$schema":"https://json-schema.org/draft/2019-09/schema",
   "$id":"https://mdmc.kit.edu/schemas/sem_metadata",
   "type":"object",
   "description":"This JSON Schema describes a Scanning Electron Microscopy (SEM) image in order to reproduce the measurement. The cardinality (required or optional) of all metadata is defined and wherever possible a list of controlled vocabularies is provided.",
   "properties":{
      "entry":{
         "$ref":"#/$defs/entry"
      }
   },
   "required":[
      "entry"
   ],
   "title":"sem",
   "$defs":{
      "entry":{
         "type":"object",
         "description":"The entry level is the root element of the schema. It contains all the metadata describing a single image measured. The design of the schema is modular: in case of multiple measurements, an entry for each measurement can be included. Properties: entryID (Optional)- Identifier of the measurement usually provided by the project or the laboratory, title (Required)- Extended title of the measurement, startTime (Optional)- Start time of the measurement in the format CCYY-MM-DDThh:mm:ss.sss, endTime (Required)- End time of the measurement in the format CCYY-MM-DDThh:mm:ss.sss, definition (Required)- Name of the schema to which this entry conforms, program (Optional)- Details concerning the program (or software) used for aquisition, revision (Optional)- Details concerning any revision to the document due to e.g. re-calibration, reprocessing, new analysis, new instrument definition format, user (Required)- The contact information of the user responsible for the measurement, sample (Required)- Details concerning the sample, instrument (Required)- Details concerning the instrument settings.",
         "additionalProperties":false,
         "properties":{
            "entryID":{
               "$ref":"#/$defs/identifier"
            },
            "title":{
               "type":"string",
               "description":"(Required)- Extended title of the measurement"
            },
            "startTime":{
               "type":"string",
               "description":"(Optional)- Start time of the measurement",
               "pattern":"(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z)"
            },
            "endTime":{
               "type":"string",
               "description":"(Required)- End time of the measurement",
               "pattern":"(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z)"
            },
            "definition":{
               "type":"string",
               "description":"(Required)- Name of the schema to which this entry conforms. In this case, SEM should be written"
            },
            "program":{
               "$ref":"#/$defs/program",
               "description":"(Optional)- Details concerning the program (or software) used for aquisition"
            },
            "revision":{
               "$ref":"#/$defs/revision",
               "description":"(Optional)- Details concerning any revision to the document due to e.g. re-calibration, reprocessing, new analysis, new instrument definition format"
            },
            "user":{
               "$ref":"#/$defs/user",
               "description":"(Required)- The contact information of the user responsible for the measurement"
            },
            "sample":{
               "$ref":"#/$defs/sample",
               "description":"(Required)- Details concerning the sample"
            },
            "instrument":{
               "$ref":"#/$defs/instrumentDetails",
               "description":"(Required)- Details concerning the instrument settings"
            }
         },
         "required":[
            "title",
            "endTime",
            "definition",
            "user",
            "sample",
            "instrument"
         ],
         "title":"entry"
      },
      "identifier":{
         "type":"object",
         "description":"(Optional) - Details of an identifier element. Properties: identifierValue (Optional) - a string containing the value of an identifier, identifierType (Optional) - type of the identifier to be chosen from a controlled list of values -*ROR *GRID *ISNI *URL *DOI *Handle",
         "additionalProperties":false,
         "properties":{
            "identifierValue":{
               "type":"string",
               "description":"(Optional) - String containing the value of an identifier"
            },
            "identifierType":{
               "type":"string",
               "description":"(Optional) - Type of the identifier to be selected from: *ROR *GRID *ISNI *URL *DOI *Handle",
               "enum":[
                  "ROR",
                  "GRID",
                  "ISNI",
                  "URL",
                  "DOI",
                  "Handle"
               ]
            }
         }
      },
      "program":{
         "type":"object",
         "description":"(Optional) - Details concerning the program (or software) used for aquisition. Properties: programName (Optional) - Name of the program (or software) used for acquisition, programVersion (Optional) - Program (or software) version number",
         "additionalProperties":false,
         "properties":{
            "programName":{
               "type":"string",
               "description":"(Optional) - Name of the program (or software) used for acquisition"
            },
            "programVersion":{
               "type":"string",
               "description":"(Optional) - Program (or software) version number"
            }
         },
         "title":"program"
      },
      "revision":{
         "type":"object",
         "additionalProperties":false,
         "description":"(Optional) - Details concerning any revision to the document due to e.g. re-calibration, reprocessing, new analysis, new instrument definition format. Properties: revisionID (Optional) - Identifier of the file, revisionComment (Optional)- Any comments to the revision",
         "properties":{
            "revisonID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier of the file"
            },
            "revisionComment":{
               "type":"string",
               "description":"(Optional)- Any comments to the revision"
            }
         },
         "title":"revision"
      },
      "user":{
         "type":"object",
         "additionalProperties":false,
         "description":"Contact information of the user responsible for the measurement. Properties: userName (Required) - Full name of the user in the format (Family Name, Given Name), givenName (Optional) - Given name of the user, familyName (Optional) - Family name of the user, role (Required) - Role of the user to be selected from: *Data Curator *Instrument Scientist *Principal Investigator *Project Member *Research User *Site Leader *Work Package Leader, affiliation (Optional) - Details of the institution to which the user is affiliated, email (Optional) - Email of the user, ORCID (Optional) - Open Researcher and Contributor ID expressed as a URI",
         "properties":{
            "userName":{
               "type":"string",
               "description":"(Required) - Full name of the user in the format (Family Name, Given Name)"
            },
            "givenName":{
               "type":"string",
               "description":"(Optional) - Given name of the user"
            },
            "familyName":{
               "type":"string",
               "description":"(Optional) - Family name of the user"
            },
            "role":{
               "type":"string",
               "description":"(Required) - Role of the user to be selected from: *Data Curator *Instrument Scientist *Principal Investigator *Project Member *Research User *Site Leader *Work Package Leader",
               "enum":[
                  "Data Curator",
                  "Instrument Scientist",
                  "Principal Investigator",
                  "Project Member",
                  "Research user",
                  "Site Leader",
                  "Work Package Leader"
               ]
            },
            "affiliation":{
               "$ref":"#/$defs/institutionDetails",
               "description":"(Optional) - Details of the institution to which the user is affiliated"
            },
            "email":{
               "type":"string",
               "description":"(Optional) - Email of the user",
               "format":"email"
            },
            "ORCID":{
               "type":"string",
               "description":"(Optional) - Open Researcher and Contributor ID expressed as a URI",
               "pattern":"^https://orcid\\.org/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[X0-9]{1}$"
            }
         },
         "required":[
            "userName",
            "role"
         ],
         "title":"user"
      },
      "institutionDetails":{
         "type":"object",
         "additionalProperties":false,
         "description":"(Optional) - Details of the institution to which the user is affiliated. Properties: institutionName (Optional) - Full name of the institution, institutionAcronym (Recommended) - Acronym of the institution, institutionDepartment (Optional) - Department within an institution, institutionID (Optional) - Identifier pertaining to the institution (e.g. ROR)",
         "properties":{
            "institutionName":{
               "type":"string",
               "description":"(Optional) - Full name of the institution"
            },
            "institutionAcronym":{
               "type":"string",
               "description":"(Recommended) - Acronym of the institution"
            },
            "institutionDepartment":{
               "type":"string",
               "description":"(Optional) - Department within an institution"
            },
            "institutionID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier pertaining to the institution (e.g. ROR)"
            }
         }
      },
      "sample":{
         "type":"object",
         "additionalProperties":false,
         "description":"Details concerning the sample. Properties: sampleName (Required) - Name of the sample, sampleID (Optional) - Identifier for the sample, conductive (Required) - Whether the sample is conductive, magnetic (Required) - Whether the sample is magnetic, eBeamSensitive (Required) - Whether the sample is not stable under electron beam, iBeamSensitive (Required) - Whether the sample is not stable under ion beam, embeddingMaterial (Required) - Supporting material in which the sample is embedded (e.g., none, demotec 30, 70, Epoxy), sampleForm (Optional) - Description of the sample form (e.g., bulk, nanostructured, powder, pellet), sampleSize (Optional) - Size of the sample, sampleWeight (Optional) - Weight of the sample, finalSpecimen (Optional) - Type of the specimen to be prepared (eg. TEM lamella, APT tip, cross-section, slide&amp), sampleHolder (Optional) - Type of sample holder used (e.g., stub, dish, cylinder), fixingMethod (Optional) - Method used to hold the sample on the sample holder (e.g., silver tape, silver paint, carbon paint, aluminum tape, glue), conductiveCoatingApplied (Optional) - Whether a conductive coating is applied, conductiveCoating (Optional) - Conductive coating material, storageConditions (Optional) - Environment conditions in which the sample has to be stored before and after the measurement (e.g., nitrogen atmosphere, hermetically sealed, controlled temperature and pressure), measurementConditions (Optional) - Conditions to be maintained during the measurement inside the instrument (e.g., water vapor, cryogenic temperature), samplePreparation (Optional) - Details pertaining to the sample prepapration like date, ID, etc",
         "properties":{
            "sampleName":{
               "type":"string",
               "description":"(Required) - Name of the sample"
            },
            "sampleID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier for the sample"
            },
            "conductive":{
               "type":"boolean",
               "description":"(Required) - Whether the sample is conductive"
            },
            "magnetic":{
               "type":"boolean",
               "description":"(Required) - Whether the sample is magnetic"
            },
            "eBeamSensitive":{
               "type":"boolean",
               "description":"(Required) - Whether the sample is not stable under electron beam"
            },
            "iBeamSensitive":{
               "type":"boolean",
               "description":"(Required) - Whether the sample is not stable under ion beam"
            },
            "embeddingMaterial":{
               "type":"string",
               "description":"(Required) - Supporting material in which the sample is embedded (e.g., none, demotec 30, 70, Epoxy)",
               "default":"none"
            },
            "sampleForm":{
               "type":"string",
               "description":"(Optional) - Description of the sample form (e.g., bulk, nanostructured, powder, pellet)"
            },
            "sampleSize":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Optional) - Size of the sample"
            },
            "sampleWeight":{
               "$ref":"#/$defs/weightDetails",
               "description":"(Optional) - Weight of the sample"
            },
            "finalSpecimen":{
               "type":"string",
               "description":"(Optional) - Type of the specimen to be prepared (eg. TEM lamella, APT tip, cross-section, slide&amp)",
               "default":"TEM Lamella"
            },
            "sampleHolder":{
               "type":"string",
               "description":"(Optional) - Type of sample holder used (e.g., stub, dish, cylinder)"
            },
            "fixingMethod":{
               "type":"string",
               "description":"(Optional) - Method used to hold the sample on the sample holder (e.g., silver tape, silver paint, carbon paint, aluminum tape, glue)",
               "default":"Carbon Tape"
            },
            "conductiveCoatingApplied":{
               "type":"boolean",
               "description":"(Optional) - Whether a conductive coating is applied"
            },
            "conductiveCoating":{
               "type":"string",
               "description":"(Optional) - Conductive coating material",
               "default":"Au"
            },
            "storageConditions":{
               "type":"string",
               "description":"(Optional) - Environment conditions in which the sample has to be stored before and after the measurement (e.g., nitrogen atmosphere, hermetically sealed, controlled temperature and pressure)",
               "default":"Ambient, dry environment"
            },
            "measurementConditions":{
               "type":"string",
               "description":"(Optional) - Conditions to be maintained during the measurement inside the instrument (e.g., water vapor, cryogenic temperature)",
               "default":"water vapour"
            },
            "samplePreparation":{
               "$ref":"#/$defs/samplePrepType",
               "description":"(Optional) - Details pertaining to the sample prepapration like date, ID, etc"
            }
         },
         "required":[
            "conductive",
            "eBeamSensitive",
            "iBeamSensitive",
            "magnetic",
            "sampleName"
         ],
         "title":"sample"
      },
      "distanceDetails":{
         "type":"object",
         "description":"(Optional) - Describes a distance, size or length. Properties: value (Required) - Value of the istance, size or length, unit (Required) - Unit of the value to be selected from a controlled list (nm, µm, mm, cm, m, default value - mm), qualifier (Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max), uncertainty (Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative, notes (Optional) - Further notes about the value",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "description":"(Required) - Value of the distance, size or length",
               "default":-9999
            },
            "unit":{
               "type":"string",
               "description":"(Required) - Unit of the value to be selected from a controlled list (nm, µm, mm, cm, m, default value - mm)",
               "default":"mm",
               "enum":[
                  "nm",
                  "um",
                  "mm",
                  "cm",
                  "m"
               ]
            },
            "qualifier":{
               "type":"string",
               "description":"(Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max)",
               "default":"max"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value"
            }
         },
         "required":[
            "value",
            "unit"
         ],
         "title":"distanceDetails"
      },
      "uncertaintyDetails":{
         "type":"object",
         "description":"(Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative. Properties: type (Required) - Type of the uncertainty to be chosen between absolute or relative, value (Required) - value of the uncertainty",
         "additionalProperties":false,
         "properties":{
            "uncertaintyType":{
               "type":"string",
               "description":"(Required) - Type of the uncertainty to be chosen between absolute or relative",
               "enum":[
                  "absolute",
                  "relative"
               ]
            },
            "value":{
               "type":"number",
               "description":"(Required) - Value of the uncertainty",
               "default":-9999
            }
         },
         "required":[
            "value"
         ],
         "title":"uncertaintyDetails"
      },
      "weightDetails":{
         "type":"object",
         "description":"(Optional) - Describes a weight. Properties: value (Required) - Value of the weight, unit (Required) - Unit of the value to be selected from a controlled list (ng, µg, mg, g, kg, default value - ug), qualifier (Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max), uncertainty (Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative, notes (Optional) - Further notes about the value",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "description":"(Required) - Value of the weight",
               "default":-9999
            },
            "unit":{
               "type":"string",
               "description":"(Required) - Unit of the value to be selected from a controlled list (ng, µg, mg, g, kg, default value - ug)",
               "default":"ug",
               "enum":[
                  "ng",
                  "ug",
                  "mg",
                  "g",
                  "kg"
               ]
            },
            "qualifier":{
               "type":"string",
               "description":"(Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max)",
               "default":"max"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value"
            }
         },
         "required":[
            "value",
            "unit"
         ],
         "title":"weightDetails"
      },
      "samplePrepType":{
         "type":"object",
         "description":"(Optional) - Describes the sample preparation process. Properties: preparationDate (Optional) - Date of the sample preparation, preparationDescription (Optional) - Short description of the sample preparation, preparationID (Optional) - Identifier of the sample preparation",
         "additionalProperties":false,
         "properties":{
            "preparationDate":{
               "type":"string",
               "description":"(Optional) - Date of the sample preparation",
               "format":"date"
            },
            "preparationDescription":{
               "type":"string",
               "description":"(Optional) - Short description of the sample preparation"
            },
            "preparationID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier of the sample preparation"
            }
         },
         "title":"samplePrepType"
      },
      "instrumentDetails":{
         "type":"object",
         "additionalProperties":false,
         "description":"(Required) - Details giving the relevant components and settings of the instrument. Properties: instrumentName (Required) - Name of the instrument, instrumentID (Optional) - Identifier of the instrument, instrumentManufacturer (Optional) - Details about the manufacturer or vendor of the instrument, chamberPressure (Required) - Pressure maintained inside the chamber (in which the sample is housed) during the measurement, eBeamSource (Required) - Details about the electron-beam source, stage (Required) - Details about the stage, imaging (Required) - Details about the imaging settings of the instrument, detectors (Required) - This group contains for SEM at least one detector, with the option to include a second one in case of signal mixing, eBeamDeceleration (Required) - Details about the instrument settings for electron-beam deceleration, FIB (Optional) - Details about an additional Focused Oon Beam (FIB) extension to the instrument",
         "properties":{
            "instrumentName":{
               "type":"string",
               "description":"(Required) - Name of the instrument"
            },
            "instrumentID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier of the instrument"
            },
            "instrumentManufacturer":{
               "$ref":"#/$defs/manufacturerDetails",
               "description":"(Optional) - Details about the manufacturer or vendor of the instrument"
            },
            "chamberPressure":{
               "$ref":"#/$defs/pressureDetails",
               "description":"(Required) - Pressure maintained inside the chamber (in which the sample is housed) during the measurement"
            },
            "eBeamSource":{
               "$ref":"#/$defs/sourceDetails",
               "description":"(Required) - Details about the electron-beam source"
            },
            "stage":{
               "$ref":"#/$defs/stageDetails",
               "description":"(Required) - Details about the stage"
            },
            "imaging":{
               "$ref":"#/$defs/imagingDetails",
               "description":"(Required) - Details about the imaging settings of the instrument"
            },
            "detectors":{
               "$ref":"#/$defs/detectorSetDetails",
               "description":"(Required) - This group contains for SEM at least one detector, with the option to include a second one in case of signal mixing"
            },
            "eBeamDeceleration":{
               "$ref":"#/$defs/eBeamDecelerationDetails",
               "description":"(Required) - Details about the instrument settings for electron-beam deceleration"
            },
            "FIB":{
               "$ref":"#/$defs/FIBDetails",
               "description":"(Optional) - Details about an additional Focused Oon Beam (FIB) extension to the instrument"
            }
         },
         "required":[
            "chamberPressure",
            "detectors",
            "eBeamSource",
            "imaging",
            "instrumentName",
            "stage"
         ],
         "title":"instrument"
      },
      "manufacturerDetails":{
         "type":"object",
         "description":"(Optional) - Details about the manufacturer or vendor of the instrument. Properties: manufacturerName (Optional) - Name of the manufacturer, modelName (Optional) - Model of the instrument, manufacturerID (Optional) - Identifier of the manufacturer",
         "additionalProperties":false,
         "properties":{
            "manufacturerName":{
               "type":"string",
               "description":"(Optional) - Name of the manufacturer"
            },
            "modelName":{
               "type":"string",
               "description":"(Optional) - Model of the instrument"
            },
            "manufacturerID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier of the manufacturer"
            }
         }
      },
      "pressureDetails":{
         "type":"object",
         "description":"(Required) - Describes a pressure. Properties: value (Required) - Value of the pressure, unit (Required) - Unit of the value to be selected from a controlled list (Pa, hPa, kPa, MPa, GPa, mbar, bar, psi, default value - Pa), qualifier (Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max), uncertainty (Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative, notes (Optional) - Further notes about the value",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - Value of the pressure"
            },
            "unit":{
               "type":"string",
               "default":"Pa",
               "enum":[
                  "Pa",
                  "hPa",
                  "kPa",
                  "MPa",
                  "GPa",
                  "mbar",
                  "bar",
                  "psi"
               ],
               "description":"(Required) - Unit of the value to be selected from a controlled list (Pa, hPa, kPa, MPa, GPa, mbar, bar, psi, default value - Pa)"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - Qualifier to describe the value (e.g., average, maximum, minimum, default value - max)"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty of the value. Allows to specify whether the uncertainty is absolute or relative"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"pressureDetails"
      },
      "sourceDetails":{
         "type":"object",
         "description":"gives details about the electron beam source. Properties: sourceName (Optional) - name of the e-beam source of datatype string, sourceID (Optional) - identifier for the e-beam source, accelerationVoltage (Required) - the voltage with which the e-beam is accelerated, defined separately as voltageDetails, (includes the voltage value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - uV, mv, V, kV, MV), beamCurrent (Optional) - the measured current of the e-beam, defined separately as currentDetails (includes the current value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - pA, nA, uA, mA, A, kA), sourceLifetime (Optional) - lifetime of the e-beam source (default value - uAh) of datatype string",
         "additionalProperties":false,
         "properties":{
            "sourceName":{
               "type":"string",
               "description":"(Optional) - name of the e-beam source of datatype string"
            },
            "sourceID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - identifier for the e-beam source"
            },
            "accelerationVoltage":{
               "$ref":"#/$defs/voltageDetails",
               "description":"(Required) - the voltage with which the e-beam is accelerated, defined separately as voltageDetails, (includes the voltage value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - uV, mv, V, kV, MV)"
            },
            "beamCurrent":{
               "$ref":"#/$defs/currentDetails",
               "description":"(Optional) - the measured current of the e-beam, defined separately as currentDetails (includes the current value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - pA, nA, uA, mA, A, kA)"
            },
            "sourceLifetime":{
               "$ref":"#/$defs/lifetimeDetails",
               "description":"(Optional) - lifetime of the e-beam source (default value - uAh) of datatype string"
            }
         },
         "required":[
            "accelerationVoltage"
         ],
         "title":"sourceDetails"
      },
      "lifetimeDetails":{
         "type":"object",
         "description":"describes a lifetime. Properties: value (Required) - The lifetime of the source expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value (default value - uAh) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The lifetime of the source expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"uAh",
               "description":"(Required) - the unit of the value (default value - uAh) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"lifetimeDetails"
      },
      "voltageDetails":{
         "type":"object",
         "description":"describes a voltage. Properties: value (Required) - The voltage expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value to be selected from a controlled list (uV, mV, V, kV, MV, GV default value - V) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The voltage expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"kV",
               "enum":[
                  "uV",
                  "mV",
                  "V",
                  "kV",
                  "MV"
               ],
               "description":"(Required) - the unit of the value to be selected from a controlled list (uV, mV, V, kV, MV, GV default value - V) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"voltageDetails"
      },
      "currentDetails":{
         "type":"object",
         "description":"describes a current. Properties: value (Required) - The voltage expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value to be selected from a controlled list (pA, nA, uA, mA, A default value - pA) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Optional) - Further notes about the value of datatype string"
            },
            "unit":{
               "type":"string",
               "default":"pA",
               "enum":[
                  "pA",
                  "nA",
                  "uA",
                  "mA",
                  "A"
               ],
               "description":"(Required) - the unit of the value to be selected from a controlled list (pA, nA, uA, mA, A default value - pA) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined separately as  uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"currentDetails"
      },
      "stageDetails":{
         "type":"object",
         "description":"describes the stage settings during a measurement. Properties: stageAlignmentDone (Optional) - was stage alignment done? (true or false) of datatype boolean, tiltAngle (Required) - angle by which the stage is tilted defined separately as angleDetails with the angle value, optional uncertainty, optional notes, optional qualifier and choice of units between degree and radian, eBeamWorkingDistance (Required) - the distance at which the beam is focussed (when the sample is in focus, this will be the distance between the bottom end of the pole-piece of the objective lens and the sample) defined separately as distanceDetails, with the distance value, optional uncertainty, optional notes, optional qualifier and choice of units between nm, um, mm, cm and m",
         "additionalProperties":false,
         "properties":{
            "stageAlignmentDone":{
               "type":"boolean",
               "description":"(Optional) - was stage alignment done? (check if true)"
            },
            "tiltAngle":{
               "$ref":"#/$defs/angleDetails",
               "description":"(Required) - angle by which the stage is tilted defined separately as angleDetails with the angle value, optional uncertainty, optional notes, optional qualifier and choice of units between degree and radian"
            },
            "eBeamWorkingDistance":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Required) - the distance at which the beam is focussed (when the sample is in focus, this will be the distance between the bottom end of the pole-piece of the objective lens and the sample) defined separately as distanceDetails, with the distance value, optional uncertainty, optional notes, optional qualifier and choice of units between nm, um, mm, cm and m"
            }
         },
         "required":[
            "eBeamWorkingDistance",
            "tiltAngle"
         ],
         "title":"stageDetails"
      },
      "angleDetails":{
         "type":"object",
         "description":"describes an angle. Properties: value (Required) - The angle expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value to be selected from a controlled list (degree, radian; default value - degree) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined separately as uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The angle expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"degree",
               "enum":[
                  "degree",
                  "radian"
               ],
               "description":"(Required) - the unit of the value to be selected from a controlled list (degree, radian; default value - degree) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined separately as uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"angleDetails"
      },
      "imagingDetails":{
         "type":"object",
         "description":"describes the imaging settings of the instrument during the measurement. Properties: isCorrelationImage (Required) - Whether the image is used for correlating in xyz coordinates with another image? true or false. If true the coordinates have to be entered for the sake of correlative characterization of datatype boolean, coordinates (Optional) - the xyz coordinates of a point expressed separately as coordinateSet which allows entering each of the xyz coordinates along with their optional uncertainties. If correllation images (two reference spots) are available, the coordinates enable correlative microscopy and they need to be entered, coordinateReference (Optional) - description of the reference used for defining the coordinates (for eg. - origin at centre of sample, distances from two edges, etc.), numberOfPixels (Required) - The number of x, y pixels of the image, defined separately as pixelNumberType with separate entries for integer values of xPixels and yPixels, pixelSize (Required) - Physical x,y,z length imaged by a single pixel imaged by a single pixel, normally expressed in nm/pixel, defined separately as pixelSize3D for the mapping along x,y and z directions, with each pixel having a pixelSize, optional uncertainty, optional qualifier and optional notes. The y-pixel-size is to be given only if it is different from the x-pixel-size, and z-pixel-size can be ignored if it is greater than voxel size, collectionMethod (Required) - the method of collection of the image, for e.g., normal scan, average of multiple images, integration of multiple images, default value - normal scan of datatype string, tiltCorrection (Required) - the tilt correction type applied to the image to compensate for the tilting, for e.g., sample surface, cross-section, none or manual, default value- none of datatype string, apertureSetting (Required) - The setting for controlling the aperture size, using either the aperture size (directly) or the beam current (indirectly). The element apertureSetting is defined separately as apertureSettingType which gives the option to choose between current or size. If the size can be set directly, then it is defined with the complex type distanceDetails, else if the aperture setting is controlled with the beam current defined separately as currentDetails, dwellTime (Optional) - the dwell time of the beam per pixel, defined separately as  timeDetails, voxel (Optional) - Size of the voxel in case 3D imaging is done for Energy-dispersive X-ray Spectroscopy or Electron-backscatter Diffraction, defined separately as voxelDetails",
         "additionalProperties":false,
         "properties":{
            "isCorrelationImage":{
               "type":"boolean",
               "description":"(Required) - Whether the image is used for correlating in xyz coordinates with another image? Check if true. If true the coordinates have to be entered for the sake of correlative characterization of datatype boolean"
            },
            "coordinates":{
               "$ref":"#/$defs/coordinateSet",
               "description":"(Optional) - the xyz coordinates of a point expressed separately as coordinateSet which allows entering each of the xyz coordinates along with their optional uncertainties. If correllation images (two reference spots) are available, the coordinates enable correlative microscopy and they need to be entered"
            },
            "coordinateReference":{
               "type":"string",
               "default":"origin at centre of sample",
               "description":"(Optional) - description of the reference used for defining the coordinates (for eg. - origin at centre of sample, distances from two edges, etc.)"
            },
            "numberOfPixels":{
               "$ref":"#/$defs/pixelNumberType",
               "description":"(Required) - The number of x, y pixels of the image, defined separately as pixelNumberType with separate entries for integer values of xPixels and yPixels"
            },
            "pixelSize":{
               "$ref":"#/$defs/pixelsize3D",
               "description":"(Required) - Physical x,y,z length imaged by a single pixel, normally expressed in nm/pixel, defined separately as pixelSize3D for the mapping along x,y and z directions, with each pixel having a pixelSize, optional uncertainty, optional qualifier and optional notes. The y-pixel-size is to be given only if it is different from the x-pixel-size, and z-pixel-size can be ignored if it is greater than voxel size"
            },
            "collectionMethod":{
               "type":"string",
               "default":"normal scan",
               "description":"(Required) - the method of collection of the image, for e.g., normal scan, average of multiple images, integration of multiple images, default value - normal scan of datatype string"
            },
            "tiltCorrection":{
               "type":"string",
               "default":"none",
               "description":"(Required) - the tilt correction type applied to the image to compensate for the tilting, for e.g., sample surface, cross-section, none or manual, default value- none of datatype string"
            },
            "apertureSetting":{
               "$ref":"#/$defs/apertureSettingType",
               "description":"(Required) - The setting for controlling the aperture size, using either the aperture size (directly) or the beam current (indirectly). The element apertureSetting is defined separately as apertureSettingType which gives the option to choose between current or size. If the size can be set directly, then it is defined with the complex type distanceDetails, else if the aperture setting is controlled with the beam current defined separately as currentDetails"
            },
            "dwellTime":{
               "$ref":"#/$defs/timeDetails",
               "description":"(Optional) - the dwell time of the beam per pixel, defined separately as  timeDetails"
            },
            "voxel":{
               "$ref":"#/$defs/voxelDetails",
               "description":"(Optional) - Size of the voxel in case 3D imaging is done for Energy-dispersive X-ray Spectroscopy or Electron-backscatter Diffraction, defined separately as voxelDetails"
            }
         },
         "required":[
            "isCorrelationImage",
            "apertureSetting",
            "collectionMethod",
            "numberOfPixels",
            "pixelSize"
         ],
         "title":"imagingDetails"
      },
      "coordinateSet":{
         "type":"object",
         "description":"The set of xyz values describing a point of reference for correlative characterization. Properties: xValue (Optional) - value of the x coordinate of datatype number, xUncertainty (Optional) - uncertainty in the x value defined separately as uncertaintyDetails, yValue (Optional) - value of the y coordinate of datatype number, yUncertainty (Optional) -uncertainty in the y value defined separately as uncertaintyDetails, zValue (Optional) - value of the zcoordinate of datatype number, zUncertainty (Optional) -uncertainty in the z value defined separately as uncertaintyDetails, coordinatesUnit (Optional) - unit of the coordinates (allowed units - nm, um, mm, cm, m)",
         "additionalProperties":false,
         "properties":{
            "xValue":{
               "type":"number",
               "default":-9999,
               "description":"(Optional) - value of the x coordinate of datatype number"
            },
            "xUncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - uncertainty in the x value defined separately as uncertaintyDetails"
            },
            "yValue":{
               "type":"number",
               "default":-9999,
               "description":"(Optional) - value of the y coordinate of datatype number"
            },
            "yUncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) -uncertainty in the y value defined separately as uncertaintyDetails"
            },
            "zValue":{
               "type":"number",
               "default":-9999,
               "description":"(Optional) - value of the zcoordinate of datatype number"
            },
            "zUncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) -uncertainty in the z value defined separately as uncertaintyDetails"
            },
            "coordinatesUnit":{
               "type":"string",
               "default":"um",
               "enum":[
                  "nm",
                  "um",
                  "mm",
                  "cm",
                  "m"
               ],
               "description":"(Optional) - unit of the coordinates (allowed units - nm, um, mm, cm, m)"
            }
         },
         "required":[
            "xValue",
            "yValue",
            "zValue",
            "coordinatesUnit"
         ]
      },
      "pixelNumberType":{
         "type":"object",
         "description":"describes the resolution of the image split into number of pixels in x and y directions. Properties: xPixels (Required) - no. of pixels in horizontal direction of datatype number, yPixels (Required) - no. of pixels in vertical direction of datatype number",
         "additionalProperties":false,
         "properties":{
            "xPixels":{
               "type":"number",
               "description":"(Required) - no. of pixels in horizontal direction of datatype number"
            },
            "yPixels":{
               "type":"number",
               "description":"(Required) - no. of pixels in vertical direction of datatype number"
            }
         },
         "required":[
            "xPixels",
            "yPixels"
         ]
      },
      "apertureSettingType":{
         "type":"object",
         "description":"The setting for controlling the aperture size, using either the aperture size directly or indirectly using the beam current. Therefore one of the two properties must be selected: size or current. Properties: size (Optional) - the size of the aperture which can be directly controlled using the instrument settings defined separately as distanceDetails OR current (Optional) - the beam current setting which would indirectly control the size of the aperture defined separately as currentDetails",
         "additionalProperties":false,
         "properties":{
            "size":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Optional) - the size of the aperture which can be directly controlled using the instrument settings defined separately as distanceDetails"
            },
            "current":{
               "$ref":"#/$defs/currentDetails",
               "description":"(Optional) - the beam current setting which would indirectly control the size of the aperture defined separately as currentDetails"
            }
         }
      },
      "pixelsize3D":{
         "type":"object",
         "description":"the distance on the sample imaged by a single pixel, normally expressed in nm/pixel, is expressed in 3D for the mapping along x,y and z directions. Properties: xPixelSize (Required) -  distance on the sample covered by a pixel in the x direction defined separately as pixelSizeDetails, yPixelSize (Optional) - distance on the sample covered by a pixel in the y direction defined separately as pixelSizeDetails; The y-pixel-size is to be given only if it is different from the x-pixel-size, zPixelSize (Optional) - distance on the sample covered by a pixel in the z direction defined separately as pixelSizeDetails; The z-pixel-size can be ignored if it is greater than the voxel size.",
         "additionalProperties":false,
         "properties":{
            "xPixelSize":{
               "$ref":"#/$defs/pixelSizeDetails",
               "description":"(Required) -  distance on the sample covered by a pixel in the x direction defined separately as pixelSizeDetails"
            },
            "yPixelSize":{
               "$ref":"#/$defs/pixelSizeDetails",
               "description":"(Optional) - distance on the sample covered by a pixel in the y direction defined separately as pixelSizeDetails; The y-pixel-size is to be given only if it is different from the x-pixel-size"
            },
            "zPixelSize":{
               "$ref":"#/$defs/pixelSizeDetails",
               "description":"(Optional) - distance on the sample covered by a pixel in the z direction defined separately as pixelSizeDetails; The z-pixel-size can be ignored if it is greater than the voxel size"
            }
         },
         "required":[
            "xPixelSize"
         ],
         "title":"pixelsize3D"
      },
      "pixelSizeDetails":{
         "type":"object",
         "description":"describes the size of a pixel. Properties: value (Required) - The pixel-size expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value (default value - nm/pixel) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The pixel-size expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"nm/pixel",
               "description":"(Required) - the unit of the value (default value - nm/pixel) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"pixelSizeDetails"
      },
      "timeDetails":{
         "type":"object",
         "description":"describes a time. Properties: value (Required) - The time expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value to be selected from a controlled list (ps, ns, us, ms, s default value - us) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The time expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"us",
               "enum":[
                  "ps",
                  "ns",
                  "us",
                  "ms",
                  "s"
               ],
               "description":"(Required) - the unit of the value to be selected from a controlled list (ps, ns, us, ms, s default value - us) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"timeDetails"
      },
      "voxelDetails":{
         "type":"object",
         "description":"describes the size of a voxel. Properties: value (Required) - The voxel-size expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The voxel-size expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"mm",
               "description":"(Required) - the unit of the value of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined as a complex type uncertaintyDetails, which gives the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"voxelDetails"
      },
      "detectorSetDetails":{
         "type":"object",
         "description":"gives information about signal mixing between two detectors and provides the information about the detector(s). Properties: signalMixingDone (Required) - whether the detector signals are mixed, true or false, of datatype boolean, signalmixingDescription (Optional) - Describes the purpose and technique of signal mixing of datatype string, detector1 (Required) - gives the settings of one detector defined separately as detectorDetails; entering the details of at least one detector is compulsory, detector2 (Optional) - gives the settings of a second detector defined separately as detectorDetails",
         "additionalProperties":false,
         "properties":{
            "signalMixingDone":{
               "type":"boolean",
               "default":"false",
               "description":"(Required) - whether the detector signals are mixed, true or false, of datatype boolean"
            },
            "signalMixingDescription":{
               "type":"string",
               "description":"(Optional) - Describes the purpose and technique of signal mixing of datatype string"
            },
            "detector1":{
               "$ref":"#/$defs/detectorDetails",
               "description":"(Required) - gives the settings of one detector defined separately as detectorDetails; entering the details of at least one detector is compulsory"
            },
            "detector2":{
               "$ref":"#/$defs/detectorDetails",
               "description":"(Optional) - gives the settings of a second detector defined separately as detectorDetails"
            }
         },
         "required":[
            "detector1",
            "signalMixingDone"
         ],
         "title":"detectorSetDetails"
      },
      "detectorDetails":{
         "type":"object",
         "description":"gives the settings of a detector. Properties: detectorType (Required) - The type of detector (e.g., surface electron detection,  secondary electron, back-scattered electron) of datatype string, detectorName (Required) -Name of the detector of datatype string, detectorID (Optional) - Identifier for the detector, detectorManufacturer (Optional) - describes the details of the detector (manufacturerName, modelName and detectorID) as part of manufacturerDetails, componentGeometry (Optional) - xyz coordinates describing the position of the detector defined separately as coordinateSet, lastCalibration (Optional) - date and time of last calibration (CCYY-MM-DDThh:mm:ss.sss) of the date-time format, detectorBias (Optional) - bias voltage applied to the detector defined separately as voltageDetails. Allowed units nV, uV, mV, V, kV",
         "additionalProperties":false,
         "properties":{
            "detectorType":{
               "type":"string",
               "default":"Secondary Electron",
               "description":"(Required) - The type of detector (e.g., surface electron detection,  secondary electron, back-scattered electron) of datatype string"
            },
            "detectorName":{
               "type":"string",
               "description":"(Required) -Name of the detector of datatype string"
            },
            "detectorID":{
               "$ref":"#/$defs/identifier",
               "description":"(Optional) - Identifier for the detector"
            },
            "detectorManufacturer":{
               "$ref":"#/$defs/manufacturerDetails",
               "description":"(Optional) - describes the details of the detector (manufacturerName, modelName and detectorID) as part of manufacturerDetails"
            },
            "componentGeometry":{
               "$ref":"#/$defs/coordinateSet",
               "description":"(Optional) - xyz coordinates describing the position of the detector defined separately as coordinateSet"
            },
            "lastCalibration":{
               "type":"string",
               "pattern":"(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z)",
               "description":"(Optional) - date and time of last calibration (CCYY-MM-DDThh:mm:ss.sss) of the date-time format"
            },
            "detectorBias":{
               "$ref":"#/$defs/voltageDetails",
               "description":"(Optional) - bias voltage applied to the detector defined separately as voltageDetails. Allowed units nV, uV, mV, V, kV"
            }
         },
         "required":[
            "detectorName",
            "detectorType"
         ],
         "title":"detectorDetails"
      },
      "eBeamDecelerationDetails":{
         "type":"object",
         "description":"Details about deceleration of the e- beam. Properties: landingEnergy (Optional) - Landing energy of the e-beam defined separately as energyDetails (allowed units - meV, eV, keV, nJ, mJ, J, kJ, MJ), stageBias (Optional) - Bias voltage applied to the stage defined separately biasDetails (allowed units - nV, uV, mV, V, kV, nA, uA, mA, A, kA)",
         "additionalProperties":false,
         "properties":{
            "landingEnergy":{
               "$ref":"#/$defs/energyDetails",
               "description":"(Optional) - Landing energy of the e-beam defined separately as energyDetails (allowed units - meV, eV, keV, nJ, mJ, J, kJ, MJ)"
            },
            "stageBias":{
               "$ref":"#/$defs/voltageDetails",
               "description":"(Optional) - Bias voltage applied to the stage defined separately biasDetails (allowed units - nV, uV, mV, V, kV, nA, uA, mA, A, kA)"
            }
         }
      },
      "energyDetails":{
         "type":"object",
         "description":"describes an energy. Properties: value (Required) - The energy expressed as an integer or floating point value of datatype number, unit (Required) - the unit of the value to be selected from a controlled list (meV, eV, keV, MeV, nJ, mJ, J, kJ, MJ; default value - keV) of datatype string, qualifier (Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string, uncertainty (Optional) - Uncertainty in the value defined separately as uncertaintyDetails giving the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number, notes (Optional) - Further notes about the value of datatype string",
         "additionalProperties":false,
         "properties":{
            "value":{
               "type":"number",
               "default":-9999,
               "description":"(Required) - The energy expressed as an integer or floating point value of datatype number"
            },
            "unit":{
               "type":"string",
               "default":"keV",
               "enum":[
                  "meV",
                  "eV",
                  "keV",
                  "MeV",
                  "nJ",
                  "mJ",
                  "J",
                  "kJ",
                  "MJ"
               ],
               "description":"(Required) - the unit of the value to be selected from a controlled list (meV, eV, keV, MeV, nJ, mJ, J, kJ, MJ; default value - keV) of datatype string"
            },
            "qualifier":{
               "type":"string",
               "default":"max",
               "description":"(Optional) - A qualifier to describe the value (e.g., avg, max, min; default value - max) of datatype string"
            },
            "uncertainty":{
               "$ref":"#/$defs/uncertaintyDetails",
               "description":"(Optional) - Uncertainty in the value defined separately as uncertaintyDetails giving the option of choosing between an absolute uncertainty or relative uncertainty and entering the value of uncertainty as a number"
            },
            "notes":{
               "type":"string",
               "description":"(Optional) - Further notes about the value of datatype string"
            }
         },
         "required":[
            "unit",
            "value"
         ],
         "title":"energyDetails"
      },
      "FIBDetails":{
         "type":"object",
         "description":"Details about the focussed ion beam (FIB) extension if present. Properties: angleToEBeam (Optional) - angle between e-beam and i-beam defined separately as angleDetails (Allowed units: degree, radian), iBeamSource (Required) - describes the details of the FIB source, defined separately as sourceDetails in which it is important to note the accelerating voltage and beam current of the i-beam, gunPressure (Required) - pressure of the FIB gun, defined separately as pressureDetails (Allowed units Pa, hPa, kPa, MPa, GPa, mbar, bar, psi), gasInjectionSystem (Optional) - Details about the gas injection system (GIS) defined separately as GISDetails, iBeamWorkingDistance (Optional) - Working distance of the ion beam (i-beam) defined separately as distanceDetails - this value needs to be entered if the i-beam focus has to be set independently from the e-beam focus (Allowed units: nm, um, mm, cm, m), FIBSpotSize (Optional) - spot size of the i-beam at the focus when the sample is in focus (also the spot size on the sample) defined separately as distanceDetails (Allowed units: nm, um, mm, cm, m), ",
         "additionalProperties":false,
         "properties":{
            "angleToEBeam":{
               "$ref":"#/$defs/angleDetails",
               "description":"(Optional) - angle between e-beam and i-beam defined separately as angleDetails (Allowed units: degree, radian)"
            },
            "iBeamSource":{
               "$ref":"#/$defs/sourceDetails",
               "description":"(Required) - describes the details of the FIB source, defined separately as sourceDetails in which it is important to note the accelerating voltage and beam current of the i-beam"
            },
            "gunPressure":{
               "$ref":"#/$defs/pressureDetails",
               "description":"(Required) - pressure of the FIB gun, defined separately as pressureDetails (Allowed units Pa, hPa, kPa, MPa, GPa, mbar, bar, psi)"
            },
            "gasInjectionSystem":{
               "$ref":"#/$defs/GISDetails",
               "description":"(Optional) - Details about the gas injection system (GIS) defined separately as GISDetails"
            },
            "iBeamWorkingDistance":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Optional) - Working distance of the ion beam (i-beam) defined separately as distanceDetails - this value needs to be entered if the i-beam focus has to be set independently from the e-beam focus (Allowed units: nm, um, mm, cm, m)"
            },
            "FIBSpotSize":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Optional) - spot size of the i-beam at the focus when the sample is in focus (also the spot size on the sample) defined separately as distanceDetails (Allowed units: nm, um, mm, cm, m)"
            }
         },
         "required":[
            "gunPressure",
            "iBeamSource"
         ],
         "title":"FIBDetails"
      },
      "GISDetails":{
         "type":"object",
         "description":"gives the details of the gas injection system (GIS). Properties: GISName (Optional) - Name of the GIS system of datatype string, beamDepositionType (Optional) - type of beam deposition of datatype string to choose between e-beam deposition and i-beam deposition, depositionCurrent (Optional) - the current used for performing beam deposition defined separately as currentDetails (Allowed units pA,nA,uA,mA,A), depositionSize (Optional) - the size of the deposition defined separately as distanceDetails (Allowed units nm,um,mm,cm,m), depositionTime (Optional) - total time for deposition defined separately as timeDetails (Allowed units ps,ns,us,ms,s)",
         "additionalProperties":false,
         "properties":{
            "GISName":{
               "type":"string",
               "description":"(Optional) - Name of the GIS system of datatype string"
            },
            "beamDepositionType":{
               "type":"string",
               "enum":[
                  "E-beam Deposition",
                  "I-beam Deposition"
               ],
               "description":"(Optional) - type of beam deposition of datatype string to choose between e-beam deposition and i-beam deposition"
            },
            "depositionCurrent":{
               "$ref":"#/$defs/currentDetails",
               "description":"(Optional) - the current used for performing beam deposition defined separately as currentDetails (Allowed units pA,nA,uA,mA,A)"
            },
            "depositionSize":{
               "$ref":"#/$defs/distanceDetails",
               "description":"(Optional) - the size of the deposition defined separately as distanceDetails (Allowed units nm,um,mm,cm,m)"
            },
            "depositionTime":{
               "$ref":"#/$defs/timeDetails",
               "description":"(Optional) - total time for deposition defined separately as timeDetails (Allowed units ps,ns,us,ms,s)"
            }
         },
         "title":"GISDetails"
      }
   }
}