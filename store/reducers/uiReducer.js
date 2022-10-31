import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {},
        reducers: {
            addResizeData:  (state, action) => {
                state.resizeData = action.payload;
            },
        },
})

const uiActions = uiSlice.actions
const uiReducer = uiSlice.reducer
export {uiActions, uiReducer};