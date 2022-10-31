import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
        reducers: {
            addResizeData:  (state, action) => {
                state.resizeData = action.payload;
            },
        },
})

const userActions = userSlice.actions
const userReducer = userSlice.reducer
export {userActions, userReducer};