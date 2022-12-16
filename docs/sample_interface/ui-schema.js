var uiSchema = {
    "type": "fieldset",
    "items":
    [
        {
            "legend": "Sample Name",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Name", "key": "sampleName.sampleName"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments",  "key": "sampleName.comments"}
            ]
        },
        {
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "id_navtabs",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "Sample ID",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Sample ID Type", "key": "sampleID.sampleID.identifierType"},
                                {"title": "Sample ID Value", "key": "sampleID.sampleID.identifierValue"},
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleID.comments"}
                            ]
                        },
                        {
                            "title": "Identification Number",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "Identification Number Position on Sample", 
                                    "key": "sampleIDNumber.IDnumberPosition",
                                    "type": "checkboxes"
                                },
                                {"title": "Axis Orientation", "key": "sampleIDNumber.axisOrientation"},
                                {
                                    "type": "selectfieldset",
                                    "title": "Reference Points: coordinate system",
                                    "key": "sampleIDNumber.referencePoints",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "sampleIDNumber.notApplicable",
                                        "sampleIDNumber.cartesian",
                                        "sampleIDNumber.polar",
                                        "sampleIDNumber.other"
                                    ]
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleIDNumber.comments"}
                            ]
                        }
                    ]
                }
            ]   
        },
        {
            "legend": "Sample Components",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Use the + to insert each Sample Component", "key": "sampleComponents.sampleComponents"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleComponents.comments"}
            ]
        },
        {
            "legend": "Sample Chemical Formula",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Chemical Formula", "key": "chemicalFormula.chemicalFormula"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "chemicalFormula.comments"}
            ]   
        },
        {
            "legend": "Sample Mass",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Mass", "key": "sampleMass.sampleMass"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleMass.comments"}
            ]   
        },
        {
            "legend": "Sample Characterization",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {
                    "type": "selectfieldset",
                    "title": "Physical State",
                    "key": "physicalState.physicalState",
                    "titleMap": 
                    {
                        "notApplicable": "Not Applicable",
                        "solid": "Solid",
                        "powder": "Powder",
                        "liquid": "Liquid",
                        "gas": "Gas"
                    },
                    "items": 
                    [
                        "physicalState.notApplicable",
                        "physicalState.solid",
                        "physicalState.powder",
                        "physicalState.liquid",
                        "physicalState.gas"
                    ]
                },
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "physicalState.comments"}
            ]
        },
        {
            "legend": "Relevant Sample Temperatures",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Melting Temperature", "key": "temperatures.meltingTemperature"},
                {"title": "Recrystallization Temperature", "key": "temperatures.recrystallizationTemperature"},
                {"title": "Evaporation Temperature", "key": "temperatures.evaporationTemperature"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "temperatures.comments"}
            ]
        },
        {
            "legend": "Sample Producer",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Producer", "key": "sampleProducer.sampleProducer"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleProducer.comments"}
            ]
        },
        {
            "legend": "Sample Preparation",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Preparation Date", "key": "samplePreparation.preparationDate"},
                {"title": "Sample Preparation Purpose", "key": "samplePreparation.preparationPurpose"},
                {"title": "Sample Preparation Method", "key": "samplePreparation.preparationMethod"},
                {"title": "Sample Preparation Description", "key": "samplePreparation.preparationDescription"},
                {"title": "Sample Preparation ID", "key": "samplePreparation.preparationID"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "samplePreparation.comments"}
            ]
        },
        {
            "legend": "Sample Expiration Date",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Expiration Date", "key": "expirationDate.expirationDate"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "expirationDate.comments"}
            ]
        },
        {
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "sample_navtabs",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "Sample Properties",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "The sample is", 
                                    "key": "sampleHandling.sampleProperties.samplePropertiesList",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHandling.sampleProperties.comments"}
                            ]
                        },
                        {
                            "title": "Sensitivity Against",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "The sample is sensitive to", 
                                    "key": "sampleHandling.sensitivityAgainst.sensitivityList",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHandling.sensitivityAgainst.comments"}
                            ]
                        },
                        {
                            "title": "Safety Information",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "Hazard", 
                                    "key": "sampleHandling.safetyInfo.hazard",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHandling.safetyInfo.comments"}
                            ]
                        },
                        {
                            "title": "Sample Handling",
                            "type": "tab",
                            "items":
                            [
                                {"title": "No-Tweezers Regions", "key": "sampleHandling.sampleHandling.noTweezers"},
                                {"title": "Clean Room Conditions", "key": "sampleHandling.sampleHandling.cleanRoom"},
                                {"title": "Humidity", "key": "sampleHandling.sampleHandling.humidity"},
                                {"title": "Gas Atmosphere", "key": "sampleHandling.sampleHandling.gasAtmosphere"},
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHandling.sampleHandling.comments"}
                            ]
                        },
                        {
                            "title": "Storage Conditions",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Storage Temperature", "key": "sampleHandling.storageConditions.storageTemperature"},
                                {"title": "Storage Pressure", "key": "sampleHandling.storageConditions.storagePressure"},
                                {"title": "Storage Humidity", "key": "sampleHandling.storageConditions.storageHumidity"},
                                {"title": "Storage Gas Atmosphere", "key": "sampleHandling.storageConditions.storageGasAtmosphere"},
                                {
                                    "title": "Storage Equipment", 
                                    "key": "sampleHandling.storageConditions.storageEquipment",
                                    "type": "checkboxes"
                                },
                                {"title": "Additional Notes", "key": "sampleHandling.storageConditions.additionalNotes"},
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHandling.storageConditions.comments"}
                            ]
                        },
                    ]
                }
            ]
        },
        {
            "legend": "Sample Embedding Material",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Embedding Material", "key": "embeddingMaterial.embeddingMaterial"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "embeddingMaterial.comments"}
            ]  
        },
        {
            "legend": "Sample Holder",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Holder Type", "key": "sampleHolder.sampleHolderType"},
                {"title": "Sample Holder Material", "key": "sampleHolder.sampleHolderMaterial"},
                {"title": "Sample Holder Temperature Range", "key": "sampleHolder.sampleHolderTemperatureRange"},
                {"title": "Sample Holder Supported Samples", "key": "sampleHolder.supportedSamples"},
                {"title": "Sample Holder Description", "key": "sampleHolder.sampleHolderDescription"},
                {"title": "Fixing Method", "key": "sampleHolder.fixingMethod"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleHolder.comments"}

            ]
        },
        {
            "legend": "Sample Carrier",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Carrier Type", "key": "sampleCarrier.sampleCarrierType"},
                {"title": "Sample Carrier Material", "key": "sampleCarrier.sampleCarrierMaterial"},
                {"title": "Sample Carrier Length", "key": "sampleCarrier.sampleCarrierLength"},
                {"title": "Sample Carrier Width", "key": "sampleCarrier.sampleCarrierWidth"},
                {"title": "Sample Carrier Height", "key": "sampleCarrier.sampleCarrierHeight"},
                {"title": "Sample Carrier Temperature Range", "key": "sampleCarrier.sampleCarrierTemperatureRange"},
                {"title": "Sample Carrier Supported Samples", "key": "sampleCarrier.supportedSamples"},
                {"title": "Sample Carrier Supported Holders", "key": "sampleCarrier.supportedHolders"},
                {"title": "Sample Carrier Description", "key": "sampleCarrier.sampleCarrierDescription"},
                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleCarrier.comments"}

            ]
        },
        {
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "ref_navtabs",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "Sample Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "sampleReferencing.axisOrientation"},
                                {
                                    "type": "selectfieldset",
                                    "title": "Coordinate System",
                                    "key": "sampleReferencing.sampleReference",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "sampleReferencing.notApplicable",
                                        "sampleReferencing.cartesian",
                                        "sampleReferencing.polar",
                                        "sampleReferencing.other"
                                    ]
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "sampleReferencing.comments"}
                            ]
                        },
                        {
                            "title": "Holder Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "holderReferencing.axisOrientation"},
                                {
                                    "type": "selectfieldset",
                                    "title": "Sample position on Holder: Coordinate System",
                                    "key": "holderReferencing.sampleOnHolder.samplePositionOnHolder",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "holderReferencing.sampleOnHolder.notApplicable",
                                        "holderReferencing.sampleOnHolder.cartesian",
                                        "holderReferencing.sampleOnHolder.polar",
                                        "holderReferencing.sampleOnHolder.other"
                                    ]
                                },
                                {
                                    "type": "selectfieldset",
                                    "title": "Markers position on Holder: Coordinate System",
                                    "key": "holderReferencing.markerOnHolder.holderReference",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "holderReferencing.markerOnHolder.notApplicable",
                                        "holderReferencing.markerOnHolder.cartesian",
                                        "holderReferencing.markerOnHolder.polar",
                                        "holderReferencing.markerOnHolder.other"
                                    ]
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "holderReferencing.comments"}
                            ]
                        },
                        {
                            "title": "Carrier Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "carrierReferencing.axisOrientation"},
                                {
                                    "type": "selectfieldset",
                                    "title": "Holder position on Carrier: Coordinate System",
                                    "key": "carrierReferencing.holderOnCarrier.holderPositionOnCarrier",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "carrierReferencing.holderOnCarrier.notApplicable",
                                        "carrierReferencing.holderOnCarrier.cartesian",
                                        "carrierReferencing.holderOnCarrier.polar",
                                        "carrierReferencing.holderOnCarrier.other"
                                    ]
                                },
                                {
                                    "type": "selectfieldset",
                                    "title": "Markers position on Carrier: Coordinate System",
                                    "key": "carrierReferencing.markerOnCarrier.carrierReference",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "carrierReferencing.markerOnCarrier.notApplicable",
                                        "carrierReferencing.markerOnCarrier.cartesian",
                                        "carrierReferencing.markerOnCarrier.polar",
                                        "carrierReferencing.markerOnCarrier.other"
                                    ]
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "carrierReferencing.comments"}
                            ]
                        },
                        {
                            "title": "ROI Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "ROI.axisOrientation"},
                                {
                                    "type": "selectfieldset",
                                    "title": "Coordinate System",
                                    "key": "ROI.ROIReference",
                                    "titleMap":
                                    {
                                        "notApplicable": "Not applicable",
                                        "cartesian": "Cartesian",
                                        "polar": "Polar",
                                        "other": "Other (please add in the comments)"
                                    },
                                    "items": 
                                    [
                                        "ROI.notApplicable",
                                        "ROI.cartesian",
                                        "ROI.polar",
                                        "ROI.other"
                                    ]
                                },
                                {"title": "Comments", "type":"textarea", "htmlClass": "comments", "key": "ROI.comments"}
                            ]
                        }
                        
                    ]
                }
            ]   
        },    

    ]
}