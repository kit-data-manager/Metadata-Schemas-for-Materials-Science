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

- These schemas is used in the development of the map file(s):
  - [TOMO_zeiss_setup.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_zeiss_setup.json)
  - [TOMO_zeiss_image.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_zeiss_image.json)
  - [TOMO_thermofisher_setup.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_thermofisher_setup.json)
  - [TOMO_thermofisher_image.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_thermofisher_image.json)
  - [TOMO_tescan_setup.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_tescan_setup.json)
  - [TOMO_tescan_image.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/TOMO_tescan_image.json)
