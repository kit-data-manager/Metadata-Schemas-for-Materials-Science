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
                {"title": "Sample Purpose", "key": "sampleIdentification.samplePurpose.samplePurposeOptions", "type": "checkboxes"},
                {"title": "Other Sample Purpose", "key": "sampleIdentification.samplePurpose.otherSamplePurpose"},
                {"title": "Sample ID", "key": "sampleIdentification.sampleID.sampleID"},
                {"title": "Sample ID Type", "key": "sampleIdentification.sampleID.sampleIDType", "type": "radios"},
                {"title": "Other Sample ID", "key": "sampleIdentification.sampleID.otherSampleIDType"},
                {"title": "Sample ID Position", "key": "sampleIdentification.sampleID.sampleIDPosition","type": "checkboxes"}
            ]
        },
        {
            "legend": "Sample Components",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Use the + to insert each Sample Component (not the Precursors: they can be inserted in Parents)", "key": "sampleComponents"}
            ]
        },
        {
            "legend": "Sample Characterization",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {
                    "type": "tabs",
                    "id": "material_navtab",
                    "htmlClass": "myclass",
                    "items":
                    [
                        {
                            "title": "PhaseOfMatter",
                            "type": "tab",
                            "items":
                            [
                                {"title": "One choice is allowed", "key": "sampleCharacterization.phaseOfMatter", "type": "radios"}
                            ]
                        },
                        {
                            "title": "Material Type",
                            "type": "tab",
                            "items": 
                            [
                                {"title": "Multiple choice is allowed", "key": "sampleCharacterization.materialType", "type": "radios"}
                            ]
                        },
                        {
                            "title": "Material Properties",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Multiple choice is allowed", "key": "sampleCharacterization.materialProperties.propertiesOptions", "type": "checkboxes"},
                                {"title": "otherMaterialProperties", "key": "sampleCharacterization.materialProperties.otherMaterialProperties"}
                            ]
                        }
                    ]
                }    
            ]
        },
        {
            "title": "Features of Interest",
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
                            "title": "Functional Test",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Use the + to insert each specified element to be examined during the functional test", "key": "featuresOfInterest.functionalTest.specifiedElements"}
                            ]
                        },
                        {
                            "title": "Defects",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "featuresOfInterest.defects.defectsOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comment", "key": "featuresOfInterest.defects.comment"}
                            ]
                        },
                        {
                            "title": "Interfaces",
                            "type": "tab",
                            "items": 
                            [
                                {
                                    "title": "Multiple choice is allowed", 
                                    "key": "featuresOfInterest.interfaces.interfacesOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Comment", "key": "featuresOfInterest.interfaces.comment"}
                            ]
                        },
                        {
                            "title": "Dominant Structures",
                            "type": "tab",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {
                                    "title": "Reinforcement Structures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"key": "featuresOfInterest.dominantStructures.reinforcementStructures"}
                                    ]
                                },
                                {
                                    "title": "Clusters",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"title": "Cluster Components", "key": "featuresOfInterest.dominantStructures.clusters.clusterComponents"},
                                        {"title": "Cluster Size", "key": "featuresOfInterest.dominantStructures.clusters.clusterSize"}
                                    ]
                                },
                                {
                                    "title": "Aligned Structures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"key": "featuresOfInterest.dominantStructures.alignedStructures"}
                                    ]
                                },
                                {
                                    "title": "Grains",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"title": "Min Grain Size", "key": "featuresOfInterest.dominantStructures.grains.minGrainSize"},
                                        {"title": "Max Grain Size", "key": "featuresOfInterest.dominantStructures.grains.maxGrainSize"}
                                    ]
                                },
                                {
                                    "title": "Lamellar Structures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"key": "featuresOfInterest.dominantStructures.lamellarStructures"}
                                    ]
                                },
                                {
                                    "title": "Particles",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"title": "Particle Type", "key": "featuresOfInterest.dominantStructures.particles.particleType"},
                                        {"title": "Particle Shape", "key": "featuresOfInterest.dominantStructures.particles.particleShape"},
                                        {"title": "Min Particle Size", "key": "featuresOfInterest.dominantStructures.particles.minParticleSize"},
                                        {"title": "Max Particle Size", "key": "featuresOfInterest.dominantStructures.particles.maxParticleSize"}
                                    ]
                                },
                                {
                                    "title": "Porous Structures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"title": "Porosity", "key": "featuresOfInterest.dominantStructures.porousStructures.porosity"},
                                        {"title": "Percolated", "key": "featuresOfInterest.dominantStructures.porousStructures.percolated"},
                                        {"title": "Min Pore Size", "key": "featuresOfInterest.dominantStructures.porousStructures.minPoreSize"},
                                        {"title": "Max Pore Size", "key": "featuresOfInterest.dominantStructures.porousStructures.maxPoreSize"}
                                    ]
                                },
                                {
                                    "title": "Crystal Structures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {"title": "Crystallinity", "key": "featuresOfInterest.dominantStructures.crystalStructures.crystallinity"},
                                        {"title": "Twinned", "key": "featuresOfInterest.dominantStructures.crystalStructures.twinned"},
                                        {"title": "Scale", "key": "featuresOfInterest.dominantStructures.crystalStructures.scale"}
                                    ]
                                },
                                {
                                    "title": "Nanostructures",
                                    "type": "advancedfieldset", 
                                    "htmlClass": "myclass",
                                    "items":
                                    [
                                        {
                                            "title": "Nanoparticles",
                                            "type": "fieldset",
                                            "htmlClass": "myclass",
                                            "items":
                                            [
                                                {"title": "Particle Shape", "key": "featuresOfInterest.dominantStructures.nanostructures.nanoparticles.particleShape"},
                                                {"title": "Min Particle Size", "key": "featuresOfInterest.dominantStructures.nanostructures.nanoparticles.minParticleSize"},
                                                {"title": "Max Particle Size", "key": "featuresOfInterest.dominantStructures.nanostructures.nanoparticles.maxParticleSize"}
                                            ]
                                        },
                                        {
                                            "title": "Nanowires",
                                            "type": "fieldset",
                                            "htmlClass": "myclass",
                                            "items":
                                            [
                                                {"title": "Diameter", "key": "featuresOfInterest.dominantStructures.nanostructures.nanowires.diameter"},
                                                {"title": "Aspect Ratio", "key": "featuresOfInterest.dominantStructures.nanostructures.nanowires.aspectRatio"}
                                            ]
                                        },
                                        {
                                            "title": "Nanosheets",
                                            "type": "fieldset",
                                            "htmlClass": "myclass",
                                            "items":
                                            [
                                                {"title": "Thickness", "key": "featuresOfInterest.dominantStructures.nanostructures.nanosheets.thickness"},
                                                {"title": "Aspect Ratio", "key": "featuresOfInterest.dominantStructures.nanostructures.nanosheets.aspectRatio"}
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
            "title": "Sample Description",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Expiration Date", "key": "sampleDescription.expirationDate"},
                {"title": "Sample Chemical Formula", "key": "sampleDescription.sampleChemicalFormula"},
                {"title": "Sample CAS Number", "key": "sampleDescription.sampleCASNumber"},
                {"title": "Sample Materials Data Sheet", "key": "sampleDescription.sampleMaterialDataSheet"},
                {
                    "type": "section",
                    "items":
                    [
                        {"title": "Sample Visible Elements", "key": "sampleDescription.sampleVisibleElements.visibleElementsOptions", "type": "checkboxes"},
                        {"title": "Other Visible Elements", "key": "sampleDescription.sampleVisibleElements.otherVisibleElements"}
                    ]
                },
                {
                    "title": "Sample Shape",
                    "description": "(Optional) - Shape of the sample. Relevant in case of solid/mixture samples",
                    "type": "fieldset", 
                    "htmlClass": "myclass",
                    "items":
                    [
                        {"title": "One choice is allowed", "key": "sampleDescription.sampleShape.shapeOptions", "type": "radios"},
                        {
                            "title": "Sheet",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Sheet Type", "key": "sampleDescription.sampleShape.sheet.sheetType"},
                                {"title": "Sheet Thickness", "key": "sampleDescription.sampleShape.sheet.sheetThickness"},
                                {"title": "Aspect Ratio", "key": "sampleDescription.sampleShape.sheet.aspectRatio"}
                            ]
                        },
                        {
                            "title": "Layer",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Layer Type", "key": "sampleDescription.sampleShape.layer.layerType"},
                                {"title": "Layer Thickness", "key": "sampleDescription.sampleShape.layer.layerThickness"},
                                {"title": "Interlayer Spacing", "key": "sampleDescription.sampleShape.layer.interlayerSpacing"},
                                {"title": "Number of Layers", "key": "sampleDescription.sampleShape.layer.numberOfLayers"}
                            ]
                        },
                        {
                            "title": "Wire",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Wire Diameter", "key": "sampleDescription.sampleShape.wire.diameter"},
                                {"title": "Aspect Ratio", "key": "sampleDescription.sampleShape.wire.aspectRatio"}
                            ]
                        }
                    ]
                },
                {
                    "title": "Sample Size",
                    "description":  "(Optional) - Size of the sample. Relevant in case of solid/mixture samples. Mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Not intended to be used for the container of a liquid/gasous sample (use holder or carrier size in this case).",
                    "type": "fieldset", 
                    "htmlClass": "myclass",
                    "items":
                    [
                        {"title": "Size x", "key": "sampleDescription.sampleSize.sizeX"},
                        {"title": "Size y", "key": "sampleDescription.sampleSize.sizeY"},
                        {"title": "Size z", "key": "sampleDescription.sampleSize.sizeZ"}
                    ]
                },
                {"title": "Sample Mass", "key": "sampleDescription.sampleMass"},
                {"title": "Sample Volume", "key": "sampleDescription.sampleVolume"},
                {
                    "title": "Sample Gas Pressure", 
                    "type": "selectfieldset", 
                    "htmlClass": "myclass",
                    "titleMap": 
                    {
                        "qualitative": "Quantitative",
                        "quantitative": "Qualitative"
                    },
                    "items":
                    [
                        {"title": "Quantitative", "key": "sampleDescription.gasPressure.quantitative"},
                        {"title": "Qualitative", "key": "sampleDescription.gasPressure.qualitative"}
                    ]
                },
                {
                    "title": "Sample Surface Roughness", 
                    "type": "selectfieldset", 
                    "htmlClass": "myclass",
                    "titleMap": 
                    {
                        "qualitative": "Quantitative",
                        "quantitative": "Qualitative"
                    },
                    "items":
                    [
                        {"title": "Quantitative", "key": "sampleDescription.sampleSurfaceRoughness.quantitative"},
                        {"title": "Qualitative", "key": "sampleDescription.sampleSurfaceRoughness.qualitative"}
                    ]
                }
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
                                {"title": "Gloves", "key": "sampleHandlingPrecaution.sampleHandling.gloves"},
                                {"title": "Shock Protection", "key": "sampleHandlingPrecaution.sampleHandling.shockProtection"},
                                {"title": "No Tweezers Regions", "key": "sampleHandlingPrecaution.sampleHandling.noTweezersRegions"},
                                {"title": "Clean Room Conditions", "key": "sampleHandlingPrecaution.sampleHandling.cleanRoomConditions"},
                                {"title": "Min Humidity", "key": "sampleHandlingPrecaution.sampleHandling.minHumidity"},
                                {"title": "Max Humidity", "key": "sampleHandlingPrecaution.sampleHandling.maxHumidity"},
                                {"title": "Gas Atmosphere", "key": "sampleHandlingPrecaution.sampleHandling.gasAtmosphere.gasAtmosphereOptions", "type": "radios"},
                                {"title": "Other Gas Atmosphere","key": "sampleHandlingPrecaution.sampleHandling.gasAtmosphere.otherGasAtmosphere"},
                                {"title": "Additional Notes", "key": "sampleHandlingPrecaution.sampleHandling.additionalNotes"},
                            ]
                        },
                        {
                            "title": "Storage Conditions",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Min Storage Temperature", "key": "sampleHandlingPrecaution.storageConditions.minStorageTemperature"},
                                {"title": "Max Storage Temperature", "key": "sampleHandlingPrecaution.storageConditions.maxStorageTemperature"},
                                {
                                    "title": "Storage Pressure", 
                                    "type": "selectfieldset", 
                                    "htmlClass": "myclass",
                                    "titleMap": 
                                    {
                                        "qualitative": "Quantitative",
                                        "quantitative": "Qualitative"
                                    },
                                    "items":
                                    [
                                        {"title": "Quantitative", "key": "sampleHandlingPrecaution.storageConditions.storagePressure.quantitative"},
                                        {"title": "Qualitative", "key": "sampleHandlingPrecaution.storageConditions.storagePressure.qualitative"}
                                    ]
                                },
                                {"title": "Min Storage Humidity", "key": "sampleHandlingPrecaution.storageConditions.minStorageHumidity"},
                                {"title": "Max Storage Humidity", "key": "sampleHandlingPrecaution.storageConditions.maxStorageHumidity"},
                                {"title": "Storage Gas Atmosphere", "key": "sampleHandlingPrecaution.storageConditions.storageGasAtmosphere.storageGasAtmosphereOptions", "type": "radios"},
                                {"title": "Other Storage Gas Atmosphere","key": "sampleHandlingPrecaution.storageConditions.storageGasAtmosphere.otherStorageGasAtmosphere"},
                                {
                                    "title": "Storage Equipment", 
                                    "key": "sampleHandlingPrecaution.storageConditions.storageEquipment.storageEquipmentOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Other Storage Equipment", "key": "sampleHandlingPrecaution.storageConditions.storageEquipment.otherStorageEquipment"},
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
                {"title": "User Name", "key": "samplePreparation.researchUser.userName"},
                {"title": "User Role", "key": "samplePreparation.researchUser.userRole", "type": "radios"},
                {"title": "Sample Preparation Date", "key": "samplePreparation.preparationDate"},
                {
                    "title": "Use the + to insert each Sample Preparation Action",
                    "type": "array",
                    "htmlClass": "myclass",
                    "items": 
                    [
                        {
                            "type": "selectfieldset",
                            "title": "Sample Preparation Action",
                            "key": "samplePreparation.preparationMethod[].preparationAction",
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
                {"title": "Other Sample Holder Type", "key": "sampleHolder.otherHolderType"},
                {"title": "Sample Holder size x",  "key": "sampleHolder.sampleHolderSize.sizeX"},
                {"title": "Sample Holder size y",  "key": "sampleHolder.sampleHolderSize.sizeY"},
                {"title": "Sample Holder size z",  "key": "sampleHolder.sampleHolderSize.sizeZ"},
                {"title": "Sample Holder Description", "key": "sampleHolder.sampleHolderDescription"},
                {"title": "Fixing Method", "key": "sampleHolder.fixingMethod"},
                {"title": "Other Fixing Method", "key": "sampleHolder.otherFixingMethod"}
            ]
        },
        {
            "legend": "Sample Carrier",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Sample Carrier Type", "key": "sampleCarrier.sampleCarrierType"},
                {"title": "Sample Carrier size x",  "key": "sampleCarrier.sampleCarrierSize.sizeX"},
                {"title": "Sample Carrier size y",  "key": "sampleCarrier.sampleCarrierSize.sizeY"},
                {"title": "Sample Carrier size z",  "key": "sampleCarrier.sampleCarrierSize.sizeZ"},
                {"title": "Sample Carrier Description", "key": "sampleCarrier.sampleCarrierDescription"},
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