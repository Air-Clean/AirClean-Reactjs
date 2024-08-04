import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

const persistor = persistStore(store);

export { store, persistor };
