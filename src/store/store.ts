import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "../features/registration/slice/userSlice";
import doctorReducer from "../features/dr.registration/slice/doctorSlice";


const persistConfig = {
  key:"root",
  storage,
  whitelist:['user','doctor']
}


const rootReducer = combineReducers({
  user:userReducer,
  doctor:doctorReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  devTools:import.meta.env.NODE_ENV!=='production',
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:["persist/PERSIST","persist/REHYDRATE"]
      }
    })
})

export const persistor = persistStore(store)



// export const store = configureStore({
//   reducer: {
//     "auth":userReducer,
//     "drAuth":doctorReducer,
//   },
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
