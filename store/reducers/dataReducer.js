import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'data',
    initialState: {treeData: false, ancestorColorData: false, treeDataList: false, autoSuggestList: false},
        reducers: {
            addResizeData:  (state, action) => {
                state.resizeData = action.payload;
            },
            addTreeData:  (state, action) => {
                state.treeData = action.payload;
            },
            addAncestorColorData:  (state, action) => {
                state.ancestorColorData = action.payload;
            },
            addTreeDataList:  (state, action) => {
                state.treeDataList = action.payload;
            },
            addAutoSuggestList:  (state, action) => {
                state.autoSuggestList = action.payload;
            },
        },
})

const dataActions = dataSlice.actions
const dataReducer = dataSlice.reducer
export {dataActions, dataReducer};