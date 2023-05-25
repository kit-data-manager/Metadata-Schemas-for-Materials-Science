var uiSchema = {
        "type": "fieldset",
        "items": [
            {
                "legend": "Id",
                "type": "fieldset",
                "description":"(Optional) - Identifier of the measurement, usually provided by the project or the laboratory",
                "htmlClass": "myclass",
                "items": [
                    {"title": "Type", "key": "entry.entryID.identifierType"},
                    {"title": "Value", "key": "entry.entryID.identifierValue"},
                ]
            },
            {
                "legend": "General Metadata",
                "type": "fieldset",
                "htmlClass": "myclass",
                "items": [
                    {"title": "Title", "key": "entry.title"},
                    {"title": "Start Time", "key": "entry.startTime", "placeholder": "2022-06-12T12:00:00Z"},
                    {"title": "End Time", "key": "entry.endTime", "placeholder": "2022-06-12T12:00:00Z"},
                    {"title": "Definition", "key": "entry.definition", "placeholder": "SEM"}
                ]
            },
            {
                "legend": "Program",
                "type": "fieldset",
                "description":"(Optional) - Details concerning the program (or software) used for aquisition",
                "htmlClass": "myclass",
                "items": [
                    {"title": "Name", "key": "entry.program.programName"},
                    {"title": "Version", "key": "entry.program.programVersion"}
                ]
            },
            {
                "legend": "Revision",
                "type": "fieldset",
                "description":"(Optional) - Details concerning any revision to the document due to e.g. re-calibration, reprocessing, new analysis, new instrument definition format",
                "htmlClass": "myclass",
                "items": [
                    {"title": "Id Type", "key": "entry.revision.revisonID.identifierType"},
                    {"title": "Id Value", "key": "entry.revision.revisonID.identifierValue"},
                    {"title": "Comment", "type": "textarea", "key": "entry.revision.revisionComment"}
                ]
            },
            {
                "type": "fieldset",
                "htmlClass": "myclass",
                "items": [
                    {
                        "type": "tabs",
                        "id": "navtabs",
                        "legend": "Other Metadata",
                        "htmlClass": "myclass",
                        "items": [
                            {
                                "title": "User Information",
                                "type": "tab",
                                "items": [
                                    {
                                        "legend": "User",
                                        "type": "fieldset",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {"title": "User Role", "key": "entry.user.role"},
                                            {"title": "Username", "key": "entry.user.userName"},
                                            {"title": "Given Name", "key": "entry.user.givenName"},
                                            {"title": "Family Name", "key": "entry.user.familyName"},
                                            {"title": "Email", "key": "entry.user.email"},
                                            {"title": "ORCiD", "key": "entry.user.ORCID"},
                                        ]
                                    },
                                    {
                                        "legend": "Affiliation",
                                        "type": "fieldset",
                                        "description":"(Optional) - Details of the institution to which the user is affiliated",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {
                                                "title": "Id Type",
                                                "key": "entry.user.affiliation.institutionID.identifierType"
                                            },
                                            {
                                                "title": "Id Value",
                                                "key": "entry.user.affiliation.institutionID.identifierValue"
                                            },
                                            {
                                                "title": "Name", 
                                                "key": "entry.user.affiliation.institutionName"
                                            },
                                            {
                                                "title": "Acronym", 
                                                "key": "entry.user.affiliation.institutionAcronym"
                                            },
                                            {
                                                "title": "Department",
                                                "key": "entry.user.affiliation.institutionDepartment"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Sample Metadata",
                                "type": "tab",
                                "items": [
                                    {
                                        "legend": "Id",
                                        "type": "fieldset",
                                        "description":"(Optional) - Identifier of the sample, usually provided by the vendor or the laboratory",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {"title": "Sample Id Type", "key": "entry.sample.sampleID.identifierType"},
                                            {
                                                "title": "Sample Id Value",
                                                "key": "entry.sample.sampleID.identifierValue"
                                            },
                                        ]
                                    },
                                    {
                                        "legend": "General Metadata",
                                        "type": "fieldset",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {"title": "Sample Name", "key": "entry.sample.sampleName"},
                                            {
                                                "type": "fieldset",
                                                "expandable": false,
                                                "items": [
                                                    {"title": "Conductive", "key": "entry.sample.conductive"},
                                                    {"title": "Magnetic", "key": "entry.sample.magnetic"},
                                                    {"title": "eBeamSensitive", "key": "entry.sample.eBeamSensitive"},
                                                    {"title": "iBeamSensitive", "key": "entry.sample.iBeamSensitive"}
                                                ]
                                            },
                                            {"title": "Sample Form", "key": "entry.sample.sampleForm"},
                                            {"title": "Sample Holder", "key": "entry.sample.sampleHolder"},
                                            {"title": "Final Specimen", "key": "entry.sample.finalSpecimen"},
                                            {"title": "Fixing Method", "key": "entry.sample.fixingMethod"},
                                            {"title": "Embedding Medium", "key": "entry.sample.embeddingMaterial"},
                                            {"title": "Conductive Coating Applied", "key": "entry.sample.conductiveCoatingApplied"},
                                            {"title": "Conductive Coating", "key": "entry.sample.conductiveCoating"},
                                            {"title": "Storage Conditions", "key": "entry.sample.storageConditions"},
                                            {
                                                "title": "Measurement Conditions",
                                                "key": "entry.sample.measurementConditions"
                                            },
                                        ]
                                    },

                                    {
                                        "title": "Sample Details",
                                        "type": "fieldset",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {
                                                "type": "tabs",
                                                "id": "navtabs_sample",
                                                "htmlClass": "myclass",
                                                "items": [

                                                    {
                                                        "title": "Sample Dimensions",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Sample Size",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - Size of the sample",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.sample.sampleSize.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.sample.sampleSize.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.sample.sampleSize.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.sample.sampleSize.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Sample Weight",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - Weight of the sample",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.sample.sampleWeight.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.sample.sampleWeight.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.sample.sampleWeight.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.sample.sampleWeight.uncertainty"
                                                                    }
                                                                ]
                                                            },


                                                        ]
                                                    },
                                                    {
                                                        "title": "Sample Preparation",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Id",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - Identifier of the sample preparation",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Id Type",
                                                                        "key": "entry.sample.samplePreparation.preparationID.identifierType"
                                                                    },
                                                                    {
                                                                        "title": "Id Value",
                                                                        "key": "entry.sample.samplePreparation.preparationID.identifierValue"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Details",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - Details on the sample preparation process",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Date",
                                                                        "key": "entry.sample.samplePreparation.preparationDate"
                                                                    },
                                                                    {
                                                                        "title": "Description",
                                                                        "type": "textarea",
                                                                        "key": "entry.sample.samplePreparation.preparationDescription"
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Instrument Metadata",
                                "type": "tab",
                                "items": [
                                    {
                                        "legend": "General",
                                        "type": "fieldset",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {
                                                "title": "Name", 
                                                "key": "entry.instrument.instrumentName"},
                                            {
                                                "title": "Id Type",
                                                "key": "entry.instrument.instrumentID.identifierType"
                                            },
                                            {
                                                "title": "Id Value",
                                                "key": "entry.instrument.instrumentID.identifierValue"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Instrument Details",
                                        "type": "fieldset",
                                        "htmlClass": "myclass",
                                        "items": [
                                            {
                                                "type": "tabs",
                                                "id": "navtabs_instrument",
                                                "title": "Instrument Details",
                                                "items": [
                                                    {
                                                        "title": "Manufacturer",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Manufacturer",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - Details about the manufacturer or vendor of the instrument",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Manufacturer Name",
                                                                        "key": "entry.instrument.instrumentManufacturer.manufacturerName"
                                                                    },
                                                                    {
                                                                        "title": "Model Name",
                                                                        "key": "entry.instrument.instrumentManufacturer.modelName"
                                                                    },
                                                                    {
                                                                        "title": "Id Type",
                                                                        "key": "entry.instrument.instrumentManufacturer.manufacturerID.identifierType"
                                                                    },
                                                                    {
                                                                        "title": "Id Value",
                                                                        "key": "entry.instrument.instrumentManufacturer.manufacturerID.identifierValue"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "Chamber Pressure",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Chamber Pressure",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "description":"(Required) - Pressure maintained inside the chamber (in which the sample is housed) during the measurement",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.chamberPressure.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.chamberPressure.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.chamberPressure.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.chamberPressure.uncertainty"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "eBeam Source",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "eBeam Source",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "description":"(Required) - Details about the electron-beam source",
                                                                "items": [
                                                                    {
                                                                        "title": "Id Type",
                                                                        "key": "entry.instrument.eBeamSource.sourceID.identifierType"
                                                                    },
                                                                    {
                                                                        "title": "Id Value",
                                                                        "key": "entry.instrument.eBeamSource.sourceID.identifierValue"
                                                                    },
                                                                    {
                                                                        "title": "Name",
                                                                        "key": "entry.instrument.eBeamSource.sourceName"
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Acceleration Voltage",
                                                                "type": "fieldset",
                                                                "description":"(Required) - the voltage with which the e-beam is accelerated, defined separately as voltageDetails, (includes the voltage value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - µV, mv, V, kV, MV)",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.eBeamSource.accelerationVoltage.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.eBeamSource.accelerationVoltage.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.eBeamSource.accelerationVoltage.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.eBeamSource.accelerationVoltage.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Beam Current",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - the measured current of the e-beam, defined separately as currentDetails (includes the current value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - pA, nA, µA, mA, A, kA)",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.eBeamSource.beamCurrent.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.eBeamSource.beamCurrent.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.eBeamSource.beamCurrent.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.eBeamSource.beamCurrent.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            { "title": "High Current", "key": "entry.instrument.eBeamSource.highCurrent"},
                                                            {
                                                                "legend": "Source Lifetime",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - lifetime of the e-beam source (default value - µAh) of datatype string",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.eBeamSource.sourceLifetime.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.eBeamSource.sourceLifetime.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.eBeamSource.sourceLifetime.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.eBeamSource.sourceLifetime.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            { "legend": "Gun Vacuum",
                                                            "type": "fieldset",
                                                            "htmlClass": "myclass",
                                                            "description":"(Required) - pressure of the electron gun",
                                                            "items": [
                                                                {
                                                                    "title": "Value",
                                                                    "key": "entry.instrument.eBeamSource.gunVacuum.value"
                                                                },
                                                                {
                                                                    "title": "Unit",
                                                                    "key": "entry.instrument.eBeamSource.gunVacuum.unit"
                                                                },
                                                                {
                                                                    "title": "Qualifier",
                                                                    "key": "entry.instrument.eBeamSource.gunVacuum.qualifier"
                                                                },
                                                                {
                                                                    "title": "Notes",
                                                                    "key": "entry.instrument.eBeamSource.gunVacuum.notes"
                                                                },
                                                                {
                                                                    "title": "Uncertainty",
                                                                    "key": "entry.instrument.eBeamSource.gunVacuum.uncertainty"
                                                                }
                                                            ]}
                                                        ]
                                                    },
                                                    {
                                                        "title": "Stage",
                                                        "type": "tab",
                                                        "items": [

                                                            {
                                                                "legend": "General",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "stage Alignment Done",
                                                                        "key": "entry.instrument.stage.stageAlignmentDone"
                                                                    },
                                                                    {
                                                                        "title": "Is Correlation Image?",
                                                                        "key": "entry.instrument.stage.isCorrelationImage"
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                "title": "Coordinates",
                                                                "type": "tab",
                                                                "items": [
                                                                    {
                                                                        "title": "Coordinates Unit",
                                                                        "key": "entry.instrument.stage.coordinates.coordinatesUnit"
                                                                    },
                                                                    {
                                                                        "legend": "X Value",
                                                                        "description":"(Optional) - value of the x coordinate",
                                                                        "type": "fieldset",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "Value",
                                                                                "key": "entry.instrument.stage.coordinates.xValue"
                                                                            },
                                                                            {
                                                                                "title": "Uncertainty",
                                                                                "key": "entry.instrument.stage.coordinates.xUncertainty"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "legend": "Y Value",
                                                                        "type": "fieldset",
                                                                        "description":"(Optional) - value of the y coordinate",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "Value",
                                                                                "key": "entry.instrument.stage.coordinates.yValue"
                                                                            },
                                                                            {
                                                                                "title": "Uncertainty",
                                                                                "key": "entry.instrument.stage.coordinates.yUncertainty"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "legend": "Z Value",
                                                                        "type": "fieldset",
                                                                        "description":"(Optional) - value of the zcoordinate",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "Value",
                                                                                "key": "entry.instrument.stage.coordinates.zValue"
                                                                            },
                                                                            {
                                                                                "title": "Uncertainty",
                                                                                "key": "entry.instrument.stage.coordinates.zUncertainty"
                                                                            }
                                                                        ]
                                                                    }

                                                                ]
                                                            },
                                                            {
                                                                "title": "Coordinate Reference",
                                                                "key": "entry.instrument.stage.coordinateReference"
                                                            },
                                                            {
                                                                "legend": "Stage Tilt Angle",
                                                                "type": "fieldset",
                                                                "description":"(Required) - angle by which the stage is actually tilted (Stage at T) defined separately as angleDetails with the angle value, optional uncertainty, optional notes, optional qualifier and choice of units between degree and radian",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.stage.stageTiltAngle.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.stage.stageTiltAngle.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.stage.stageTiltAngle.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.stage.stageTiltAngle.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Tilt Correction Angle",
                                                                "type": "fieldset",
                                                                "description":"(Optional) - angle used to correct the tilt of the sample defined separately as angleDetails with the angle value, optional uncertainty, optional notes, optional qualifier and choice of units between degree and radian notes, optional qualifier and choice of units between degree and radian",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.stage.tiltCorrectionAngle.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.stage.tiltCorrectionAngle.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.stage.tiltCorrectionAngle.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.stage.tiltCorrectionAngle.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "title": "Tilt Correction Type",
                                                                "key": "entry.instrument.stage.tiltCorrectionType",
                                                                "placeholder": "none"
                                                            },
                                                            {
                                                                "legend": "eBeam Working Distance",
                                                                "type": "fieldset",
                                                                "description":"(Required) - the distance at which the beam is focussed (when the sample is in focus, this will be the distance between the bottom end of the pole-piece of the objective lens and the sample) defined separately as distanceDetails, with the distance value, optional uncertainty, optional notes, optional qualifier and choice of units between nm, µm, mm, cm and m",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.stage.eBeamWorkingDistance.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.stage.eBeamWorkingDistance.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.stage.eBeamWorkingDistance.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.stage.eBeamWorkingDistance.uncertainty"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "Imaging",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "title": "Imaging",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "type": "tabs",
                                                                        "id": "navtabs_imaging",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "General",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                            {
                                                                                                "title": "Number of Pixels (x)",
                                                                                                "key": "entry.instrument.imaging.numberOfPixels.xPixels"
                                                                                            },
                                                                                            {
                                                                                                "title": "Number of Pixels (y)",
                                                                                                "key": "entry.instrument.imaging.numberOfPixels.yPixels"
                                                                                            },
                                                                                            {
                                                                                                "title": "Collection Method",
                                                                                                "key": "entry.instrument.imaging.collectionMethod"
                                                                                            },
                                                                                            {
                                                                                                "title": "Dynamic Focus",
                                                                                                "key": "entry.instrument.imaging.dynamicFocus"
                                                                                            },
                                                                                            {
                                                                                                "title": "Noise Reduction",
                                                                                                "key": "entry.instrument.imaging.noiseReduction"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                            {
                                                                                "title": "Pixel Size",
                                                                                "type": "tab",
                                                                                "items": [

                                                                                    {
                                                                                        "legend": "X Pixel Size",
                                                                                        "description":"(Required) - distance on the sample covered by a pixel in the x direction defined separately as pixelSizeDetails.",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.pixelSize.xPixelSize.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.pixelSize.xPixelSize.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.pixelSize.xPixelSize.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.imaging.pixelSize.xPixelSize.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.pixelSize.xPixelSize.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Y Pixel Size",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - The y-pixel-size is to be given only if it is different from the x-pixel-size.",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.pixelSize.yPixelSize.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.pixelSize.yPixelSize.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.pixelSize.yPixelSize.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.imaging.pixelSize.yPixelSize.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.pixelSize.yPixelSize.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Z Pixel Size",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - The z-pixel-size can be ignored if it is greater than voxel size",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.pixelSize.zPixelSize.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.pixelSize.zPixelSize.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.pixelSize.zPixelSize.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.imaging.pixelSize.zPixelSize.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.pixelSize.zPixelSize.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Aperture Settings",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Aperture Size",
                                                                                        "description":"(Optional) - The setting for controlling the aperture size, using either the aperture size directly or indirectly using the beam current. Therefore one of the two properties must be selected: size or current.",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.size.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.size.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.size.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.size.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Current",
                                                                                        "description":"(Optional) - The setting for controlling the aperture size, using the beam current indirectly. Either the size or beam current must be given. If the aperture setting is controlled with the beam current, it is defined separately as currentDetails",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.current.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.current.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.current.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.apertureSetting.current.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                             {
                                                                                "title": "Dwell Time",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Dwell Time",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - the dwell time of the beam per pixel, defined separately as  timeDetails",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.dwellTime.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.dwellTime.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.dwellTime.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.dwellTime.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Cycle Time",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Cycle Time",
                                                                                        "type": "fieldset",
                                                                                        "description":"Optional) - the time taken by the beam to , defined separately as  timeDetails",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.cycleTime.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.cycleTime.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.cycleTime.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.cycleTime.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Voxel",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Voxel",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - Size of the voxel in case 3D imaging is done for Energy-dispersive X-ray Spectroscopy or Electron-backscatter Diffraction, defined separately as voxelDetails",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.voxel.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.imaging.voxel.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.imaging.voxel.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.imaging.voxel.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.voxel.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "Detectors",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Mixing",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "description":"(Required) - gives information about signal mixing between two detectors and provides the information about the detector(s)",
                                                                "items": [
                                                                    {
                                                                        "title": "Signal Mixing Done",
                                                                        "key": "entry.instrument.detectors.signalMixingDone"
                                                                    },
                                                                    {
                                                                        "title": "Signal Mixing Description",
                                                                        "key": "entry.instrument.detectors.signalMixingDescription"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "title": "Detectors",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "type": "tabs",
                                                                        "id": "navtabs_detectors",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "Detector 1",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Detector 1",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Required) - gives the settings of one detector defined separately as detectorDetails; entering the details of at least one detector is compulsory",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Type",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Type",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorID.identifierType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Value",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorID.identifierValue"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Manufacturer",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - describes the details of the detector (manufacturerName, modelName and detectorID) as part of manufacturerDetails",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorManufacturer.manufacturerName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Model Name",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorManufacturer.modelName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Type",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorManufacturer.manufacturerID.identifierType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Value",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorManufacturer.manufacturerID.identifierValue"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "title": "Coordinates Unit",
                                                                                        "key": "entry.instrument.detectors.detector1.componentGeometry.coordinatesUnit"
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - xValue",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - x coordinate describing the position of the detector",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.xValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.xUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - yValue",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - y coordinate describing the position of the detector",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.yValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.yUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - zValue",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - z coordinate describing the position of the detector",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.zValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector1.componentGeometry.zUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Detector Bias",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - bias voltage applied to the detector defined separately as voltageDetails. Allowed units nV, µV, mV, V, kV",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorBias.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorBias.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorBias.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorBias.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector1.detectorBias.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Detector 2",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Detector 2",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - gives the settings of an additional detector defined separately as detectorDetails",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Type",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Type",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorID.identifierType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Value",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorID.identifierValue"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Manufacturer",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - describes the details of the detector (manufacturerName, modelName and detectorID) as part of manufacturerDetails",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorManufacturer.manufacturerName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Model Name",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorManufacturer.modelName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Type",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorManufacturer.manufacturerID.identifierType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Value",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorManufacturer.manufacturerID.identifierValue"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "title": "Coordinates Unit",
                                                                                        "key": "entry.instrument.detectors.detector2.componentGeometry.coordinatesUnit"
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - xValue",
                                                                                        "type": "fieldset",
                                                                                        "description":"(Optional) - x coordinate describing the position of the detector",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.xValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.xUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - yValue",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - y coordinate describing the position of the detector",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.yValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.yUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Component Geometry - zValue",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - z coordinate describing the position of the detector",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.zValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector2.componentGeometry.zUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Detector Bias",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - bias voltage applied to the detector defined separately as voltageDetails. Allowed units nV, µV, mV, V, kV",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorBias.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorBias.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorBias.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorBias.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.detectors.detector2.detectorBias.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }

                                                        ]
                                                    },
                                                    {
                                                        "title": "eBeam Deceleration",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "legend": "Landing Energy",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "description":"(Optional) - Landing energy of the e-beam defined separately as energyDetails (allowed units - meV, eV, keV, nJ, mJ, J, kJ, MJ)",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.eBeamDeceleration.landingEnergy.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.eBeamDeceleration.landingEnergy.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.eBeamDeceleration.landingEnergy.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Notes",
                                                                        "key": "entry.instrument.eBeamDeceleration.landingEnergy.notes"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.eBeamDeceleration.landingEnergy.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Stage Bias",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "description":"(Optional) - Bias voltage applied to the stage defined separately biasDetails (allowed units - nV, µV, mV, V, kV, nA, uA, mA, A, kA)",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.eBeamDeceleration.stageBias.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.eBeamDeceleration.stageBias.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.eBeamDeceleration.stageBias.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Notes",
                                                                        "key": "entry.instrument.eBeamDeceleration.stageBias.notes"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.eBeamDeceleration.stageBias.uncertainty"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "FIB Details",
                                                        "type": "tab",
                                                        "items": [
                                                            {
                                                                "title": "FIB Details",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "type": "tabs",
                                                                        "id": "navtabs_fib",
                                                                        "htmlClass": "myclass",
                                                                        "items": [
                                                                            {
                                                                                "title": "General",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "angleToEBeam",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - angle between e-beam and i-beam defined separately as angleDetails (Allowed units: degree, radian)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.angleToEBeam.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.angleToEBeam.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.angleToEBeam.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.angleToEBeam.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "title": "FIB Column",
                                                                                        "key": "entry.instrument.FIB.FIBColumn.value"
                                                                                    },
                                                                                    {
                                                                                        "title": "FIB Probe",
                                                                                        "key": "entry.instrument.FIB.FIBProbe.value"
                                                                                    },
                                                                                    {
                                                                                        "legend": "FIB Extractor",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Required) - The extractor voltage used for the I-Beam",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.FIBExtractor.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.FIBExtractor.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "eentry.instrument.FIB.FIBExtractor.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.FIBExtractor.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "iBeamWorkingDistance",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - Working distance of the ion beam (i-beam) defined separately as distanceDetails - this value needs to be entered if the i-beam focus has to be set independently from the e-beam focus (Allowed units: nm, µm, mm, cm, m)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.iBeamWorkingDistance.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.iBeamWorkingDistance.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.iBeamWorkingDistance.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.iBeamWorkingDistance.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.iBeamWorkingDistance.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "FIBSpotSize",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - spot size of the i-beam at the focus when the sample is in focus (also the spot size on the sample) defined separately as distanceDetails (Allowed units: nm, µm, mm, cm, m)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.FIBSpotSize.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.FIBSpotSize.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.FIBSpotSize.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.FIBSpotSize.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.FIBSpotSize.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "iBeamSource",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "iBeam Source",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Required) - describes the details of the FIB source, defined separately as sourceDetails in which it is important to note the accelerating voltage and beam current of the i-beam",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Type",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceID.identifierType"
                                                                                            },
                                                                                            {
                                                                                                "title": "Id Value",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceID.identifierValue"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Acceleration Voltage",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Required) - the voltage with which the i-beam is accelerated, defined separately as voltageDetails, (includes the voltage value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - µV, mv, V, kV, MV)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.accelerationVoltage.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.accelerationVoltage.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.accelerationVoltage.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.accelerationVoltage.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Beam Current",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Required) - the measured current of the i-beam, defined separately as currentDetails (includes the current value, optional uncertainty, optional qualifier like max or min, optional note of the type string, and a controlled list of units from which one can be chosen - pA, nA, µA, mA, A, kA)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.beamCurrent.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.beamCurrent.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.beamCurrent.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.beamCurrent.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Source Lifetime",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - lifetime of the i-beam source (default value - µAh) of datatype string",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceLifetime.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceLifetime.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceLifetime.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.sourceLifetime.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "FIB Gun Pressure",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Gun Pressure",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Required) - pressure of the FIB gun, defined separately as pressureDetails (Allowed units Pa, hPa, kPa, MPa, GPa, mbar, bar, psi)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.gunPressure.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.gunPressure.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.gunPressure.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.gunPressure.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.iBeamSource.gunPressure.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "gasInjectionSystem",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "gasInjectionSystem",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - Details about the gas injection system (GIS)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Name",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.GISName"
                                                                                            },
                                                                                            {
                                                                                                "title": "Beam Deposition Type",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.beamDepositionType"
                                                                                            },
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Deposition Current",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - the current used for performing beam deposition defined separately as currentDetails (Allowed units pA,nA,µA,mA,A)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionCurrent.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionCurrent.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionCurrent.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionCurrent.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionCurrent.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Deposition Size",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - the size of the deposition defined separately as distanceDetails (Allowed units nm,µm,mm,cm,m)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionSize.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionSize.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionSize.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionSize.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionSize.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Deposition Time",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "description":"(Optional) - total time for deposition defined separately as timeDetails (Allowed units ps,ns,µs,ms,s)",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionTime.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionTime.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionTime.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionTime.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.gasInjectionSystem.depositionTime.uncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }

                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }]
                    }
                ]
            }
        ]

    }
