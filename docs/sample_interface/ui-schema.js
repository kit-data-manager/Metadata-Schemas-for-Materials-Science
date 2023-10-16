var uiSchema = {
    "type": "fieldset",
    "items":
    [
        {
            "legend": "Sample Identification",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Sample Name", "key": "sampleIdentification.sampleName"},
                {"title": "Sample Producer", "key": "sampleIdentification.sampleProducer"},
                {"title": "Sample Purpose", "key": "sampleIdentification.samplePurpose", "type": "checkboxes"},
                {"title": "Sample ID", "key": "sampleIdentification.sampleID.sampleID"},
                {"title": "Sample ID Type", "key": "sampleIdentification.sampleID.sampleIDType"},
                {"title": "Comment", "key": "sampleIdentification.sampleID.sampleIDTypeComment"},
                {"title": "Sample ID Position", "key": "sampleIdentification.sampleID.sampleIDPosition","type": "checkboxes"}
            ]
        },
        {
            "legend": "Sample Components",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Use the + to insert each Sample Component", "key": "sampleComponents"},
            ]
        },
        {
            "legend": "Sample Characterization",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Phase of Matter", "key": "sampleCharacterization.phaseOfMatter.phaseOfMatterOptions", "type": "checkboxes"},
                {"title": "Comment", "key": "sampleCharacterization.phaseOfMatter.comment"},
                {
                    "type": "selectfieldset",
                    "title": "Material Type",
                    "key": "sampleCharacterization.materialType",
                    "items": 
                    [
                        "sampleCharacterization.notApplicable",
                        "sampleCharacterization.biological",
                        "sampleCharacterization.biomaterials",
                        "sampleCharacterization.ceramics",
                        "sampleCharacterization.metalsAndAlloys",
                        "sampleCharacterization.metamaterials",
                        "sampleCharacterization.molecularFluids",
                        "sampleCharacterization.organicCompounds",
                        "sampleCharacterization.organometallics",
                        "sampleCharacterization.polymers",
                        "sampleCharacterization.semiconductors"
                    ]
                },
                {"title": "Material Data Sheet", "key": "sampleCharacterization.materialDataSheet"}
            ]
        },
        {
            "title": "Structural Features",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "struct_navtabs",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "Composites",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.composites.compositesOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.composites.comment"}
                            ]
                        },
                        {
                            "title": "Defects",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.defects.defectsOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.defects.comment"}
                            ]
                        },
                        {
                            "title": "Interfacial",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.interfacial.interfacialOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.interfacial.comment"}
                            ]
                        },
                        {
                            "title": "Microstructures",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.microstructures.microstructuresOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.microstructures.comment"}
                            ]
                        },
                        {
                            "title": "Molecular Structure",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.molecularStructure.molecularStructureOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.molecularStructure.comment"}
                            ]
                        },
                        {
                            "title": "Morphologies",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.morphologies.morphologiesOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.morphologies.comment"}
                            ]
                        },
                        {
                            "title": "Properties",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "structuralFeatures.properties.propertiesOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "structuralFeatures.properties.comment"}
                            ]
                        }
                    ]
                }
            ]
        },      
        {
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Description", "key": "sampleDescription"}
            ]
        },
        {
            "legend": "Sample Handling Precaution",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "prop_navtabs",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "Sensitivity Against",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "The sample is sensitive to", 
                                    "key": "sampleHandlingPrecaution.sensitivityAgainst.sensitivityList",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "sampleHandlingPrecaution.sensitivityAgainst.comments"}
                            ]
                        },
                        {
                            "title": "Safety Information",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "Hazard", 
                                    "key": "sampleHandlingPrecaution.safetyInfo.hazard",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "sampleHandlingPrecaution.safetyInfo.comments"}
                            ]
                        },
                        {
                            "title": "Sample Handling",
                            "type": "tab",
                            "items":
                            [
                                {"key": "sampleHandlingPrecaution.sampleHandling"}
                            ]
                        },
                        {
                            "title": "Storage Conditions",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Storage Temperature", "key": "sampleHandlingPrecaution.storageConditions.storageTemperature"},
                                {"title": "Storage Pressure", "key": "sampleHandlingPrecaution.storageConditions.storagePressure"},
                                {"title": "Storage Humidity", "key": "sampleHandlingPrecaution.storageConditions.storageHumidity"},
                                {"title": "Storage Gas Atmosphere", "key": "sampleHandlingPrecaution.storageConditions.storageGasAtmosphere"},
                                {
                                    "title": "Storage Equipment", 
                                    "key": "sampleHandlingPrecaution.storageConditions.storageEquipment.storageEquipmentOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "sampleHandlingPrecaution.storageConditions.storageEquipment.comments"},
                                {"title": "Additional Notes", "key": "sampleHandlingPrecaution.storageConditions.additionalNotes"}
                            ]
                        },
                    ]
                }
            ]
        },
        {
            "legend": "Parents",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Use the + to insert each Sample Parent", "key": "parents"}
            ]
        },
        {
            "legend": "Sample Preparation",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Preparation Date", "key": "samplePreparation.preparationDate"},
                {"title": "Use the + to insert each Consumable", "key": "samplePreparation.consumables", "htmlClass": "myclass"},
                {
                    "title": "Use the + to insert each Sample Preparation Step",
                    "type": "array",
                    "htmlClass": "myclass",
                    "items": 
                    [
                        {
                            "type": "selectfieldset",
                            "title": "Sample Preparation Step",
                            "key": "samplePreparation.preparationMethod[].preparationStep",
                            "items": 
                            [
                                "samplePreparation.preparationMethod[].notApplicable", 
                                "samplePreparation.preparationMethod[].annealingHomogenization",
                                "samplePreparation.preparationMethod[].depositionCoating",
                                "samplePreparation.preparationMethod[].joining",
                                "samplePreparation.preparationMethod[].mechanicalAndSurface",
                                "samplePreparation.preparationMethod[].powderProcessing",
                                "samplePreparation.preparationMethod[].cooling",
                                "samplePreparation.preparationMethod[].reactive",
                                "samplePreparation.preparationMethod[].other"
                            ]
                        },
                    ]
                },
                {"title": "Sample Preparation Description", "key": "samplePreparation.preparationDescription"},
                {"title": "Sample Preparation File", "key": "samplePreparation.preparationHistoryFile"},
                {"title": "Sample Preparation File Reference", "key": "samplePreparation.preparationHistoryFileReference"}
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
                    "id": "refer_navtabs",
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
                                {"title": "Comments", "key": "sampleReferencing.comments"}
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
                                {"title": "Comments", "key": "holderReferencing.comments"}
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
                                {"title": "Comments", "key": "carrierReferencing.comments"}
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
                                {"title": "Comments", "key": "ROI.comments"}
                            ]
                        }
                        
                    ]
                }
            ]   
        }
    ]
}