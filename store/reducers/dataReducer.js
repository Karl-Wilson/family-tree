import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'data',
    initialState: {},
        reducers: {
            addResizeData:  (state, action) => {
                state.resizeData = action.payload;
            },
        },
})

const dataActions = dataSlice.actions
const dataReducer = dataSlice.reducer
export {dataActions, dataReducer};