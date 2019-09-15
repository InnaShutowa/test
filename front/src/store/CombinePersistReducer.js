import {BrowserRouter, Route} from "react-router-dom";
import {persistStore, persistReducer, persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import UserReducer from ".//user/UserReducer";
import UserAuthReducer from "./userAuth/UserAuthReducer"
import UserRegistrationReducer from "./UserRegistration/UserRegistrationReducer"
import PaymentsReducer from "./payments/PaymentsReducer"
import CreatePaymentReducer from "./createPayment/CreatePaymentReducer";
import PaymentReducer from "./payment/PaymentReducer";

const persistUserConfig = {
    key: 'userRoot',
    storage,
};
const persistAuthConfig = {
    key: 'authRoot',
    storage,
};
const persistRegConfig = {
    key: 'regRoot',
    storage,
};
const persistPaymentsConfig = {
    key: 'paymentsRoot',
    storage,
};
const persistConfig = {
    key: 'root',
    storage,
};
const persistPaymentCreateConfig = {
    key: 'createPayment',
    storage,
};
const persistPaymentConfig = {
    key: 'payment',
    storage,
};


const persistedUserReducer = persistReducer(persistUserConfig, UserReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, UserAuthReducer);
const persistedRegReducer = persistReducer(persistRegConfig, UserRegistrationReducer);
const persistedPaymentsReducer = persistReducer(persistPaymentsConfig, PaymentsReducer);
const persistedPaymentCreateReducer = persistReducer(persistPaymentCreateConfig, CreatePaymentReducer);
const persistedPaymentReducer = persistReducer(persistPaymentConfig, PaymentReducer);

const reducers = {
    UserAuthReducer: persistedAuthReducer,
    UserRegistrationReducer: persistedRegReducer,
    PaymentsReducer: persistedPaymentsReducer,
    UserReducer: persistedUserReducer,
    CreatePaymentReducer: persistedPaymentCreateReducer,
    PaymentReducer: persistedPaymentReducer
}

const CombinePersistReducer = persistCombineReducers(persistConfig, reducers);

export default CombinePersistReducer;