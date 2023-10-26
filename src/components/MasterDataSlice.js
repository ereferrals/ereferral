import { createSlice } from "@reduxjs/toolkit";

const masterDataSlice = createSlice({
    name: "masterData",
    initialState: {
        NHSNumbers: [],
        Religions: [],
        Ethnicity: [],
        MaritalStatuses: [],
        MedicalOncologists: [],
        ClinicalOncologists: [],
        TargetCategories: [],
        Covid: [],
        SpecialRequirements: [],
        CommunicationRequirement: [],
        SexOptions: [],
        RelationshiptoPatient: [],
        Titles: [],
        ReferringOrgs: []
    },
    reducers: {
        setNHSNumbers: (state, action) => {
            state.NHSNumbers = action.payload;
        },
        setReligions: (state, action) => {
            state.Religions = action.payload;
        },
        setEthnicity: (state, action) => {
            state.Ethnicity = action.payload;
        },
        setMaritalStatuses: (state, action) => {
            state.MaritalStatuses = action.payload;
        },
        setMedicalOncologistList: (state, action) => {
            state.MedicalOncologists = action.payload;
        },
        setClinicalOncologistList: (state, action) => {
            state.ClinicalOncologists = action.payload;
        },
        setTargetCategoriesList: (state, action) => {
            state.TargetCategories = action.payload;
        },
        setCovidList: (state, action) => {
            state.Covid = action.payload;
        },
        setSpecialRequirementsList: (state, action) => {
            state.SpecialRequirements = action.payload;
        },
        setCommunicationRequirementList: (state, action) => {
            state.CommunicationRequirement = action.payload;
        },
        setSexOptionsList: (state, action) => {
            state.SexOptions = action.payload;
        },
        setRelationshiptoPatientList: (state, action) => {
            state.RelationshiptoPatient = action.payload;
        },
        setTitlesList: (state, action) => {
            state.Titles = action.payload;
        },
        setReferringOrgs: (state, action) => {
            state.ReferringOrgs = action.payload;
        },
    },
});  

export const { setNHSNumbers, setReligions, setEthnicity, setMaritalStatuses, 
    setMedicalOncologistList, setClinicalOncologistList, setTargetCategoriesList,
    setCovidList, setSpecialRequirementsList, setCommunicationRequirementList,setSexOptionsList,
    setRelationshiptoPatientList, setTitlesList, setReferringOrgs } = masterDataSlice.actions;
export default masterDataSlice.reducer;
