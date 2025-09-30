# SEM Schema
- This folder contains schemas for complying with the extraction of metadata from Scanning Electron Microscopy (SEM) acquisitions.  
The schemas are provided in two formats: `JSON` and `XSD`.  
- The SEM schema defines the structure and rules for metadata describing SEM image acquisitions, ensuring consistency, interoperability, and validation across different datasets and tools.

# Usage
- The **SEM_schema.json** is used in [tomo_mapper](https://github.com/kit-data-manager/tomo_mapper) to develop the map files:
  - [SEM_zeiss.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/SEM_zeiss.json)
  - [SEM_thermofisher.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/SEM_thermofisher.json)
  - [SEM_tescan.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/SEM_tescan.json)
  - [SEM_jeol.json](https://github.com/kit-data-manager/tomo_mapper/blob/main/src/resources/maps/mapping/SEM_jeol.json)
