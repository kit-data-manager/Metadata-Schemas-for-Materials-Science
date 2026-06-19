# NFDI-MatWerk (IUC02) JSON schema for creep data of Ni-based superalloys

This JSON schema was developed within the infrastructure use case IUC02: “Framework for curation and distribution of reference datasets” of the consortium NFDI-MatWerk. It intends to define a structured approach for collecting all required information on a creep experiment using the established terminology of the respective test standard ISO 204:2022 and additional terminology agreed upon by the domain experts. The individual entries are grouped according to their content type and sub-summarized under respective headlines, thereby suggesting a basic categorization and a related hierarchy of concepts. This hierarchy can be similarly applied to other test methods and different metallic (and other) materials.

The development of schemas in this folder is based on a dataset, that can be found under [reference dataset by BAM](https://doi.org/10.5281/zenodo.11668375). More details on the data schema is also available in a git repository [IUC02 git repo](https://git.rwth-aachen.de/nfdi-matwerk/iuc02).

With the JSON schema(v1.1), it is intended to define a structured approach for collecting all required information on a creep experiment using the established terminology of the respective test standard ISO 204:2022. The development goals encompass the following primary aspects:
- To ensure a comprehensive description with a hierarchical data structure that can be implemented to data management platforms,
- To define a scope of documentation that allows the assessment of a dataset’s quality by different end users who retrieve datasets from multiple data providers,
- To foster the exchange of high-quality creep datasets according to the FAIR principles, by providing easy interoperability and full reusability.

With the JSON schema (v2.1):

- A CSV file is not provided. Instead, a *.lis file is provided.
- The overarching structure of the JSON schema was revised to ensure correct nesting. This change concerns mainly categories I and II.
- In the JSON schema, the fields corresponding to chemical composition were revised. Since this version, it is possible to report the chemical composition either by entering element by element or by adding a link to an external resource. For the measured chemical composition, the measurement method can be added for each element.
- Revision of entries “k-Value” and “Ratio reference length to diameter” regarding the units and to cover Lr = Lo and Lr = Le.
- Entry “Description of the loading system” was revised.
- Optional entry Leverage ratio added in case of lever arm test machine type.
- Category III “Elongation values and cross-sectional dimensions” was split into two: “Cross-sectional dimensions” and “Elongation values”.

