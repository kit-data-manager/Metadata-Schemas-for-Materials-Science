# Metadata-Schemas-for-Materials-Science
*********************************************

The aim of this repository is to house the metadata schemas for different measurement techniques used in Materials Science. 
The schemas are written according to the JavaScript Object Notation (`JSON`) Schema or the XML Schema Definition (`XSD`) format.
Sample files are also provided which are written according to the respective schemas.

## List of available Schemas:

1. Schema for scanning electron microscopy ([SEM](./SEM))
1. Schema for transmission electron microscopy ([TEM](./TEM))
1. Schema for magnetic resonance imaging ([MRI](./MRI))
1. Schemas for [SEM-FIB_Tomography](./SEM-FIB_Tomography)
1. Schema for nano or micro - computed tomography ([CT](./CT)) 
1. Schema for Advanced Photoelectric Effect - High Energy ([APE-HE](./APE-HE))
1. General Schemas
   * [user description](./user_description.json)

## Contribution Guide

If you want to contribute to this repository, please adhere to the steps and information below

### Changing or Adding a Schema

1. for changes to a schema or addition of a new schema open a new branch indicating the schema you are working on (if you are an outside collaborator, you need to use a fork)
1. once you have changes that should prompt a new release of the schema, open a Pull Request (PR) against main
1. Check the report generated in the PR
    - is the schema valid?
    - determine the semantic version update based on the diff to the last release of the schema (if it exists)
    - Update the PR title with the new schema version you suggest (for example "SEM schema update to v0.2.0")

### General Best Practices

- Schema information is organized in folders based on research topics/areas
- keep your **PRs schema-specific** and **avoid side effects** in other schemas
- check the **general schemas** available in the root of this repo before you include similar or identical information in your schema directly (such as user description). If you need a change in those general definitions, open an issue to allow for discussion.
- Provide a README in the folder of your schemas. Here you can also link to software and projects related to the schema.

### Schema-specific Practices

- `$id`: Do not include an id in your schema. An ID (ideally a persistant identifier) can and should be added on publication of the schema in a repository.
- `$schema`: The schema suite currently contains schemas compliant with json schema spec 2019. It is recommended (due to limitations in the CI pipelines for automatic validation) to keep all schemas aligned with this spec version. If you consider this a restriction unfit for your necessary changes, please raise this discussion in an issue or in your specific PR.

### Hints for accepting PRs (for repo owners/maintainers)
- new schemas or moved schema files: add new to/change tag mapping in the CI workflows before proceeding
- make sure the reports reflect the latest comparison with the main branch (source branch needs to be up-to-date)
