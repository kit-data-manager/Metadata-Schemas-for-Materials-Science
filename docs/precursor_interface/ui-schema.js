var uiSchema = {
    "type": "fieldset",
    "items":
    [
        {
            "legend": "Precursor Identification",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items": 
            [
                {"title": "Precursor Name", "key": "precursorIdentification.precursorName"},
                {"title": "Precursor Producer", "key": "precursorIdentification.precursorProducer"},
                {"title": "Precursor Purpose", "key": "precursorIdentification.precursorPurpose.precursorPurposeOptions", "type": "checkboxes"},
                {"title": "Other Precursor Purpose", "key": "precursorIdentification.precursorPurpose.otherPrecursorPurpose"},
                {
                    "title": "Precursor ID",
                    "type": "advancedfieldset", 
                    "htmlClass": "myclass",
                    "items":
                    [
                        {"title": "Precursor ID Value", "key": "precursorIdentification.precursorID.precursorIDValue"},
                        {"title": "Precursor ID Type", "key": "precursorIdentification.precursorID.precursorIDType", "type": "radios"},
                        {"title": "Other Precursor ID Type", "key": "precursorIdentification.precursorID.otherPrecursorIDType"},
                        {"title": "Precursor ID Position", "key": "precursorIdentification.precursorID.precursorIDPosition","type": "checkboxes"}
                    ]
                }    
            ]
        },
        {
            "legend": "Precursor Characteristics",
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
                                {"title": "One choice is allowed", "key": "precursorCharacteristics.phaseOfMatter", "type": "radios"}
                            ]
                        },
                        {
                            "title": "Material Type",
                            "type": "tab",
                            "items": 
                            [
                                {"title": "One choice is allowed", "key": "precursorCharacteristics.materialType", "type": "radios"}
                            ]
                        },
                        {
                            "title": "Material Properties",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Multiple choice is allowed", "key": "precursorCharacteristics.materialProperties.propertiesOptions", "type": "checkboxes"},
                                {"title": "otherMaterialProperties", "key": "precursorCharacteristics.materialProperties.otherMaterialProperties"}
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
            "title": "Precursor Description",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Precursor Expiration Date", "key": "precursorDescription.expirationDate"},
                {"title": "Precursor Chemical Formula", "key": "precursorDescription.precursorChemicalFormula"},
                {"title": "Precursor CAS Number", "key": "precursorDescription.precursorCASNumber"},
                {"title": "Precursor Materials Data Sheet", "key": "precursorDescription.precursorMaterialDataSheet"},
                {
                    "type": "section",
                    "items":
                    [
                        {"title": "Precursor Visible Elements", "key": "precursorDescription.precursorVisibleElements.visibleElementsOptions", "type": "checkboxes"},
                        {"title": "Other Visible Elements", "key": "precursorDescription.precursorVisibleElements.otherVisibleElements"}
                    ]
                },
                {
                    "title": "Precursor Shape",
                    "description": "(Optional) - Shape of the Precursor. Relevant in case of solid/mixture Precursors.",
                    "type": "fieldset", 
                    "htmlClass": "myclass",
                    "items":
                    [
                        {"title": "One choice is allowed", "key": "precursorDescription.precursorShape.shapeOptions", "type": "radios"},
                        {
                            "title": "Sheet",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Sheet Type", "key": "precursorDescription.precursorShape.sheet.sheetType"},
                                {"title": "Sheet Thickness", "key": "precursorDescription.precursorShape.sheet.sheetThickness"},
                                {"title": "Aspect Ratio", "key": "precursorDescription.precursorShape.sheet.aspectRatio"}
                            ]
                        },
                        {
                            "title": "Layer",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Layer Type", "key": "precursorDescription.precursorShape.layer.layerType"},
                                {"title": "Layer Thickness", "key": "precursorDescription.precursorShape.layer.layerThickness"},
                                {"title": "Interlayer Spacing", "key": "precursorDescription.precursorShape.layer.interlayerSpacing"},
                                {"title": "Number of Layers", "key": "precursorDescription.precursorShape.layer.numberOfLayers"}
                            ]
                        },
                        {
                            "title": "Wire",
                            "type": "advancedfieldset",
                            "htmlClass": "myclass",
                            "items":
                            [
                                {"title": "Wire Diameter", "key": "precursorDescription.precursorShape.wire.diameter"},
                                {"title": "Aspect Ratio", "key": "precursorDescription.precursorShape.wire.aspectRatio"}
                            ]
                        }
                    ]
                },
                {
                    "title": "Precursor Size",
                    "description":  "(Optional) - Size of the Precursor. Relevant in case of solid/mixture Precursors. Mainly needed to evaluate whether the Precursor fits into a certain Instrument or Equipment. Regardless of the shape, the Precursor size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Not intended to be used for the container of a liquid/gasous Precursor (use holder or carrier size in this case).",
                    "type": "fieldset", 
                    "htmlClass": "myclass",
                    "items":
                    [
                        {"title": "Size x", "key": "precursorDescription.precursorSize.sizeX"},
                        {"title": "Size y", "key": "precursorDescription.precursorSize.sizeY"},
                        {"title": "Size z", "key": "precursorDescription.precursorSize.sizeZ"}
                    ]
                },
                {"title": "Precursor Mass", "key": "precursorDescription.precursorMass"},
                {"title": "Precursor Volume", "key": "precursorDescription.precursorVolume"},
                {
                    "title": "Precursor Gas Pressure", 
                    "type": "selectfieldset", 
                    "htmlClass": "myclass",
                    "titleMap": 
                    {
                        "qualitative": "Quantitative",
                        "quantitative": "Qualitative"
                    },
                    "items":
                    [
                        {"title": "Quantitative", "key": "precursorDescription.gasPressure.quantitative"},
                        {"title": "Qualitative", "key": "precursorDescription.gasPressure.qualitative"}
                    ]
                },
                {
                    "title": "Precursor Surface Roughness", 
                    "type": "selectfieldset", 
                    "htmlClass": "myclass",
                    "titleMap": 
                    {
                        "qualitative": "Quantitative",
                        "quantitative": "Qualitative"
                    },
                    "items":
                    [
                        {"title": "Quantitative", "key": "precursorDescription.precursorSurfaceRoughness.quantitative"},
                        {"title": "Qualitative", "key": "precursorDescription.precursorSurfaceRoughness.qualitative"}
                    ]
                }
            ]
        },
        {
            "legend": "Precursor Handling Precaution",
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
                                    "title": "The Precursor is sensitive to", 
                                    "key": "precursorHandlingPrecaution.sensitivityAgainst.sensitivityList",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "precursorHandlingPrecaution.sensitivityAgainst.comments"}
                            ]
                        },
                        {
                            "title": "Safety Information",
                            "type": "tab",
                            "items":
                            [
                                {
                                    "title": "Hazard", 
                                    "key": "precursorHandlingPrecaution.safetyInfo.hazard",
                                    "type": "checkboxes"
                                },
                                {"title": "Comments", "key": "precursorHandlingPrecaution.safetyInfo.comments"}
                            ]
                        },
                        {
                            "title": "Precursor Handling",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Gloves", "key": "precursorHandlingPrecaution.precursorHandling.gloves"},
                                {"title": "Shock Protection", "key": "precursorHandlingPrecaution.precursorHandling.shockProtection"},
                                {"title": "No Tweezers Regions", "key": "precursorHandlingPrecaution.precursorHandling.noTweezersRegions"},
                                {"title": "Clean Room Conditions", "key": "precursorHandlingPrecaution.precursorHandling.cleanRoomConditions"},
                                {"title": "Min Humidity", "key": "precursorHandlingPrecaution.precursorHandling.minHumidity"},
                                {"title": "Max Humidity", "key": "precursorHandlingPrecaution.precursorHandling.maxHumidity"},
                                {
                                    "title": "Gas Atmosphere", 
                                    "key": "precursorHandlingPrecaution.precursorHandling.gasAtmosphere.gasAtmosphereOptions", 
                                    "type": "checkboxes"
                                },
                                {"title": "Other Gas Atmosphere","key": "precursorHandlingPrecaution.precursorHandling.gasAtmosphere.otherGasAtmosphere"},
                                {"title": "Additional Notes", "key": "precursorHandlingPrecaution.precursorHandling.additionalNotes"},
                            ]
                        },
                        {
                            "title": "Storage Conditions",
                            "type": "tab",
                            "items":
                            [
                                {"title": "Min Storage Temperature", "key": "precursorHandlingPrecaution.storageConditions.minStorageTemperature"},
                                {"title": "Max Storage Temperature", "key": "precursorHandlingPrecaution.storageConditions.maxStorageTemperature"},
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
                                        {"title": "Quantitative", "key": "precursorHandlingPrecaution.storageConditions.storagePressure.quantitative"},
                                        {"title": "Qualitative", "key": "precursorHandlingPrecaution.storageConditions.storagePressure.qualitative"}
                                    ]
                                },
                                {"title": "Min Storage Humidity", "key": "precursorHandlingPrecaution.storageConditions.minStorageHumidity"},
                                {"title": "Max Storage Humidity", "key": "precursorHandlingPrecaution.storageConditions.maxStorageHumidity"},
                                {
                                    "title": "Storage Gas Atmosphere", 
                                    "key": "precursorHandlingPrecaution.storageConditions.storageGasAtmosphere.storageGasAtmosphereOptions", 
                                    "type": "checkboxes"
                                },
                                {"title": "Other Storage Gas Atmosphere","key": "precursorHandlingPrecaution.storageConditions.storageGasAtmosphere.otherStorageGasAtmosphere"},
                                {
                                    "title": "Storage Equipment", 
                                    "key": "precursorHandlingPrecaution.storageConditions.storageEquipment.storageEquipmentOptions",
                                    "type": "checkboxes"
                                },
                                {"title": "Other Storage Equipment", "key": "precursorHandlingPrecaution.storageConditions.storageEquipment.otherStorageEquipment"},
                                {"title": "Additional Notes", "key": "precursorHandlingPrecaution.storageConditions.additionalNotes"}
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
                {"title": "Use the + to insert each Precursor Parent", "key": "parents"}
            ]
        },
        {
            "legend": "Fabrication",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "User Name", "key": "fabrication.researchUser.userName"},
                {"title": "User Role", "key": "fabrication.researchUser.userRole", "type": "radios"},
                {"title": "Fabrication Date", "key": "fabrication.fabricationDate"},
                {
                    "title": "Use the + to insert each Fabrication Action",
                    "type": "array",
                    "htmlClass": "myclass",
                    "items": 
                    [
                        {
                            "type": "selectfieldset",
                            "title": "Fabrication Action",
                            "key": "fabrication.fabricationMethod[].fabricationAction",
                            "items": 
                            [
                                "fabrication.fabricationMethod[].notApplicable", 
                                "fabrication.fabricationMethod[].annealingHomogenization",
                                "fabrication.fabricationMethod[].depositionCoating",
                                "fabrication.fabricationMethod[].joining",
                                "fabrication.fabricationMethod[].mechanicalAndSurface",
                                "fabrication.fabricationMethod[].reactive",
                                "fabrication.fabricationMethod[].other"
                            ]
                        },
                    ]
                },
                {"title": "Fabrication Description", "key": "fabrication.fabricationDescription"},
                {"title": "Fabrication File", "key": "fabrication.fabricationHistoryFile"},
                {"title": "Fabrication File Reference", "key": "fabrication.fabricationHistoryFileReference"}
            ]
        },
        {
            "title": "Precursor Referencing",
            "type": "fieldset",
            "htmlClass": "myclass",
            "items":
            [
                {"title": "Axis Orientation", "key": "precursorReferencing.axisOrientation"},
                {
                    "type": "selectfieldset",
                    "title": "Coordinate System",
                    "key": "precursorReferencing.precursorReference",
                    "titleMap":
                    {
                        "notApplicable": "Not applicable",
                        "cartesian": "Cartesian",
                        "polar": "Polar",
                        "other": "Other (please add in the comments)"
                    },
                    "items": 
                    [
                        "precursorReferencing.notApplicable",
                        "precursorReferencing.cartesian",
                        "precursorReferencing.polar",
                        "precursorReferencing.other"
                    ]
                },
                {"title": "Comments", "key": "precursorReferencing.comments"}
            ]
        }
    ]
}