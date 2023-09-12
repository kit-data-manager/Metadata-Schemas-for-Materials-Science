var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "title": "sample_description",
    "description":"Basic schema for sample description. It can be extended. According to the MDMC-NEP glossary, a Sample is an identifiable entity (typically a piece of material) with distinctive properties (structural, chemical, dimensional, functional and others), composed by one or more Sample Components, exposed to the Instrument during a Measurement, typically after a Sample Preparation. Sample may be held by a Sample Holder and/or carried by a Sample Carrier during the Measurement. Sample may also stand for a model, configuration or input (or any combination of them) of a simulation run (computational Measurement).",
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
        "sampleName": 
        {
            "type": "object",
            "properties":
            {
                "sampleName":
                {
                    "description": "(Required) - Name of the sample",
                    "type": "string"
                },
                "comments": {"type": "string"}
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
                "comments": {"type": "string"}
            }
        },
        "sampleIDNumber":
        {
            "type": "object",
            "properties":
            {
                "IDnumberPosition":
                {
                    "description": "The sample has an ID printed on it. It's important to know its position on the sample. Multiple selection is allowed.",
                    "type": "array",
                    "items":
                    {
                        "type": "string",
                        "enum":
                        [
                            "top",
                            "bottom",
                            "right",
                            "left",
                            "front side",
                            "back side"
                        ]
                    }
                },
                "axisOrientation": {"type": "string"},
                "referencePoints":
                {
                    "description": "Coordinates of the reference points for the sample Identification number in the sample reference system.",
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
        "sampleComponents":
        {
            "type": "object",
            "properties": 
            {
                "sampleComponents":
                {
                    "description": "Identifiable entity (typically a piece of material) which constitutes a part of a Sample, usually with distinctive properties (structural, chemical, dimensional, functional and others).",
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
                            }
                        }
                    }
                },
                "comments": {"type": "string"}
            }
        },
        "sampleMass": 
        {
            "type": "object",
            "properties": 
            {
                "sampleMass":
                {
                    "type": "string"
                },
                "comments": {"type": "string"}
            }
        },
        "physicalState": 
        {
            "description": "(Required) - Physical state of the sample",
            "type": "object",
            "properties": 
            {
                "physicalState":
                {
                    "description": "Phisical state of the sample",
                    "type": "string",
                    "enum": 
                    [
                        "notApplicable",
                        "solid",
                        "powder",
                        "liquid",
                        "gas"
                    ]
                },
                "comments": {"type": "string"},
                "notApplicable":
                {
                    "type": "object",
                    "properties":{}
                },
                "solid": 
                {
                    "type": "object",
                    "properties":
                    {
                        "sampleShape":
                        {
                            "type": "string",
                            "enum":
                            [
                                "Not applicable",
                                "foil/sheet/thin film/multilayer",
                                "monolith/pellet/tubes/rodes",
                                "wire/filament",
                                "Other (please add in the comments)"
                            ]
                        },
                        "sampleSize": 
                        {
                            "description": "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Please note that for numerical simulation, a different notation may be required (e.g. steps and scale)",
                            "type": "object",
                            "properties":
                            {
                                "sizeX":
                                {
                                    "description": "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Please note that for numerical simulation, a different notation may be required (e.g. steps and scale)",
                                    "type": "string"
                                },
                                "sizeY":
                                {
                                    "description": "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Please note that for numerical simulation, a different notation may be required (e.g. steps and scale)",
                                    "type": "string"
                                },
                                "sizeZ":
                                {
                                    "description": "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY). Please note that for numerical simulation, a different notation may be required (e.g. steps and scale)",
                                    "type": "string"
                                },
                            }
                        }, 
                        "crystallinity":
                        {
                            "description": "(Optional) - It refers to the degree of structural order in a solid. Usually specified as a percentage of the volume of the material that is crystalline",
                            "type": "string"
                        },
                        "surfaceRoughness": 
                        {
                            "description": "(Optional) - Expressed as a lenght",
                            "type": "string"
                        }
                    }
                },
                "powder":
                {
                    "type": "object",
                    "properties":
                    {
                        "grainSize": 
                        {
                            "type": "string"
                        },
                        "grainShape": 
                        {
                            "type": "string"
                        },
                        "sampleVolume": 
                        {
                            "type": "string"
                        },
                        "surfaceRoughness": 
                        {
                            "description": "(Optional) - Expressed as a lenght",
                            "type": "string"
                        }
                    }
                },
                "liquid":
                {
                    "type": "object",
                    "properties":
                    {
                        "dispersionType": 
                        {
                            "type": "string",
                            "enum":
                            [
                                "Not applicable",
                                "pure",
                                "colloid",
                                "solution",
                                "slurry",
                                "suspension",
                                "Other (please add in the comments)"
                            ]
                        }, 
                        "sampleVolume": 
                        {
                            "type": "string"
                        },
                        "sampleConcentration": 
                        {
                            "type": "string"
                        }
                    }
                },
                "gas":
                {
                    "type": "object",
                    "properties":
                    {
                        "sampleVolume": 
                        {
                            "type": "string"
                        },
                        "gasPressure": 
                        {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "temperatures":
        {
            "type": "object",
            "properties":
            {
                "meltingTemperature":
                {
                    "type": "string"
                },
                "evaporationTemperature":
                {
                    "type": "string"
                },
                "recrystallizationTemperature":
                {
                    "type": "string"
                },
                "comments": {"type": "string"}
            }
        },
        "sampleProducer":
        {
            "type": "object",
            "properties":
            {
                "sampleProducer":
                {
                    "description": "(Required) - Producer, vendor, or manufacturer of the sample. If the sample is produced in the lab by the research group, self or own can be used as sampleProducer",
                    "type": "string"
                },
                "comments": {"type": "string"}
            }
        },
        "fabrication":
        {
            "type": "object",
            "properties":
            {
                "fabrication": 
                {
                    "type": "array",
                    "items":
                    {
                        "type": "object",
                        "properties": 
                        {
                            "fabricationStep": 
                            {
                                "type": "string",
                                "title": "Fabrication Step",
                                "enum": 
                                [
                                    "notApplicable",
                                    "annealingHomogenization",
                                    "forming",
                                    "joining",
                                    "mechanicalAndSurface",
                                    "powderProcessing",
                                    "cooling",
                                    "other"
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
                            "forming":
                            {
                                "type": "object",
                                "properties":
                                {
                                    "formingMethod":
                                    {
                                        "type": "string",
                                        "enum":
                                        [
                                            "unspecified molding or casting",
                                            "cold rolling",
                                            "compression molding",
                                            "drawing",
                                            "extrusion",
                                            "forging",
                                            "hot pressing",
                                            "cold pressing",
                                            "hot rolling",
                                            "injection molding",
                                            "3D-printing",
                                            "milling",
                                            "lathing",
                                            "rotational molding",
                                            "vacuum molding",
                                            "centrifugal casting",
                                            "continuous casting",
                                            "die casting",
                                            "investment casting",
                                            "sand casting",
                                            "slip casting",
                                            "vacuum arc melting",
                                            "vacuum casting",
                                            "solvent casting",
                                            "permanent mould casting",
                                            "direct chill casting",
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
                                            "arc welding",
                                            "gas welding",
                                            "resistance welding",
                                            "solid-state welding",
                                            "thermo-chemical welding",
                                            "energy beam welding",
                                            "plastic welding",
                                            "riveting",
                                            "seaming",
                                            "clamping",
                                            "bolting/screwing",
                                            "caulking",
                                            "shrink-fitting",
                                            "other (please add in the comments)"
                                        ]
                                    },
                                    "comments": {"type": "string"}
                                },
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
                                            "polishing",
                                            "sectioning",
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
                                            "atomization",
                                            "bar milling",
                                            "centrifugal disintegration",
                                            "hot pressing",
                                            "sintering",
                                            "sponge iron process",
                                            "blending",
                                            "feedstock blending",
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
                                            "air cooling/quench",
                                            "brine quench",
                                            "furnace cooling",
                                            "gas cooling",
                                            "ice quench",
                                            "liquid nitrogen quench",
                                            "oil quench",
                                            "water quench",
                                            "vacuum cooling",
                                            "other (please add in the comments)"
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
                "comments": {"type": "string"}
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
                    "format": "date-time"
                },
                "preparationPurpose":
                {
                    "description": "The purpose of the sample (e.g., for which measurement(s) or subsequent analysis the sample was prepared). In this context, Correlative Characterization may be intended as a purpose.",
                    "type": "string"
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
                "precursors":
                {
                    "description": "Identifiable entity (typically a piece of material) with distinctive properties (structural, chemical, dimensional, functional and others), which is fabricated during the Fabrication and is used during the Sample Preparation to produce a Sample. It may include one or more substrates, layers, masks, evaporation materials, coatings, and molecules. A single Precursor might itself become the only Sample Component of a Sample in case it undergoes a Measurement. ",
                    "type": "array",
                    "items": 
                    {
                        "type": "object",
                        "properties":
                        {
                            "precursorName":
                            {
                                "description": "(Required) - Name of the precursor",
                                "type": "string"
                            },
                            "precursorChemicalFormula":
                            {
                                "description": "(Recommended) - Chemical formula of the precursor",
                                "type": "string"
                            },
                            "precursorCASNumber":
                            {
                                "description": "(Optional) - CAS number of the precursor, if known and applicable",
                                "type": "string"
                            },
                            "precursorFabricationDescription":
                            {
                                "description": "The production of a Precursor in controlled conditions performed by a commercial enterprise, one or more Research Users or a third party. Fabrication may require the use of Equipment, Consumables and Instrument(s). A Measurement may also be performed during the Fabrication, e.g., to characterize the intermediate and/or final resulting Precursor(s).",
                                "type":"string"
                            }
                        }
                    }
                },
                "preparationDescription":
                {
                    "description": "(Optional) - Short description to keep track of the preparation procedures and treatments required to obtain the sample.",
                    "type": "string"
                },
                "preparationHistoryFile":
                {
                    "description": "(Optional) - Type of file, if any, where the complete sample preparation history is described",
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
                    "description": "(Optional) - Reference to the location of the file where the complete sample preparation history is described. Ideally, the unique identifier to the ELN or to a data repository. Not needed in case of a paper log book, or if sample preparation history is included in the raw data",
                    "type": "string"   
                },
                "comments": {"type": "string"}
            }
        },
        "expirationDate":
        {
            "type":"object",
            "properties":
            {
                "expirationDate":
                {
                    "description": "(Optional) - Sample expiration date, if any. Relevant in case of biological samples",
                    "type":"string",
                    "format": "date"
                },
                "comments": {"type": "string"}
            }
        },
        "sampleHandling":
        {
            "description": "(Optional) - Set of features about the sample which are important to know for handling it",
            "type": "object",
            "properties":
            {
                "sampleProperties":
                {
                    "type": "object",
                    "properties":
                    {
                        "samplePropertiesList":
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
                                    "other (please add in the comments)"
                                ]
                            }
                        },
                        "comments": {"type": "string"}
                    }
                },
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
                                    "shock",
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
                        "cleanRoom": 
                        {
                            "description": "The sample should be treated only under the given specific clean room conditions.",
                            "type":"string"
                        },
                        "humidity": 
                        {
                            "description": "The sample should be handled at the given humidity. It can be a numerical value or a range of numerical values.",
                            "type": "string"
                        },
                        "gasAtmosphere": 
                        {
                            "description": "The sample has a reactive top layer and needs the given inert gas around it during treatment (e.g. Nitrogen).",
                            "type": "string"
                        },
                        "comments": {"type": "string"}
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
                            "type":"string"
                        },
                        "storagePressure": 
                        {
                            "description": "(Optional) - Generally it doesn’t refer to gas pressure, because usually gas pressure = storage pressure. It can be a numerical value, a range of numerical values, or some text (e.g., vacuum, high vacuum, ultra high vacuum, …)",
                            "type":"string"
                        },
                        "storageHumidity": 
                        {
                            "description": "(Optional) - To be indicated only if different from the humidity required for sample handling. It can be a numerical value or a range of numerical values.",
                            "type":"string"
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
                                "Other (please add in the comments)"
                            ]
                        },
                        "storageEquipment": 
                        {
                            "description": "(Optional) - Equipment used for storing the sample. Multiple selection is allowed.",
                            "type":"array",
                            "items":
                            {
                                "enum":
                                [
                                    "Not applicable",
                                    "glove box",
                                    "fume hood",
                                    "dessicator",
                                    "open bench",
                                    "refrigerator",
                                    "freezer",
                                    "cryostat",
                                    "liquid N dewar",
                                    "drying oven",
                                    "Other (please add in the comments)"
                                ]
                            }
                        },
                        "additionalNotes":
                        {
                            "description": "(Optional) - Any additional notes which might be relevant for storage conditions",
                            "type": "string"
                        },
                        "comments": {"type": "string"}
                    }
                }
            }
        },
        "embeddingMaterial":
        {
            "type": "object",
            "properties": 
            {
                "embeddingMaterial":
                {
                    "description": "(Optional) - Supporting material in which the sample is embedded (e.g., none, Demotec 30, 70, Epoxy, ...)",
                    "type": "string"
                },
                "comments": {"type": "string"}
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
                "sampleHolderMaterial":
                {
                    "type": "string"
                },
                "sampleHolderTemperatureRange":
                {
                    "description": "Supported range of temperature",
                    "type": "string"
                },
                "supportedSamples":
                {
                    "description": "Supported (number and/or type of) samples",
                    "type": "string"
                },
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
            
                "comments": {"type": "string"}
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
                "sampleCarrierMaterial":
                {
                    "type": "string"
                },
                "sampleCarrierLength": {"type": "string"},
                "sampleCarrierWidth": {"type": "string"},
                "sampleCarrierHeight": {"type": "string"},
                "sampleCarrierTemperatureRange":
                {
                    "description": "Supported range of temperature",
                    "type": "string"
                },
                "supportedSamples":
                {
                    "description": "Supported (number and/or type of) samples",
                    "type": "string"
                },
                "supportedHolders":
                {
                    "description": "Supported (number and/or type of) holders",
                    "type": "string"
                },
                "sampleCarrierDescription":
                {
                    "description": "Any additional description which might be useful to identify the sample carrier",
                    "type": "string"
                },
                "comments": {"type": "string"}
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
        }
    }
}