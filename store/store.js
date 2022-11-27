import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from './reducers/uiReducer';
import { dataReducer } from './reducers/dataReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store;