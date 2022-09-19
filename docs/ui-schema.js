var uiSchema =
    {
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
                    {"title": "Definition", "key": "entry.definition"},
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
                                        "description":"Details of the institution to which the user is affiliated",
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
                                            {"title": "Embedding Medium", "key": "entry.sample.embeddingMedium"},
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
                                            {"title": "Name", "key": "entry.instrument.instrumentName"},
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
                                                            {
                                                                "legend": "Source Lifetime",
                                                                "type": "fieldset",
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
                                                            }
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
                                                                        "title": "Alignment Done",
                                                                        "key": "entry.instrument.stage.stageAlignmentDone"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "Tilt Angle",
                                                                "type": "fieldset",
                                                                "htmlClass": "myclass",
                                                                "items": [
                                                                    {
                                                                        "title": "Value",
                                                                        "key": "entry.instrument.stage.tiltAngle.value"
                                                                    },
                                                                    {
                                                                        "title": "Unit",
                                                                        "key": "entry.instrument.stage.tiltAngle.unit"
                                                                    },
                                                                    {
                                                                        "title": "Qualifier",
                                                                        "key": "entry.instrument.stage.tiltAngle.qualifier"
                                                                    },
                                                                    {
                                                                        "title": "Uncertainty",
                                                                        "key": "entry.instrument.stage.tiltAngle.uncertainty"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "legend": "eBeam Working Distance",
                                                                "type": "fieldset",
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
                                                                                        "legend": "General",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [

                                                                                            {
                                                                                                "title": "Is Correlation Image",
                                                                                                "key": "entry.instrument.imaging.isCorrelationImage"
                                                                                            },
                                                                                            {
                                                                                                "title": "Coordinate Reference",
                                                                                                "key": "entry.instrument.imaging.coordinateReference"
                                                                                            },
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
                                                                                                "title": "Tilt Correction",
                                                                                                "key": "entry.instrument.imaging.tiltCorrection"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Coordinates",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "title": "Coordinates Unit",
                                                                                        "key": "entry.instrument.imaging.coordinates.coordinatesUnit"
                                                                                    },
                                                                                    {
                                                                                        "legend": "X Value",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.coordinates.xValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.coordinates.xUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Y Value",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.coordinates.yValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.coordinates.yUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "legend": "Z Value",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.imaging.coordinates.zValue"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.imaging.coordinates.zUncertainty"
                                                                                            }
                                                                                        ]
                                                                                    }

                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "Pixel Size",
                                                                                "type": "tab",
                                                                                "items": [

                                                                                    {
                                                                                        "legend": "X Pixel Size",
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
                                                                                        "legend": "Size",
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
                                                                                "title": "Voxel",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "Voxel",
                                                                                        "type": "fieldset",
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
                                                                                "title": "iBeamSource",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "iBeam Source",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
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
                                                                                "title": "angleToEBeam",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "angleToEBeam",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
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
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "gunPressure",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "gunPressure",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
                                                                                        "items": [
                                                                                            {
                                                                                                "title": "Value",
                                                                                                "key": "entry.instrument.FIB.gunPressure.value"
                                                                                            },
                                                                                            {
                                                                                                "title": "Unit",
                                                                                                "key": "entry.instrument.FIB.gunPressure.unit"
                                                                                            },
                                                                                            {
                                                                                                "title": "Qualifier",
                                                                                                "key": "entry.instrument.FIB.gunPressure.qualifier"
                                                                                            },
                                                                                            {
                                                                                                "title": "Notes",
                                                                                                "key": "entry.instrument.FIB.gunPressure.notes"
                                                                                            },
                                                                                            {
                                                                                                "title": "Uncertainty",
                                                                                                "key": "entry.instrument.FIB.gunPressure.uncertainty"
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
                                                                            },
                                                                            {
                                                                                "title": "iBeamWorkingDistance",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "iBeamWorkingDistance",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
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
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "FIBSpotSize",
                                                                                "type": "tab",
                                                                                "items": [
                                                                                    {
                                                                                        "legend": "FIBSpotSize",
                                                                                        "type": "fieldset",
                                                                                        "htmlClass": "myclass",
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

    };
