import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import newsReducer from "./news/newsSlice";
import friendsReducer from "./friends/friendsSlice";
import petsReducer from "./pets/petsSlice";
import locationsReducer from "./locations/locationsSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "refreshToken"],
};

const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        news: newsReducer,
        friends: friendsReducer,
        pets: petsReducer,
        locations: locationsReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
