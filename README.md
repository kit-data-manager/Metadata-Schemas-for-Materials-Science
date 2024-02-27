# Metadata-Schemas-for-Materials-Science
*********************************************

The aim of this repository is to house the metadata schemas for different measurement techniques used in Materials Science. 
The schemas are written according to the XML Schema Definition (XSD) or JavaScript Object Notation (JSON) format.
Sample files are also provided which are written according to the respective schemas.

## List of available Schemas:

1. Schema for scanning electron microscopy (SEM)
  * [JSON Schema](SEM/SEM_schema.json)
  * [Sample SEM Image](SEM/SCeO5_00.tif)
  * [Example JSON file](SEM/SCEO5_00.json)
  * [XSD Schema](SEM/SEM_Schema.xsd) - old version
  * [Example XML file](SEM/SEM_example.xml)
  * [Example XML file which is populated only with the required fields](SEM/SEM_example_minimum.xml)

  
2. Schema for transmission electron microscopy (TEM)
  * [JSON Schema](TEM/TEM_schema.json)

3. Schema for magnetic resonance imaging (MRI)
  * [JSON Schema](MRI/MRI_schema.json)
  
4. General Schema for describing a user
  * [JSON Schema](user_description.json)

5. Schemas for Metadata contained in [BAM reference dataset for creep tests](https://zenodo.org/record/7764161)
  * [JSON Schema for Datset](Reference_Dataset_Zenodo/PP18_dataset_metadata_Schema.json)
  * [JSON Schem for Files](Reference_Dataset_Zenodo/pp18_file_schema.json)

6. Schemas for FIB/SEM serial sectioning tomography
 * [Acquistion Main JSON](SEM-FIB%20Tomography/SEM_FIB_Tomography_Acquisition_Main.json)
 * [Acquistion Dataset JSON](SEM-FIB%20Tomography/SEM_FIB_Tomography_acquisition_Dataset_Schema.json)
 * [Acquistion Image JSON](SEM-FIB%20Tomography/SEM_FIB_Tomography_acquisition_Image_Schema.json)
