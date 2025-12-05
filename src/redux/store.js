import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import newsReducer from "./news/newsSlice";
import friendsReducer from "./friends/friendsSlice";
import petsReducer from "./pets/petsSlice";
import locationsReducer from "./locations/locationsSlice";
import favoritesReducer from './favorites/favoritesSlice';

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
import { api } from "./auth/authOperations";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "user"],
};

const favoritesPersistConfig = {
    key: "favorites",
    storage,
    whitelist: ["favorites", "viewed"],
};

const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        pets: petsReducer,
        news: newsReducer,
        friends: friendsReducer,
        locations: locationsReducer,
        favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Set token on initial load
const { token } = store.getState().auth;
if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Keep token updated
store.subscribe(() => {
    const token = store.getState().auth.token;
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
});

export const persistor = persistStore(store);
export default store;
