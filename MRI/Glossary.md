# NEP MRI Glossary of Terms
-----
This glossary is based on a semantic model that describes the terms in the context of the specific domain of MRI. The definitions of the terms are partly aligned with those that already exist in related communities, i.e. DICOM definitions ([DICOM Standard Browser by Innolitics](https://dicom.innolitics.com/ciods)), the [NEP Glossary](https://www.nffa.eu/apply/data-policy/glossary/) and the Joint Lab "Integrated Model and Data-driven Materials Characterization [(MDMC) Glossary](https://github.com/Materials-Data-Science-and-Informatics/MDMC-NEP-top-level-ontology/blob/master/mdmc-glossary/mdmc-glossary-terms.md). The main terms are reported in the following in alphabetical order.

### DICOM File
A file in the DICOM format. It stores one or multiple [Images](#image) or [Spectra](#spectra) ([Processed Data](#processed-data)) revealed by the Fourier transformation of signals coming from a scan collected into the k-space ([Raw Data](#raw-data)), and a header which contains the [Metadata](#metadata) organized as tags following the DICOM standard. The term has been adapted from Varma (2012)[^1].

### Echo Time
Time in ms between the middle of the excitation pulse and the peak of the echo signal produced. The term has been adopted from DICOM[^2].

### Experiment
Identifiable and reproducible activity with clear start time and end time, which may consist of one or more [Measurements](#measurement), performed by one or more [Users](#user), resulting in one or more [Studies](#study). The term has been adapted from the NEP Glossary[^3], and the MDMC Glossary[^4].

### Image
The Fourier transformation of spatially encoded signals collected in k-space ([Raw Data](#raw-data)) as an array of pixel values representing the intensity of mainly the H-atom signals from the [Sample](#sample).[^5]

### Instrument
Identifiable piece of equipment used by one or more [Users](#user) to perform one or more [Measurements](#measurement) and to generate [Raw Data](#raw-data). The [Instrument](#instrument) is located in a laboratory hosted by an institution. The term has been adopted from the NEP Glossary[^3], and the MDMC Glossary[^4]. In our case, the imaging system of the [Instrument](#instrument) already includes the software to process the [Raw Data](#raw-data) into [Processed Data](#processed-data).

### Measurement
Identifiable and reproducible activity performed by one or more [Users](#user), who generate a single self-consistent unit of [Raw Data](#raw-data) about a [Sample](#sample) or a set of them. Therefore, an [Instrument](#instrument) is used under constant or varying controlled measurement conditions, depending on the particular research context. The term has been adopted from the NEP Glossary[^3], and the MDMC Glossary[^4]. In our case, we considered as [Measurement](#measurement) a scan generating signals collected into the k-space ([Raw Data](#raw-data)), which are processed by the software installed on the imaging system to reveal [Images](#image) or [Spectra](#spectra) ([Processed Data](#processed-data)).

### Metadata
Any descriptive human and/or machine readable content intended to help contextualize or otherwise qualify research data and its management through time. Depending on the mode of use, [Metadata](#metadata) describes information pertaining to the [Experiment](#experiment), including (but not limited to) [User](#user), [Series](#series), [Measurement](#measurement), [Instrument](#instrument), [Sample](#sample), and the corresponding data analysis lifecycle. [Metadata](#metadata) may include descriptions of how files are named, structured and stored. [Metadata](#metadata) may be registered in a metadata repository. The term has been adapted from the NEP Glossary[^3], and the MDMC Glossary[^4]. In our case we faced four types of metadata: (i) the MRI metadata attributes of the [DICOM File](#dicom-file) describing the [Series](#series) belonging to a [Study](#study), (ii) the metadata attributes of our MRI schema selected from the [DICOM File](#dicom-file)'s ones in order to enable the reproducibility of a [Study](#study), (iii) the administrative metadata of the dataset in the data repository (Zenodo), (iv) the administrative metadata of the JSON metadata documents in the metadata repository (MetaRepo).

### Processed Data
The primary output of any kind of data processing or manipulation of [Raw Data](#raw-data) performed by one or more [Users](#user), possibly using research software, in order to prepare it for another step of the data analysis lifecycle, e.g., data analysis or data interpretation. [Processed Data](#processed-data) is typically in the form of a data file, but it may potentially be a data stream or any other form of data which is relevant in a particular data management context. [Processed Data](#processed-data) may be stored in a Data Repository and may be part of a data set. The term has been adopted from the NEP Glossary[^3], and the MDMC Glossary[^4]. In our case, we considered as [Processed Data](#processed-data) an [Image](#image), or a [Spectrum](#spectrum) (for each of the pixels of the [Image](#image). 

### Protocol
The parameters of the [Instrument](#instrument) which define the conditions under which one or more [Measurements](#measurement) are performed and a [Series](#series) is generated. Usually, there is a set of [Protocols](#protocol) that are applied on a routine basis. The choice of a [Protocol](#protocol) mainly depends on the [Sample](#sample), the [Instrument](#instrument) and the research question addressed by an [Experiment](#experiment). The term has been expanded from McRobbie[^5] and DICOM[^2].

### Raw Data
The primary output of a [Measurement](#measurement), collected by one or more [Users](#user) using an [Instrument](#instrument), before any subsequent data processing. [Raw Data](#raw-data) is typically in the form of a data file, but it may potentially  be a data stream or any other form of data which is relevant in a particular data management context. [Raw Data](#raw-data) may be part of a data set and may be stored in a data repository. The term has been adopted from the NEP Glossary[^3] and the MDMC Glossary[^4]. In our case, we considered as [Raw Data](#raw-data) the signals from a scan collected into the k-space.

### Repetition Time
Time in ms between the beginning of a pulse sequence and the beginning of the subsequent (essentially identical) pulse sequence. The term has been adopted from DICOM[^2].

### Sample
A physical object (or a collection of objects) which is considered as a single discrete, uniquely identified unit which is exposed to the [Instrument](#instrument) during one or more [Measurements](#measurement). MRI [Samples](#sample) are usually managed or being placed in a container. The term is equivalent to "Specimen"[^2] and to "Sample"[^3][^4].

### Series
A set of one or more [Images](#image) or [Spectra](#spectra) (i.e. [Processed Data](#processed-data)) generated after the processing of [Raw Data](#raw-data) collected during [Measurements](#measurement) along the z-axis of a [Sample](#sample) as part of the same [Study](#study) and stored in one or multiple [DICOM Files](#dicom-file). The term has been adopted from DICOM[^2].

### Spectrum
A representation of the distribution of resonance frequencies present in the signal and determined by the chemical environment of the atoms in the [Sample](#sample).[^5]

### Spin Echo Sequence
Fundamental pulse sequence in MRI, consisting of an excitation pulse (90°) and a refocusing pulse (180°). It is usually applied to measure the signal of the transversal magnetization, which represents the T2-relaxation (or spin-spin relaxation) value of a [Sample](#sample). The [Spin Echo Sequence](#spin-echo-sequence) is performed by setting the [Echo Time](#echo-time) and the [Repetition Time](#repetition-time) of the [Protocol](#protocol).

### Study
A collection of one or more [Series](#series) that are scientifically related (depending on the research context) for the purpose of the [Experiment](#experiment). The term has been adapted from DICOM[^2]. According to the convention we adopted, a [Study](#study) is named after "NEP-MRI-S[number]".

### User
A scientist who performs [Measurements](#measurement) in order to collect and/or analyse [Raw Data](#raw-data) or [Processed Data](#processed-data), or is interested in reusing them with the final aim to extract insights that support the answer to a specific research question. This term is the equivalent, adapted to our case, of "Physician of Record"[^2] and of "Research User"[^3][^4].

-----

[^1]: D. R. Varma: Managing DICOM images: Tips and tricks for the radiologist In: Indian Journal of Radiology and Imaging, vol. 22(1), pp. 4-13. 2012. 10.4103/0971-3026.95396

[^2]: Innolitics: DICOM Standard Browser, 2022. https://dicom.innolitics.com/ciods

[^3]: NEP: Glossary, 2022. https://www.nffa.eu/apply/data-policy/glossary/

[^4]: MDMC: Glossary, 2022. https://jl-mdmc-helmholtz.de/mdmc-activities/metadata-working-group/metadata-wg-topics/semantics/glossary/

[^5]: McRobbie, D. W. and Moore, E. A. and Graves, M. J. and Prince, M. R.: MRI from Picture to Proton In: Cambridge University Press, 2nd edition. 2006.
