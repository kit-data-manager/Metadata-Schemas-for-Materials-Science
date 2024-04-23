var dataModel = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "precursor_schema",
    "description":"Basic schema for precursor description. It can be extended. According to the MDMC-NEP glossary, a Precursor is a Physical System (typically a piece of material) which is formed or manufactured during the Fabrication and is used during the Sample Preparation to produce a Sample. It may include one or more substrates, layers, masks, evaporation materials, coatings and/or molecules. A single Precursor might itself become the only Sample Component of a Sample in case it undergoes a Measurement.",
    "type":"object",
    "$defs":
    {
        "cartesianType":
        {
            "type": "array",
            "title": "cartesian coordinates",
            "items":
            {
                "type": "object",
                "properties": 
                {
                    "pointName": 
                    {
                        "description": "Name of the point, for reference. E.g., P0 (usually the zero point of the coordinate system), P1, P2, P3",
                        "type": "string"
                    },
                    "coordinates":
                    {
                        "type": "object",
                        "properties":
                        {
                            "x": {"type": "string"},
                            "y": {"type": "string"},
                            "z": {"type": "string"}
                        }
                    }
                }
            }
        },
        "polarType":
        {
            "type": "array",
            "title": "polar coordinates",
            "items":
            {
                "type": "object",
                "properties":
                {
                    "pointName": 
                    {
                        "description": "Name of the point, for reference. E.g., P0 (usually the zero point of the coordinate system), P1, P2, P3",
                        "type": "string"
                    },
                    "coordinates":
                    {
                        "type": "object",
                        "properties":
                        {
                            "radius": {"type": "string"},
                            "theta": {"type": "string"},
                            "phi": {"type": "string"}
                        }
                    }
                }
            }
        },
        "noneType": 
        {
            "type": "object",
            "properties": {}
        },
        "otherType": 
        {
            "type": "object",
            "properties": {}
        }
    },
    "properties": 
    {
        "precursorIdentification":
        {
            "type": "object",
            "properties":
            {
                "precursorName": 
                {
                    "description": "(Required) - Name of the Precursor",
                    "type": "string"
                },
                "precursorProducer":
                {
                    "description": "(Required) - Producer or vendor of the Precursor, depending on whether the precursor is produced in the lab by one or more research group members or is bought from a vendor. If it is preferred to avoid the name of the group member, self or own can be used as precursorProducer",
                    "type": "string"
                },
                "precursorPurpose":
                {
                    "type": "object",
                    "properties":
                    {
                        "precursorPurposeOptions":
                        {
                            "description": "(Required) - The tentative purpose of the Precursor (e.g., for which Sample Preparation, Measurement(s) or subsequent Analysis the precursor was fabricated). In this context, Correlative Characterization may be intended as a purpose. Multiple selection is allowed.",
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "assessment (to given categories or values)",
                                    "completeness check (presence or absence of given properties)",
                                    "correlative characterization (dedicated sample treatment to emphasise given features)",
                                    "exploratory (routine check of known properties)",
                                    "feasibility (quick check, rough estimate)",
                                    "high quality measurement (precise, careful treatment)",
                                    "test specific hypothesis (focus only on given aspects)" ,
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "otherPrecursorPurpose": {"type": "string"}
                    }
                },
                "precursorID":
                {
                    "type": "object",
                    "properties":
                    {
                        "precursorID": 
                        {
                            "description": "(Optional) - Identifier of the Precursor. The naming is not univocal among laboratories, thus the conventions may differ. It may be the internal ID or the number on the box containing the Precursor; in other cases a convention is established. The choice of how to identify a specific Precursor is given to the laboratory.",
                            "type": "string"
                        },
                        "precursorIDType":
                        {
                            "description": "(Optional) - Type of identifier of the Precursor.",
                            "type": "string",
                            "enum":
                            [
                                "not applicable",
                                "text",
                                "code",
                                "value",
                                "other (please specify in the comment)"
                            ]
                        },
                        "otherPrecursorIDType": {"type": "string"},
                        "precursorIDPosition":
                        {
                            "description": "(Optional) - The Precursor might have an ID printed on it. It's important to know its position on the Precursor. Multiple selection is allowed.",
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "not applicable",
                                    "top",
                                    "bottom",
                                    "right",
                                    "left",
                                    "front side",
                                    "back side"
                                ]
                            }
                        }
                    }    
                }
            },
            "required": ["precursorName", "precursorProducer", "precursorPurpose"]
        },
        "precursorCharacteristics":
        {
            "type": "object",
            "properties":
            {
                "phaseOfMatter":
                {
                    "description": "(Recommended) - A matter object throughout which all physical properties of a material are essentially uniform.",
                    "type": "string",
                    "enum": 
                    [
                        "not applicable",
                        "solid - definition: https://en.wikipedia.org/wiki/Solid",
                        "liquid - definition: https://en.wikipedia.org/wiki/Liquid",
                        "gas - definition: https://en.wikipedia.org/wiki/Gas",
                        "plasma - definition: https://en.wikipedia.org/wiki/Plasma_(physics)",
                        "mixture - definition: https://en.wikipedia.org/wiki/Mixture"
                    ]
                },
                "materialType": 
                {
                    "description": "(Recommended) - Main group, characterized by common basic attributes, the material can be assigned to.",
                    "type": "string",
                    "enum":
                    [
                        "notApplicable",
                        "alloy",
                        "biological",
                        "biomaterial",
                        "ceramic",
                        "composite",
                        "glass",
                        "metal",
                        "metamaterial",
                        "molecularFluid",
                        "organicCompound",
                        "organometallic",
                        "polymer",
                        "smartMaterial"
                    ]
                },
                "materialProperties":
                {
                    "description": "(Recommended) - One or more known properties of the material.",
                    "type": "object",
                    "properties":
                    {
                        "propertiesOptions":
                        {
                            "description": "(Recommended) - One or more known properties of the material.",
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "diamagnetic",
                                    "paramagnetic",
                                    "ferromagnetic",
                                    "antiferromagnetic",
                                    "ferrimagnetic",
                                    "nonmagnetic",
                                    "conductor",
                                    "semiconductor",
                                    "superconductor",
                                    "insulator",
                                    "dielectric",
                                    "other (please add in the comment)"
                                ]
                            }
                        },
                        "otherMaterialProperties": {"type": "string"}
                    }
                }
            }
        },
        "featuresOfInterest":
        {
            "type": "object",
            "properties":
            {
                "functionalTest":
                {
                    "type": "object",
                    "properties":
                    {
                        "specifiedElements":
                        {
                            "type": "array",
                            "items": {"type": "string"}
                        }
                    }
                },
                "defects":
                {
                    "type": "object",
                    "properties": 
                    {
                        "defectsOptions":
                        {
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "cracks",
                                    "crazes",
                                    "inclusions",
                                    "pores",
                                    "voids",
                                    "dislocations",
                                    "antisite defects",
                                    "interstitial defects",
                                    "topological defects",
                                    "vacancies",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}   
                    }
                },
                "interfaces":
                {
                    "type": "object",
                    "properties": 
                    {
                        "interfacesOptions":
                        {
                            "description": "(Optional)- Bidimensional region through which a discontinuity occurs in one or more parameter of the material",
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "antiphase boundaries",
                                    "grain boundaries",
                                    "magnetic domain walls",
                                    "matrix-fiber interfaces",
                                    "matrix-particle interfaces",
                                    "phase boundaries",
                                    "stacking faults",
                                    "surfaces",
                                    "twin boundaries",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
                    }
                },
                "dominantStructures":
                {
                    "type": "object",
                    "properties":
                    {
                        "reinforcementStructures":
                        {
                            "description": " (Optional) - Constituent of a composite material which increases its stiffness and tensile strength.",
                            "type": "object",
                            "properties":
                            {
                                "reinforcingMaterial": 
                                {
                                    "description": "(Optional) - Material supplied as reinforcement.",
                                    "type": "string"
                                },
                                "scale":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "atomic/molecular",
                                        "nanoscopic",
                                        "microscopic",
                                        "mesoscopic",
                                        "macroscopic"
                                    ]
                                }
                            }
                        },
                        "clusters":
                        {
                            "description": "(Optional) - Aggregates of atoms, molecules, ions which adhere together under e.g. van der Waals forces, ionic forces, covalent bonds, metallic bonds, whose properties differ from those of the corresponding bulk.",
                            "type": "object",
                            "properties":
                            {
                                "clusterComponents":
                                {
                                    "description": " (Optional) - Constituent of the clusters.",
                                    "type": "string"
                                },
                                "clusterSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                }  
                            }
                        },
                        "alignedStructures":
                        {
                            "description": "Type of arrangement where the constituent elements, such as molecules, particles, fibers, or crystallites, are organized in a specific direction or orientation",
                            "type": "object",
                            "properties":
                            {
                                "alignedElements":
                                {
                                    "description": "(Optional) - Constituent of the aligned structure.",
                                    "type": "string"
                                },
                                "scale":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "atomic/molecular",
                                        "nanoscopic",
                                        "microscopic",
                                        "mesoscopic",
                                        "macroscopic"
                                    ]
                                }   
                            }
                        },
                        "grains":
                        {
                            "description": "Also referred as crystallites. Small crystals within a polycrystalline material which form e.g. during the cooling",
                            "type": "object",
                            "properties":
                            {
                                "minGrainSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "maxGrainSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "lamellarStructures":
                        {
                            "description": "Structures composed of fine, alternating layers of different materials in the form of lamellae",
                            "type": "object",
                            "properties":
                            {
                                "scale":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "atomic/molecular",
                                        "nanoscopic",
                                        "microscopic",
                                        "mesoscopic",
                                        "macroscopic"
                                    ]
                                }
                            }   
                        },
                        "particles":
                        {
                            "description": "Small localized units of matter",
                            "type": "object",
                            "properties":
                            {
                                "particleType":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "solid (fleks)",
                                        "liquid (droplets)",
                                        "gaseous (bubbles)"
                                    ]
                                },
                                "particleShape":
                                {
                                    "type": "string"
                                },
                                "minParticleSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "maxParticleSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "porousStructures":
                        {
                            "type": "object",
                            "properties": 
                            {
                                "porosity": 
                                {
                                    "description": "(Optional) - Fraction of the volume of voids over the total volume between 0 (no voids) and 1 (all voids). Also referred as void fraction. ",
                                    "type": "number"
                                },
                                "percolated":
                                {
                                    "description": "(Optional) - A substance (such as a liquid, gas, or particles) passes through a porous material or medium",
                                    "type": "boolean"
                                },
                                "minPoreSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "maxPoreSize": 
                                {
                                    "type": "object",
                                    "properties": 
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "crystalStructures":
                        {
                            "type": "object",
                            "properties":
                            {
                                "crystallinity":
                                {
                                    "description": "(Optional) - Degree of structural order in a solid.",
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "crystalline/single crystal",
                                        "polycrystalline",
                                        "semicrystalline",
                                        "non-crystalline/amorphous"
                                    ]
                                },
                                "twinned": 
                                {
                                    "description": "(Optional) - Two separate crystal domains share some of the same crystal lattice points in a symmetrical manner",
                                    "type": "boolean"
                                },
                                "scale":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "atomic/molecular",
                                        "nanoscopic",
                                        "microscopic",
                                        "mesoscopic",
                                        "macroscopic"
                                    ]
                                }
                            }
                        },
                        "nanostructures":
                        {
                            "description": "",
                            "type": "object",
                            "properties":
                            {
                                "nanoparticles":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "particleShape":
                                        {
                                            "type": "string"
                                        },
                                        "minParticleSize": 
                                        {
                                            "type": "object",
                                            "properties": 
                                            {
                                                "value": {"type": "number"},
                                                "unit": {"type": "string"}
                                            }
                                        },
                                        "maxParticleSize": 
                                        {
                                            "type": "object",
                                            "properties": 
                                            {
                                                "value": {"type": "number"},
                                                "unit": {"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "nanowires":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "diameter":
                                        {
                                            "type": "object",
                                            "properties":
                                            {
                                                "value": {"type": "number"},
                                                "unit": {"type": "string"}
                                            }
                                        },
                                        "aspectRatio":
                                        {
                                            "description": "(Optional) - Ratio of the lenght to the diameter.",
                                            "type": "number"
                                        }
                                    }
                                },
                                "nanosheets":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "thickness":
                                        {
                                            "type": "object",
                                            "properties":
                                            {
                                                "value": {"type": "number"},
                                                "unit": {"type": "string"}
                                            }
                                        },
                                        "aspectRatio":
                                        {
                                            "description": "(Optional) - Ratio of the lateral dimension to sheet thickness.",
                                            "type": "number"
                                        }
                                    }
                                }
                            }    
                        }
                    }
                }
            }
        },
        "precursorDescription":
        {
            "type": "object",
            "properties":
            {
                "expirationDate": 
                {
                    "description": "(Optional) - Precursor expiration date, if any. Relevant in case of biological Precursors.",
                    "type":"string",
                    "format": "date"
                },
                "precursorChemicalFormula":
                    {
                        "description": "(Recommended) - Chemical formula of the Precursor",
                        "type": "string"
                    },
                    "precursorCASNumber":
                    {
                        "description": "(Optional) - CAS number of the Precursor, if known and applicable.",
                        "type": "string"
                    },
                    "precursorMaterialDataSheet":
                    {
                        "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                        "type": "string"
                    },
                "precursorVisibleElements":
                {
                    "description": "(Optional) - Elements (if any) useful e.g. for coarse alignement, which are visible by eye or with optical magnification equipment.",
                    "type": "object",
                    "properties":
                    {
                        "visibleElementsOptions":
                        {
                            "description": "(Optional) - One or more elements (if any) useful e.g. for coarse alignment, which are visible by eye or with optical magnification equipment.",
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "none",
                                    "pattern",
                                    "orientation",
                                    "fiducials",
                                    "sample ID",
                                    "other (please specify in the comment)"
                                ]
                            } 
                        },
                        "otherVisibleElements": {"type": "string"}
                    }   
                },
                "precursorShape":
                {
                    "description": "(Optional) - Shape of the solid/mixture Precursor.",
                    "type": "object",
                    "properties":
                    {
                        "shapeOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "bulk material",
                                "filament",
                                "pellet",
                                "powder",
                                "rod/bar"
                            ]
                        },
                        "sheet":
                        {
                            "type": "object",
                            "properties":
                            {
                                "sheetType":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "foil",
                                        "plate",
                                        "leaf"
                                    ]
                                },
                                "sheetThickness":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "aspectRatio":
                                {
                                    "description": "(Optional) - Ratio of the lateral dimension to sheet thickness.",
                                    "type": "number"
                                }
                            }
                        },
                        "layer": 
                        {
                            "type": "object",
                            "properties":
                            {
                                "layerType":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "monolayer",
                                        "thin film",
                                        "multilayer"
                                    ]
                                },
                                "layerThickness":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                }, 
                                "interlayerSpacing":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "numberOfLayers": {"type": "number"}
                            }
                        },
                        "wire": 
                        {
                            "type": "object",
                            "properties":
                            {
                                "diameter":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                },
                                "aspectRatio":
                                {
                                    "description": "(Optional) - Ratio of the lenght to the diameter.",
                                    "type": "number"
                                }
                            }
                        }
                    }
                },
                "precursorSize":
                {
                    "description":  "(Optional) - Size of the Precursor. Relevant in case of solid/mixture Precursors. Mainly needed to evaluate whether the Precursor fits into a certain Instrument or Equipment. Regardless of the shape, the Precursor size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Not intended to be used for the container of a liquid/gasous Precursor (use holder or carrier size in this case).",
                    "type": "object",
                    "properties":
                    {
                        "sizeX":
                        {
                            "description": "(Optional) - Size of the Precursor in the x dimension. Relevant in case of solid/mixture Precursors. Regardless of the shape, the Precursor size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX). Not intended to be used for the container of a liquid/gasous Precursor (use holder or carrier size in this case).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "sizeY":
                        {
                            "description": "(Optional) - Size of the Precursor in the y dimension. Relevant in case of solid/mixture Precursors. Regardless of the shape, the Precursor size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeY). Not intended to be used for the container of a liquid/gasous Precursor (use holder or carrier size in this case).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "sizeZ":
                        {
                            "description": "(Optional) - Size of the Precursor in the z dimension. Relevant in case of solid/mixture Precursor. Regardless of the shape, the Precursor size can be approximated (e.g. the hight of a cylinder can be indicated as sizeZ). Not intended to be used for the container of a liquid/gasous Precursor (use holder or carrier size in this case).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        }
                    }
                },
                "precursorMass": 
                {
                    "description": "(Optional) - Mass of the Precursor.",
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "precursorVolume": 
                {
                    "description": "(Optional) - Relevant for gas, liquid and powder.",
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "gasPressure":
                {
                    "description": "(Optional) - Only relevant for gas.",
                    "type": "object",
                    "properties":
                    {
                        "estimate": 
                        {
                            "type": "string",
                            "enum": 
                            [
                                "quantitative",
                                "qualitative"
                            ]
                        },
                        "quantitative":
                        {
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "qualitative":
                        {
                            "type": "string",
                            "enum": 
                            [
                                "non applicable",
                                "vacuum", 
                                "high vacuum", 
                                "ultra high vacuum"
                            ]
                        }
                    }
                },
                "precursorSurfaceRoughness":
                {
                    "description": "(Optional) - Quality of a surface of not being smooth.",
                    "type": "object",
                    "properties": 
                    {
                        "estimate":
                        {
                            "type": "string",
                            "enum": 
                            [
                                "quantitative",
                                "qualitative"
                            ]
                        },
                        "quantitative":
                        {
                            "type": "object",
                            "properties":
                            {
                                "amplitudeParameter":
                                {
                                    "description": "(Optional) - Parameter characterizing the surface based on the vertical deviations of the roughness profile from the mean line.",
                                    "type": "string",
                                    "enum":
                                    [
                                        "not applicable",
                                        "Ra",
                                        "Rq",
                                        "Rz"
                                    ]
                                },
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "qualitative":
                        {
                            "type": "string",
                            "enum": 
                            [
                                "not applicable",
                                "rough",
                                "smooth",
                                "polished"
                            ]
                        }
                    }
                }
            }
        },
        "precursorHandlingPrecaution":
        {
            "description": "(Optional) - Set of features about the Precursor which are important to know for handling it",
            "type": "object",
            "properties":
            {
                "sensitivityAgainst":
                {
                    "type": "object",
                    "properties":
                    {
                        "sensitivityList":
                        {
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "O2",
                                    "H2O/moisture",
                                    "N2",
                                    "organic solvents",
                                    "eBeam",
                                    "iBeam",
                                    "radiation",
                                    "shocks",
                                    "variations of temperature",
                                    "variations of air pressure",
                                    "variations of gas concentration",
                                    "variations of humidity",
                                    "other (please add in the comments)"
                                ]
                            }
                        },
                        "comments": {"type": "string"}
                    }
                },
                "safetyInfo":
                {
                    "type": "object",
                    "properties":
                    {
                        "hazard":
                        {
                            "type": "array",
                            "uniqueItems": true,
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "reactive",
                                    "radioactive",
                                    "oxidising",
                                    "corrosive",
                                    "contaminant",
                                    "combustive",
                                    "biohazard",
                                    "carcinogenic/mutagenic/teratogenic",
                                    "inflammable",
                                    "toxic or irritant",
                                    "explosive",
                                    "nanostructured/nanoparticles",
                                    "other (please add in the comments)"
                                ]
                            }
                        },
                        "comments": {"type": "string"}
                    }
                },
                "precursorHandling":
                {
                    "type": "object",
                    "properties":
                    {
                        "gloves":
                        {
                            "description": "(Optional) - The Precursor must be handled using gloves.",
                            "type": "boolean"
                        },
                        "shockProtection":
                        {
                            "description": "(Optional) - The Precursor must be protected against shocks.",
                            "type": "boolean"
                        },
                        "noTweezersRegions": 
                        {
                            "description": "(Optional) - Regions on the Precursor which cannot be touched or reached by tweezers.",
                            "type":"string"
                        },
                        "cleanRoomConditions": 
                        {
                            "description": "(Optional) - Specific clean room conditions under which the Precursor should be treated.",
                            "type":"string"
                        },
                        "minHumidity": 
                        {
                            "description": "(Optional) - Minimal humidity at which the Precursor should be handled.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "maxHumidity": 
                        {
                            "description": "(Optional) - Maximal humidity at which the Precursor should be handled.",
                            "type": "object",
                            "properties": 
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "gasAtmosphere": 
                        {
                            "description": "(Optional) - Type of inert gas required around the Precursor due e.g. to the presence of a reactive top layer.",
                            "type": "object",
                            "properties":
                            {
                                "gasAtmosphereOptions":
                                {
                                    "description": "(Optional) - Type of inert gas required around the Precursor to handle it, due e.g. to the presence of a reactive top layer.",
                                    "type":"array",
                                    "uniqueItems": true,
                                    "items":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "Not applicable",
                                            "air",
                                            "dry air",
                                            "vacuum",
                                            "Ar",
                                            "N",
                                            "other (please add in the comments)"
                                        ]
                                    }
                                },
                                "otherGasAtmosphere": {"type": "string"}                            
                            }
                        },
                        "additionalNotes": 
                        {
                            "description": "(Optional) - Any additional notes which might be relevant for Precursor handling",
                            "type": "string"
                        }
                    }
                },
                "storageConditions":
                {
                    "type": "object",
                    "properties":
                    {
                        "minStorageTemperature": 
                        {
                            "description": "(Optional) - Minimal temperature at which the Precursor should be stored.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "maxStorageTemperature": 
                        {
                            "description": "(Optional) - Maximal temperature at which the Precursor should be stored.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "storagePressure": 
                        {
                            "description": "(Optional) - Storage pressure, to be indicated only if different from gas pressure.",
                            "type": "object",
                            "properties":
                            {
                                "estimate": 
                                {
                                    "type": "string",
                                    "enum": 
                                    [
                                        "quantitative",
                                        "qualitative"
                                    ]
                                },
                                "quantitative":
                                {
                                    "type": "object",
                                    "properties":
                                    {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"}
                                    }
                                    
                                },
                                "qualitative":
                                {
                                    "type": "string",
                                    "enum": 
                                    [
                                        "non applicable",
                                        "vacuum", 
                                        "high vacuum", 
                                        "ultra high vacuum"
                                    ]
                                }
                            }
                        },
                        "minStorageHumidity": 
                        {
                            "description": "(Optional) - Minimal torage humidity, to be indicated only if different from the humidity required for Precursor handling.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "maxStorageHumidity": 
                        {
                            "description": "(Optional) - Maximal storage humidity, to be indicated only if different from the humidity required for Precursor handling.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "storageGasAtmosphere": 
                        {
                            "description": "(Optional) - Storage gas atmosphere, to be indicated only if different from the gas atmosphere required for Precursor handling.",
                            "type": "object",
                            "properties":
                            {
                                "storageGasAtmosphereOptions":
                                {
                                    "description": "(Optional) - Storage gas atmosphere, to be indicated only if different from the gas atmosphere required for Precursor handling.",
                                    "type":"array",
                                    "uniqueItems": true,
                                    "items":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "Not applicable",
                                            "air",
                                            "dry air",
                                            "vacuum",
                                            "Ar",
                                            "N",
                                            "other (please add in the comments)"
                                        ]
                                    }
                                },
                                "otherStorageGasAtmosphere": {"type": "string"}
                            }
                        },
                        "storageEquipment": 
                        {
                            "description": "(Optional) - One or more pieces of equipment used for storing the Precursor.",
                            "type": "object",
                            "properties":
                            {
                                "storageEquipmentOptions":
                                {
                                    "description": "(Optional) - One or more pieces of equipment used for storing the Precursor.",
                                    "type":"array",
                                    "uniqueItems": true,
                                    "items":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "None",
                                            "glove box",
                                            "fume hood",
                                            "dessicator",
                                            "open bench",
                                            "refrigerator",
                                            "freezer",
                                            "cryostat",
                                            "liquid N dewar",
                                            "drying oven",
                                            "UHV chamber",
                                            "other (please add in the comments)"
                                        ]
                                    }
                                },
                                "otherStorageEquipment": {"type": "string"}
                            }
                        },
                        "additionalNotes":
                        {
                            "description": "(Optional) - Any additional notes which might be relevant for storage conditions",
                            "type": "string"
                        }
                    }
                }
            }
        },
        "fabrication":
        {
            "type": "object",
            "properties":
            {
                "researchUser":
                {
                    "type": "object",
                    "properties":
                    {
                        "userName": {"type": "string"},
                        "userRole":
                        {
                            "type": "string",
                            "enum": ["Data Curator", "Instrument Scientist", "Team Leader", "Team Member"]
                        }
                    }
                },
                "fabricationDate":
                {
                    "description": "(Optional) - Date of fabrication",
                    "type": "string",
                    "format": "date"
                },
                "fabricationMethod":
                {
                    "type": "array",
                    "items":
                    {
                        "type": "object",
                        "properties":
                        {
                            "fabricationAction":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "notApplicable",
                                    "annealingHomogenization",
                                    "depositionCoating",
                                    "joining",
                                    "mechanicalAndSurface",
                                    "reactive",
                                    "other (please add in the comments)"
                                ]
                            },
                            "notApplicable":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "comments": {"type": "string"}
                                }
                            },
                            "annealingHomogenization":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "annealingHomogenizationMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified annealing and homogenization",
                                            "normalizing",
                                            "recrystallization",
                                            "stress relieving",
                                            "tempering",
                                            "twin screw excrusion",
                                            "ultrasonication",
                                            "vacuum annealing/heating",
                                            "curing/hardening",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            },
                            "depositionCoating":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "depositionCoatingMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified deposition and coating",
                                            "chemical vapour deposition",
                                            "atomic layer deposition",
                                            "gas dosing/gas exposure",
                                            "sputter coating",
                                            "ion implantation",
                                            "electrodeposition",
                                            "evaporation/physical vapor deposition",
                                            "electron beam deposition",
                                            "ion beam deposition",
                                            "beam epitaxy",
                                            "ink-jet deposition",
                                            "pulsed laser deposition",
                                            "Langmuir-Blodgett film deposition",
                                            "plasma spraying",
                                            "carbon evaporation coating",
                                            "spin coating",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            },
                            "joining":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "joiningMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified joining",
                                            "adhesive bonding",
                                            "thermo-chemical welding",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            },
                            "mechanicalAndSurface":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "mechanicalAndSurfaceMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified mechanical and surface",
                                            "focused ion beam",
                                            "lithography",
                                            "polishing",
                                            "sputtering",
                                            "thermal plasma processing",
                                            "exfoliation/cleavage/decapping",
                                            "grinding",
                                            "etching",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            },
                            "reactive":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "reactiveMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified reactive",
                                            "dissolving/etching",
                                            "drying",
                                            "in-situ polymerization",
                                            "post-polymerization modification",
                                            "reductive roasting",
                                            "solution processing",
                                            "reactive ion etching (RIE/IBE)",
                                            "other (please specify in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            },
                            "other": 
                            {
                                "type": "object",
                                "properties": 
                                {
                                    "comments": {"type": "string"},
                                    "consumables":
                                    {
                                        "description": "(Optional) - Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                                        "type": "array",
                                        "items":
                                        {
                                            "type": "string" 
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "fabricationDescription":
                {
                    "description": "(Optional) - Short description to keep track of the fabrication procedures and treatments required to obtain the Precursor.",
                    "type": "string"
                },
                "fabricationHistoryFile":
                {
                    "description": "(Optional) - Location of the file, if any, where the complete Fabrication history is described",
                    "type": "string",
                    "enum":
                    [
                        "Not Applicable",
                        "ELN",
                        "LIMS",
                        "Data Repository",
                        "Included in the Raw Data file",
                        "Paper log book"
                    ]
                },
                "fabricationHistoryFileReference":
                {
                    "description": "(Optional) - Reference to the location of the file where the complete Fabrication history is described. Ideally, the unique identifier to the ELN, LIMS, or to a data repository. Not needed in case of a paper log book, or if the Fabrication history is included in the raw data.",
                    "type": "string"   
                }
            }
        },
        "precursorReferencing":
        {
            "type": "object",
            "properties":
            {
                "axisOrientation": {"type": "string"},
                "precursorReference":
                {
                    "description": "(Optional) - Coordinates of the markers in the Precursor reference system.",
                    "type": "string",
                    "enum": 
                    [
                        "notApplicable",
                        "cartesian",
                        "polar",
                        "other"
                    ]
                },
                "cartesian": {"$ref": "#/$defs/cartesianType"},
                "polar": {"$ref": "#/$defs/polarType"},
                "notApplicable": {"$ref": "#/$defs/noneType"},
                "other": {"$ref": "#/$defs/otherType"},
                "comments": {"type": "string"}
            }
        },
        "parents": 
        {
			"description": "(Required) - One or more entities which were used as input of the processes to obtain the output entity described in this schema. This field is needed to reconstruct the provenance.",
            "type": "array",
			"items": 
            {
				"type": "object",
				"properties": 
                {
					"parentType": 
                    {
						"description": "(Required) - Type of parent used as input of the process to obtain the output entity described in this schema.",
                        "type": "string",
						"default": "not applicable",
						"enum": 
                        [
							"not applicable",
							"input"
						]
					},
					"parentReferenceType": 
                    {
						"description": "(Required) - Type of reference to the file where the parent is described, if any. Ideally, this is the MetaStore URI.",
                        "type": "string",
						"enum": 
                        [
							"plain text",
							"external URL",
							"MetaStore URI"
						]
					},
					"parentReference": 
                    {
						"type": "string",
						"description": "Reference to the file where the parent is described. Ideally, this is the URI of the parent metadata document in MetaStore. If parentReferenceType is 'MetaStore URI' it is possible to easily fill this field in a later stage."
					}
				},
				"required": 
                [
					"parentType"
				],
				"if": 
                {
					"properties": 
                    {
						"parentType": 
                        {
							"not": 
                            {
								"const": "not applicable"
							}
						}
					}
				},
				"then": 
                {
					"required": 
                    [
						"parentReferenceType",
						"parentReference"
					]
				}
			}
		}
    }
}