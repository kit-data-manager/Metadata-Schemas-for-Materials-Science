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
                {"title": "Comments", "key": "sampleName.comments"}
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
                                {"title": "Comments", "key": "sampleID.comments"}
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
                                {
                                    "title": "Reference Points",
                                    "key": "sampleIDNumber.referencePoints"
                                },
                                {"title": "Comments", "key": "sampleIDNumber.comments"}
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
                {"title": "Comments", "key": "sampleComponents.comments"}
            ]
        },
        {
            "legend": "Sample Chemical Formula",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Chemical Formula", "key": "chemicalFormula.chemicalFormula"},
                {"title": "Comments", "key": "chemicalFormula.comments"}
            ]   
        },
        {
            "legend": "Sample Mass",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Mass", "key": "sampleMass.sampleMass"},
                {"title": "Comments", "key": "sampleMass.comments"}
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
                    "key": "physicalState",
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
                        "notApplicable",
                        "solid",
                        "powder",
                        "liquid",
                        "gas"
                    ]
                }
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
                {"title": "Comments", "key": "temperatures.comments"}
            ]
        },
        {
            "legend": "Sample Producer",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Producer", "key": "sampleProducer.sampleProducer"},
                {"title": "Comments", "key": "sampleProducer.comments"}
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
                {"title": "Comments", "key": "samplePreparation.comments"}
            ]
        },
        {
            "legend": "Sample Expiration Date",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Expiration Date", "key": "expirationDate.expirationDate"},
                {"title": "Comments", "key": "expirationDate.comments"}
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
                                {"title": "Comments", "key": "sampleHandling.sampleProperties.comments"}
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
                                {"title": "Comments", "key": "sampleHandling.sensitivityAgainst.comments"}
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
                                {"title": "Comments", "key": "sampleHandling.safetyInfo.comments"}
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
                                {"title": "Comments", "key": "sampleHandling.sampleHandling.comments"}
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
                                {"title": "Comments", "key": "sampleHandling.storageConditions.comments"}
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
                {"title": "Comments", "key": "embeddingMaterial.comments"}
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
                {"title": "Comments", "key": "sampleHolder.comments"}

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
                {"title": "Sample Carrier Lenght", "key": "sampleCarrier.sampleCarrierLenght"},
                {"title": "Sample Carrier Width", "key": "sampleCarrier.sampleCarrierWidth"},
                {"title": "Sample Carrier Height", "key": "sampleCarrier.sampleCarrierHeight"},
                {"title": "Sample Carrier Temperature Range", "key": "sampleCarrier.sampleCarrierTemperatureRange"},
                {"title": "Sample Carrier Supported Samples", "key": "sampleCarrier.supportedSamples"},
                {"title": "Sample Carrier Supported Holders", "key": "sampleCarrier.supportedHolders"},
                {"title": "Sample Carrier Description", "key": "sampleCarrier.sampleCarrierDescription"},
                {"title": "Comments", "key": "sampleHolder.comments"}

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
                                {"title": "Coordinate System", "key": "sampleReferencing.coordinateSystem"},
                                {"title": "Sample Reference", "key": "sampleReferencing.sampleReference"},
                                {"title": "Comments", "key": "sampleReferencing.comments"}
                            ]
                        },
                        {
                            "title": "Holder Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "holderReferencing.axisOrientation"},
                                {"title": "Coordinate System", "key": "holderReferencing.coordinateSystem"},
                                {"title": "Sample position on Holder", "key": "holderReferencing.samplePositionOnHolder"},
                                {"title": "Holder Reference", "key": "holderReferencing.holderReference"},
                                {"title": "Comments", "key": "holderReferencing.comments"}
                            ]
                        },
                        {
                            "title": "Carrier Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "carrierReferencing.axisOrientation"},
                                {"title": "Coordinate System", "key": "carrierReferencing.coordinateSystem"},
                                {"title": "Holder position on Carrier", "key": "carrierReferencing.holderPositionOnCarrier"},
                                {"title": "Carrier Reference", "key": "carrierReferencing.carrierReference"},
                                {"title": "Comments", "key": "carrierReferencing.comments"}
                            ]
                        },
                        {
                            "title": "ROI Referencing",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Axis Orientation", "key": "ROI.axisOrientation"},
                                {"title": "Coordinate System", "key": "ROI.coordinateSystem"},
                                {"title": "ROI Reference", "key": "ROI.ROIReference"},
                                {"title": "Comments", "key": "ROI.comments"}
                            ]
                        },
                        {
                            "title": "Test ROI",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "type": "selectfieldset",
                                    "title": "Coordinate System",
                                    "key": "test.ROI1",
                                    "titleMap":
                                    {
                                        "carthesian": "Carthesian",
                                        "polar": "Polar"
                                    },
                                    "items": 
                                    [
                                        "test.carthesian",
                                        "test.polar"
                                    ]
                                },
                                {"title": "Comments", "key": "test.comments"}
                            ]
                        }
                        
                    ]
                }
            ]   
        },    

    ]
}