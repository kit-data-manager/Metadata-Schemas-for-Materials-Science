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
                    "description": "The purpose of the sample (e.g., for which measurement(s) or subsequent analysis the sample was prepared). In this context, Correlative Characterization may be intended as a purpose. Multiple selection is allowed.",
                    "type": "array",
                    "items":
                    {
                        "type": "string",
                        "enum":
                        [
                            "assessment",
                            "completeness check",
                            "correlative characterization",
                            "exploratory",
                            "feasibility",
                            "high quality measurement",
                            "test specific hypothesis"
                        ]
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
                        "sampleIDTypeComment": {"type": "string"},
                        "sampleIDPosition":
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
                        }
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
                    "description": "A matter object throughout which all physical properties of a material are essentially uniform. Multiple selection is allowed.",
                    "type": "object",
                    "properties":
                    {
                        "phaseOfMatterOptions":
                        {
                            "description": "A matter object throughout which all physical properties of a material are essentially uniform. Multiple selection is allowed.",
                            "type": "array",
                            "items":
                            {
                                "type": "string",
                                "enum": 
                                    [
                                        "solid",
                                        "liquid",
                                        "gas",
                                        "plasma",
                                        "crystalline",
                                        "disordered",
                                        "melt",
                                        "metastable",
                                        "nonequilibrium",
                                        "ordered",
                                        "other (please specify in the comment)"
                                    ]
                            }  
                        },
                        "comment": {"type": "string"}
                    }
                },
                "materialType": 
                {
                    "type": "string",
                    "enum":
                    [
                        "notApplicable",
                        "biologicals",
                        "biomaterials",
                        "ceramics",
                        "metalsAndAlloys",
                        "metamaterials",
                        "molecularFluids",
                        "organicCompounds",
                        "organometallics",
                        "polymers",
                        "semiconductors"
                    ]
                },
                "notApplicable":
                {
                    "type": "object",
                    "properties": 
                    {
                        "comment": {"type": "string"}
                    }
                },
                "biological":
                {
                    "type": "object",
                    "properties": {}
                },
                "biomaterials": 
                {
                    "type": "object",
                    "properties": {}
                },
                "ceramics":
                {
                    "type": "object",
                    "properties":
                    {
                        "ceramicOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "carbides",
                                "cements",
                                "nitrides",
                                "oxides",
                                "perovskites",
                                "silicates",
                                "other (please specify in the comment)"
                            ]
                        },
                        "comment": {"type": "string"}
                    }
                },
                "metalsAndAlloys":
                {
                    "type": "object",
                    "properties":
                    {
                        "metalsAndAlloysOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "Al-containing",
                                "commercially pure metals",
                                "Cu-containing",
                                "Fe-containing",
                                "intermetallics",
                                "Mg-containing",
                                "Ni-containing",
                                "rare earths",
                                "refractory",
                                "steels",
                                "superalloys",
                                "Ti-containing",
                                "other (please specify in the comment)"
                            ]
                        },
                        "comment": {"type": "string"}
                    }
                },
                "metamaterials":
                {
                    "type": "object",
                    "properties": {}
                },
                "molecularFluids":
                {
                    "type": "object",
                    "properties": {}
                },
                "organicCompounds":
                {
                    "type": "object",
                    "properties":
                    {
                        "organicCompoundsOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "acohols",
                                "aldehydes",
                                "alkanes",
                                "alkenes",
                                "alkynes",
                                "amines",
                                "carboxylic acids",
                                "cyclic compounds",
                                "cycloalkanes",
                                "esters",
                                "ketones",
                                "nitriles",
                                "other (please specify in the comment)"
                            ]
                        },
                        "comment": {"type": "string"}
                    }
                },
                "organometallics":
                {
                    "type": "object",
                    "properties": {}
                },
                "polymers":
                {
                    "type": "object",
                    "properties":
                    {
                        "polymersOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "copolymers",
                                "elastomers",
                                "homopolymers",
                                "liquid crystals",
                                "polymer blends",
                                "rubbers",
                                "thermoplastics",
                                "thermosets",
                                "other (please specify in the comment)"
                            ]
                        },
                        "comment": {"type": "string"}
                    }
                },
                "semiconductors":
                {
                    "type": "object",
                    "properties":
                    {
                        "semiconductorsOptions":
                        {
                            "type": "string",
                            "enum":
                            [
                                "extrinsic",
                                "II-VI",
                                "III-V",
                                "intrinsic",
                                "n-type",
                                "p-type",
                                "other (please specify in the comment)"
                            ]
                        },
                        "comment": {"type": "string"}
                    }
                }
            }
        },
        "structuralFeatures":
        {
            "type": "object",
            "properties":
            {
                "composites":
                {
                    "type": "object",
                    "properties":
                    {
                        "compositesOptions":
                        {
                            "type": "array",
                            "items": 
                            {
                                "type": "string",
                                "enum": 
                                [
                                    "biological or green",
                                    "fiber-reinforced",
                                    "metal-matrix",
                                    "nanocomposites",
                                    "particle-reinforced",
                                    "polymer-matrix",
                                    "structural",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
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
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "cracks",
                                    "crazing",
                                    "dislocations",
                                    "inclusions",
                                    "interstitials",
                                    "point defects",
                                    "pores",
                                    "vacancies",
                                    "voids",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}   
                    }
                },
                "interfacial":
                {
                    "type": "object",
                    "properties": 
                    {
                        "interfacialOptions":
                        {
                            "type": "array",
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "grain boundaries",
                                    "interfacial surface area",
                                    "magnetic domain walls",
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
                "microstructures":
                {
                    "type": "object",
                    "properties": 
                    {
                        "microstructuresOptions":
                        {
                            "type": "array",
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "BBC spheres",
                                    "cellular",
                                    "clustering",
                                    "compound",
                                    "crystallinity",
                                    "defect structures",
                                    "dentritic",
                                    "dispersion",
                                    "eutectic",
                                    "grains",
                                    "gyroid",
                                    "HEX cylinders",
                                    "lamellae",
                                    "nanocrystalline",
                                    "particle distribution",
                                    "particle shape",
                                    "polycrystalline",
                                    "porosity",
                                    "precipitates",
                                    "quasicrystalline",
                                    "single crystal",
                                    "twinned",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
                    }
                },
                "molecularStructure":
                {
                    "type": "object",
                    "properties": 
                    {
                        "molecularStructureOptions":
                        {
                            "type": "array",
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "alternating copolymer",
                                    "block copolymer",
                                    "bottlebrush",
                                    "dendrimer",
                                    "end-group composition",
                                    "funtionalization",
                                    "gradient copolymer",
                                    "long-chain branching",
                                    "surfactants",
                                    "tacticity",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
                    }
                },
                "morphologies":
                {
                    "type": "object",
                    "properties": 
                    {
                        "morphologiesOptions":
                        {
                            "type": "array",
                            "items":
                            {
                                "type": "string",
                                "enum":
                                [
                                    "aligned",
                                    "amorphous",
                                    "anosotropic",
                                    "clusters",
                                    "complex fluids",
                                    "glass",
                                    "isotropic",
                                    "layered",
                                    "nanoparticles or nanotubes",
                                    "one-dimensional",
                                    "open-framework",
                                    "particles or colloids",
                                    "percolated",
                                    "porous",
                                    "quantum dots or wires",
                                    "random",
                                    "semicrystalline",
                                    "thin film",
                                    "two-dimensional",
                                    "wires",
                                    "woven",
                                    "other (please specify in the comment)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
                    }
                },
                "properties":
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
                                    "other (please add in the comments)"
                                ]
                            }
                        },
                        "comment": {"type": "string"}
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
                "sampleSize":
                {
                    "description":  "(Optional) - Size of the sample, mainly needed to evaluate whether the sample fits a certain measurement. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX and sizeY).",
                    "type": "object",
                    "properties":
                    {
                        "sizeX":
                        {
                            "description": "(Optional) - Size of the sample in the x dimension. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeX).",
                            "type": "string"
                        },
                        "sizeY":
                        {
                            "description": "(Optional) - Size of the sample in the y dimension. Regardless of the shape, the sample size can be approximated (e.g. the diameter of a cylinder can be indicated as sizeY).",
                            "type": "string"
                        },
                        "sizeZ":
                        {
                            "description": "(Optional) - Size of the sample in the z dimension. Regardless of the shape, the sample size can be approximated (e.g. the hight of a cylinder can be indicated as sizeZ).",
                            "type": "string"
                        }
                    }
                },
                "sampleMass": {"type": "string"},
                "sampleVolume": {"type": "string"},
                "sampleDensity": {"type": "string"},
                "samplePressure":
                {
                    "description": "(Optional) - Usually the gas pressure. It can be a numerical value, a range of numerical values, or some text (e.g., vacuum, high vacuum, ultra high vacuum, …)",
                    "type": "string"
                },
                "sampleTemperature":
                {
                    "description": "(Optional) - Temperature of the sample. It can be a numerical value, a range of numerical values, or some text (e.g., room temperature).",
                    "type": "string"
                },
                "sampleAdditionalFeatures":
                {
                    "description": "(Optional) - Description of the missing relevant features describing the sample, if any.",
                    "type": "string"
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
                    "componentAdditionalFeatures": 
                    {
                        "description": "(Optional) - Description of the missing relevant features describing the Sample Component, if any.",
                        "type": "string"
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
                            "type":"string"
                        },
                        "storagePressure": 
                        {
                            "description": "(Optional) - Generally it does not refer to gas pressure, because usually gas pressure = storage pressure. It can be a numerical value, a range of numerical values, or some text (e.g., vacuum, high vacuum, ultra high vacuum, …)",
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