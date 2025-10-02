# SEM FIB Tomography

This folder contains three modular JSON schema definitions used for SEM FIB tomography acquisition. They define the structure, validation rules, and expected content for setup, datasets and images for SEM FIB tomography experiment.

## Schemas

### SEM_FIB_Tomography_Acquisition_Main.json
- Is the **entry point** of the schema.  
- Defines the overall structure of an acquisition, referencing the dataset and image schemas.   

### SEM_FIB_Tomography_acquisition_Dataset_Schema.json
- Describes the **dataset-level information**.  
- Includes metadata such as experiment details, acquisition parameters, and references to associated images.  

### SEM_FIB_Tomography_acquisition_Image_Schema.json
- Specifies the **image-level structure**.  
- Defines required fields for individual SEM/FIB images or metadata entries.  

## Usage

- This schema is used in the development of the TOMO map file(s) in [tomo_mapper](https://github.com/kit-data-manager/tomo_mapper/tree/main/src/resources/maps/mapping).
