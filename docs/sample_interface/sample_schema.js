var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "title": "sample_schema",
    "description":"Basic schema for sample description. It can be extended. According to the MDMC-NEP glossary, a Sample is Physical System (typically a piece of material) composed by one or more Sample Components, exposed to the Instrument during a Measurement, typically after a Sample Preparation. Sample may be held by a Sample Holder and/or carried by a Sample Carrier during the Measurement.",
    "type":"object",
    "required": [],
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
        noneType: 
        {
            "type": "object",
            "properties": {}
        },
        otherType: 
        {
            "type": "object",
            "properties": {}
        }
    },
    "properties": 
    {
        "sampleIdentification":
        {
            "type": "object",
            "properties":
            {
                "sampleName": 
                {
                    "description": "(Required) - Name of the sample",
                    "type": "string"
                },
                "sampleProducer":
                {
                    "description": "(Required) - Producer or vendor of the sample, depending on whether the sample is produced in the lab by one or more research group members or is bought from a vendor. If it is preferred to avoid the name of the group member, self or own can be used as sampleProducer",
                    "type": "string"
                },
                "samplePurpose":
                {
                    "type": "object",
                    "properties":
                    {
                        "samplePurposeOptions":
                        {
                            "description": "The tentative purpose of the sample (e.g., for which measurement(s) or subsequent analysis the sample was prepared). In this context, Correlative Characterization may be intended as a purpose. Multiple selection is allowed.",
                            "type": "array",
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
                        "otherSamplePurpose": {"type": "string"}
                    }
                },
                "sampleID":
                {
                    "type": "object",
                    "properties":
                    {
                        "sampleID": 
                        {
                            "description": "(Optional) - Identifier of the sample. The naming is not univocal among laboratories, thus the conventions may differ. In case of biological samples, it may be the internal ID; in case of outcome of a sample preparation, it may be the sample preparation ID; in other cases it can be the number on the box containing the sample; in other cases a convention is established. The choice of how to identify a specific sample is given to the laboratory.",
                            "type": "string"
                        },
                        "sampleIDType":
                        {
                            "description": "(Optional) - Type of identifier of the sample.",
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
                        "otherSampleIDType": {"type": "string"},
                        "sampleIDPosition":
                        {
                            "description": "The sample has an ID printed on it. It's important to know its position on the sample. Multiple selection is allowed.",
                            "type": "array",
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
            }
        },
        "test":
        {
            "type": "object",
            "properties":
            {
                "sampleComponents":
                {
                    "description": "Physical System (typically a piece of material) which constitutes a part of a Sample. It may include one or more substrates, layers, masks, embedding or filler or evaporation materials, coatings, conducting powders and molecules.",
                    "type": "array",
                    "items": 
                    {
                        "type": "object",
                        "properties":
                        {
                             "componentName":
                            {
                                "description": "(Required) - Name of the sample component",
                                "type": "string"
                            },
                            "componentChemicalFormula":
                            {
                                "description": "(Recommended) - Chemical formula of the sample component",
                                "type": "string"
                            },
                            "componentCASNumber":
                            {
                                "description": "(Optional) - CAS number of the sample component, if known and applicable",
                                "type": "string"
                            },
                            "componentMaterialDataSheet":
                            {
                                "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                                "type": "string"
                            },
                            "componentAdditionalFeatures": 
                            {
                                "description": "(Optional) - Description of the missing relevant features describing the Sample Component, if any.",
                                "type": "string"
                            },
                            "sampleCharacterization":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "phaseOfMatter":
                                    {
                                        "description": "A matter object throughout which all physical properties of a material are essentially uniform.",
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
                                        "type": "object",
                                        "properties":
                                        {
                                            "materialTypeOptions":
                                            {
                                                "type": "array",
                                                "items":
                                                {
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
                                                }
                                            },
                                            "materialDataSheet":
                                            {
                                                "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "materialProperties":
                                    {
                                        "type": "object",
                                        "properties":
                                        {
                                            "propertiesOptions":
                                            {
                                                "type": "array",
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
                                            "comment": {"type": "string"}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }               
            }
        },
        "sampleComponents":
        {
            "description": "Physical System (typically a piece of material) which constitutes a part of a Sample. It may include one or more substrates, layers, masks, embedding or filler or evaporation materials, coatings, conducting powders and molecules.",
            "type": "array",
            "items": 
            {
                "type": "object",
                "properties":
                {
                     "componentName":
                    {
                        "description": "(Required) - Name of the sample component",
                        "type": "string"
                    },
                    "componentChemicalFormula":
                    {
                        "description": "(Recommended) - Chemical formula of the sample component",
                        "type": "string"
                    },
                    "componentCASNumber":
                    {
                        "description": "(Optional) - CAS number of the sample component, if known and applicable",
                        "type": "string"
                    },
                    "componentMaterialDataSheet":
                    {
                        "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                        "type": "string"
                    },
                    "componentAdditionalFeatures": 
                    {
                        "description": "(Optional) - Description of the missing relevant features describing the Sample Component, if any.",
                        "type": "string"
                    }
                }
            }
        },
        "sampleCharacterization":
        {
            "type": "object",
            "properties":
            {
                "phaseOfMatter":
                {
                    "description": "A matter object throughout which all physical properties of a material are essentially uniform.",
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
                    "type": "object",
                    "properties":
                    {
                        "materialTypeOptions":
                        {
                            "type": "array",
                            "items":
                            {
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
                            }
                        },
                        "materialDataSheet":
                        {
                            "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                            "type": "string"
                        }
                    }
                },
                "materialProperties":
                {
                    "type": "object",
                    "properties":
                    {
                        "propertiesOptions":
                        {
                            "type": "array",
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
                        "comment": {"type": "string"}
                    }
                }
            }
        },
        "featuresOfInterest":
        {
            "type": "object",
            "properties":
            {
                "defects":
                {
                    "type": "object",
                    "properties": 
                    {
                        "defectsOptions":
                        {
                            "type": "array",
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
                            "description": "Bidimensional region through which a discontinuity occurs in one or more parameter of the material",
                            "type": "array",
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
                            "description": "Constituent of a composite material which increases its stiffness and tensile strength",
                            "type": "object",
                            "properties":
                            {
                                "reinforcingMaterial": 
                                {
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
                            "description": "Aggregates of atoms, molecules, ions which adhere together under e.g. van der Waals forces, ionic forces, covalent bonds, metallic bonds, whose properties differ from those of the corresponding bulk",
                            "type": "object",
                            "properties":
                            {
                                "clusterAtoms":
                                {
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
                                },  
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
                                    "description": "Also referred as void fraction. Fraction of the volume of voids over the total volume between 0 (no voids) and 1 (all voids)",
                                    "type": "number"
                                },
                                "percolated":
                                {
                                    "description": "A substance (such as a liquid, gas, or particles) passes through a porous material or medium",
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
                                    "description": "Two separate crystal domains share some of the same crystal lattice points in a symmetrical manner",
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
                                        }
                                    }
                                }
                            }    
                        }
                    }
                }
            }
        },
        "sampleDescription":
        {
            "type": "object",
            "properties":
            {
                "expirationDate": 
                {
                    "description": "(Optional) - Sample expiration date, if any. Relevant in case of biological samples",
                    "type":"string",
                    "format": "date"
                },
                "sampleChemicalFormula":
                    {
                        "description": "(Recommended) - Chemical formula of the sample",
                        "type": "string"
                    },
                    "sampleCASNumber":
                    {
                        "description": "(Optional) - CAS number of the sample, if known and applicable",
                        "type": "string"
                    },
                    "sampleMaterialDataSheet":
                    {
                        "description": "(Optional) - Link to the file describing the composition specification, usually called Material Data Sheet, if available.",
                        "type": "string"
                    },
                "sampleVisibleElements":
                {
                    "type": "object",
                    "properties":
                    {
                        "visibleElementsOptions":
                        {
                            "type": "array",
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
                        "comment": {"type": "string"}
                    }   
                },
                "sampleShape":
                {
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
                                "road/bar"
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
                                    "type": "number"
                                }
                            }
                        }
                    }
                },
                "sampleSize":
                {
                    "description":  "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY).",
                    "type": "object",
                    "properties":
                    {
                        "sizeX":
                        {
                            "description": "(Optional) - Size of the sample in the x dimension. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "sizeY":
                        {
                            "description": "(Optional) - Size of the sample in the y dimension. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeY).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        },
                        "sizeZ":
                        {
                            "description": "(Optional) - Size of the sample in the z dimension. Regardless of the shape, the sample size can be approximated (e.g. the hight of a cylinder can be indicated as sizeZ).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        }
                    }
                },
                "sampleMass": 
                {
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "sampleVolume": 
                {
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "sampleDensity": 
                {
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "samplePressure":
                {
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "sampleTemperature":
                {
                    "description": "(Optional) - Temperature of the sample. It can be a numerical value, a range of numerical values, or some text (e.g., room temperature).",
                    "type": "object",
                    "properties":
                    {
                        "value": {"type": "number"},
                        "unit": {"type": "string"}
                    }
                },
                "sampleSurfaceRoughness":
                {
                    "description": "(Optional) - Quality of a surface of not being smooth.",
                    "type": "object",
                    "properties": 
                    {
                        "qualitative":
                        {
                            "type": "string",
                            "enum": 
                            [
                                "rough",
                                "smooth",
                                "polished"
                            ]
                        },
                        "quantitative":
                        {
                            "type": "object",
                            "properties":
                            {
                                "amplitudeParameter":
                                {
                                    "type": "string",
                                    "enum":
                                    [
                                        "Ra",
                                        "Rq",
                                        "Rz"
                                    ]
                                },
                                "value": {"type": "number"},
                                "unit": {"type": "string"}
                            }
                        }
                    }
                }
            }
        },
        "samplePreparation":
        {
            "type": "object",
            "properties":
            {
                "preparationDate":
                {
                    "description": "(Optional) - Date of preparation",
                    "type": "string",
                    "format": "date"
                },
                "consumables":
                {
                    "description": "Auxiliary entity used during Fabrication, Sample Preparation or Measurement which has a limited time capacity or is limited in its number of uses before it is disposed of, necessary to the process itself and normally bought from third party manufacturers. Examples are: gloves, syringes, wipes, etching solutions, glass slides, spatulas, weighing paper, two-sided tape.",
                    "type": "array",
                    "items":
                    {
                        "type": "string" 
                    }
                },
                "preparationMethod":
                {
                    "type": "array",
                    "items":
                    {
                        "type": "object",
                        "properties":
                        {
                            "preparationStep":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "notApplicable",
                                    "annealingHomogenization",
                                    "depositionCoating",
                                    "joining",
                                    "mechanicalAndSurface",
                                    "powderProcessing",
                                    "cooling",
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
                                            "aging",
                                            "dry blending",
                                            "homogenization",
                                            "mechanical mixing",
                                            "melt mixing",
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
                                    "comments": {"type": "string"}
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
                                    "comments": {"type": "string"}
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
                                            "soldering/brazing/wire bonding",
                                            "resistance welding",
                                            "clamping",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"}
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
                                            "sectioning",
                                            "sputtering",
                                            "thermal plasma processing",
                                            "exfoliation/cleavage/decapping",
                                            "grinding",
                                            "etching",
                                            "grit blasting",
                                            "sterilization",
                                            "Laser Surface Texturing (LST)",
                                            "dimpling",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"}
                                }
                            },
                            "powderProcessing":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "powderProcessingMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified powder processing",
                                            "sieve fraction preparation",
                                            "pressing",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"}
                                }
                            },
                            "cooling":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "coolingMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified cooling",
                                            "gas cooling",
                                            "vacuum cooling",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"}
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
                                            "addition polymerization",
                                            "condensation polymerization",
                                            "curing",
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
                                    "comments": {"type": "string"}
                                }
                            },
                            "other": 
                            {
                                "type": "object",
                                "properties": 
                                {
                                    "comments": {"type": "string"}
                                }
                            }
                        }
                    }
                },
                "preparationDescription":
                {
                    "description": "(Optional) - Short description to keep track of the preparation procedures and treatments required to obtain the Sample.",
                    "type": "string"
                },
                "preparationHistoryFile":
                {
                    "description": "(Optional) - Type of file, if any, where the complete Sample Preparation history is described",
                    "type": "string",
                    "enum":
                    [
                        "Not Applicable",
                        "ELN",
                        "Data Repository",
                        "Included in the Raw Data file",
                        "Paper log book"
                    ]
                },
                "preparationHistoryFileReference":
                {
                    "description": "(Optional) - Reference to the location of the file where the complete Sample Preparation history is described. Ideally, the unique identifier to the ELN or to a data repository. Not needed in case of a paper log book, or if sample preparation history is included in the raw data",
                    "type": "string"   
                }
            }
        },
        "sampleHandlingPrecaution":
        {
            "description": "(Optional) - Set of features about the sample which are important to know for handling it",
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
                "sampleHandling":
                {
                    "type": "object",
                    "properties":
                    {
                        "noTweezers": 
                        {
                            "description": "The sample has regions which cannot be touched or reached.",
                            "type":"boolean"
                        },
                        "gloves":
                        {
                            "description": "The sample must be handled using gloves.",
                            "type": "boolean"
                        },
                        "shockProtection":
                        {
                            "description": "The sample must be protected against shocks.",
                            "type": "boolean"
                        },
                        "cleanRoomConditions": 
                        {
                            "description": "The sample should be treated only under the given specific clean room conditions.",
                            "type":"string"
                        },
                        "humidity": 
                        {
                            "description": "The sample should be handled at the given humidity. It can be a numerical value or a range of numerical values.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "gasAtmosphere": 
                        {
                            "description": "The sample has a reactive top layer and needs the given inert gas around it during treatment (e.g. Nitrogen).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "additionalNotes": 
                        {
                            "description": "(Optional) - Any additional notes which might be relevant for sample handling",
                            "type": "string"
                        }
                    }
                },
                "storageConditions":
                {
                    "type": "object",
                    "properties":
                    {
                        "storageTemperature": 
                        {
                            "description": "(Optional) - Commonly known as sample temperature. It can be a numerical value, a range of numerical values, or some text (e.g., room temperature).",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "storagePressure": 
                        {
                            "description": "(Optional) - Generally it does not refer to gas pressure, because usually gas pressure = storage pressure. It can be a numerical value, a range of numerical values, or some text (e.g., vacuum, high vacuum, ultra high vacuum, …)",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "storageHumidity": 
                        {
                            "description": "(Optional) - To be indicated only if different from the humidity required for sample handling. It can be a numerical value or a range of numerical values.",
                            "type": "object",
                            "properties":
                            {
                                "value": {"type": "number"},
                                "unit": {"type": "string"}                              
                            }
                        },
                        "storageGasAtmosphere": 
                        {
                            "description": "(Optional) - To be indicated only if different from the gas atmosphere required for sample handling. It can be a numerical value or a range of numerical values",
                            "type":"string",
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
                        },
                        "storageEquipment": 
                        {
                            "description": "(Optional) - Equipment used for storing the sample. Multiple selection is allowed.",
                            "type": "object",
                            "properties":
                            {
                                "storageEquipmentOptions":
                                {
                                    "type":"array",
                                    "items":
                                    {
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
                                "comments": {"type": "string"}
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
        "sampleHolder":
        {
            "type": "object",
            "properties":
            {
                "sampleHolderType":
                {
                    "description": "Type of sample holder",
                    "type": "string",
                    "enum":
                    [
                        "Not applicable",
                        "stub",
                        "dish",
                        "cylinder",
                        "glass slide",
                        "TEM grid",
                        "tilting support",
                        "custom holder",
                        "Other (please add in the comments)"
                    ]
                },
                "otherHolderType": {"type": "string"},
                "sampleHolderDescription":
                {
                    "description": "Any additional description which might be useful to identify the sample holder",
                    "type": "string"
                },
                "fixingMethod":
                {
                    "description": "Method used to hold the sample on the sample holder",
                    "type": "string",
                    "enum":
                    [
                        "Not applicable",
                        "silver tape",
                        "silver paint",
                        "carbon paint",
                        "aluminium tape",
                        "glue",
                        "Other (please add in the comments)"
                    ]
                },
                "otherFixingMethod": {"type": "string"}
            }
        },
        "sampleCarrier":
        {
            "type": "object",
            "properties": 
            {
                "sampleCarrierType": 
                {
                    "description": "Type of sample carrier. It may include the substrate, in case it is used as Sample Carrier.",
                    "type": "string",
                },
                "sampleCarrierDescription":
                {
                    "description": "Any additional description which might be useful to identify the sample carrier",
                    "type": "string"
                }
            }
        },
        "sampleReferencing":
        {
            "type": "object",
            "properties":
            {
                "axisOrientation": {"type": "string"},
                "sampleReference":
                {
                    "description": "Coordinates of the markers in the sample reference system.",
                    "type": "array",
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
        "holderReferencing":
        {
            "type": "object",
            "properties":
            {
                "axisOrientation": {"type": "string"},
                "sampleOnHolder":
                {
                    "type": "object",
                    "properties": 
                    {
                        "samplePositionOnHolder":
                        {
                            "description": "Sample position in the holder reference system.",
                            "type": "array",
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
                        "other": {"$ref": "#/$defs/otherType"}
                    }    
                },
                "markerOnHolder":
                {
                    "type": "object",
                    "properties":
                    {
                        "holderReference":
                        {
                            "description": "Coordinates of the markers in the holder reference system.",
                            "type": "array",
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
                        "other": {"$ref": "#/$defs/otherType"}
                    }
                },
                "comments": {"type": "string"}
            }
        },
        "carrierReferencing":
        {
            "type": "object",
            "properties":
            {
                "axisOrientation": {"type": "string"},
                "holderOnCarrier":
                {
                    "type": "object",
                    "properties":
                    {
                        "holderPositionOnCarrier":
                        {
                            "description": "Holder position in the carrier reference system.",
                            "type": "array",
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
                        "other": {"$ref": "#/$defs/otherType"}
                    }
                },
                "markerOnCarrier":
                {
                    "type": "object",
                    "properties":
                    {
                        "carrierReference":
                        {
                            "description": "Coordinates of the markers in the carrier reference system.",
                            "type": "array",
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
                        "other": {"$ref": "#/$defs/otherType"}
                    }
                },
                "comments": {"type": "string"}
            }
        },
        "ROI": 
        {
            "type": "object",
            "properties":
            {
                "axisOrientation": {"type": "string"},
                "ROIReference":
                {
                    "description": "Coordinates of the points defining the sample ROI (Region of Interest) in the sample reference system.",
                    "type": "array",
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
			"type": "array",
			"items": 
            {
				"type": "object",
				"properties": 
                {
					"parentType": 
                    {
						"type": "string",
						"default": "not applicable",
						"enum": 
                        [
							"not applicable",
							"precursor",
							"sample"
						]
					},
					"parentReferenceType": 
                    {
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
						"description": "If type is 'MetaStore URI' it is possible to easily fill this field in a later stage"
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