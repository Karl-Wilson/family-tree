import { createSlice } from '@reduxjs/toolkit'

const colorCode = [
    {name: "Oti", bgColor: "#6427AE", textColor: "#ffffff"},
    {name: "Aghazu", bgColor: "#02985C", textColor: "#ffffff"},
    {name: "Igbokwe", bgColor:"#8F1FAA", textColor: "#ffffff"}
]
const uiSlice = createSlice({
    name: 'ui',
    initialState: {searchSuggest: false, colorCode: colorCode, zoomPercentage: 0, isPageLoading: false, slideWindowCenterTrigger: true,
        currentGen: 9, displayMessage: false, isLoading: false, menuBtnDisplay: true},
        reducers: {
            addcurrentGen:  (state, action) => {
                state.currentGen = action.payload;
            },
            addSearchSuggest:  (state, action) => {
                state.searchSuggest = action.payload;
            },
            addSlideWindowCenterTrigger:  (state, action) => {
                state.slideWindowCenterTrigger = action.payload;
            },
            addShowLoadMore:  (state, action) => {
                state.showLoadMore = action.payload;
            },
            addZoomPercentage:  (state, action) => {
                state.zoomPercentage = action.payload;
            },
            addShowZoomLabel:  (state, action) => {
                state.showZoomLabel = action.payload;
            },
            addPageLoading:  (state, action) => {
                state.isPageLoading = action.payload;
            },
            addIsLoading:  (state, action) => {
                state.isLoading = action.payload;
            },
            addDisplayMessage:  (state, action) => {
                state.displayMessage = action.payload;
            },
            addMenuBtnDisplay:  (state, action) => {
                state.menuBtnDisplay = action.payload;
            },
        },
})

const uiActions = uiSlice.actions
const uiReducer = uiSlice.reducer
export {uiActions, uiReducer};