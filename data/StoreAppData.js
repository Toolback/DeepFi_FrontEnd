import React, { useReducer, createContext } from 'react';

export const initialAppDataState = {
    accounts: {}, // [] ?,
    userStatus: 'connect to retrieve',
    userAddress: 'connect to retrieve',
    userMLPBalance: 'connect to retrieve',

}

export const AppDataStoreContext = createContext(initialAppDataState);

export function reducer(state, action) {
    switch (action.type) {
        case 'setAppData':
            return {
                ...state,
                accounts: action.accounts, // multiple user accounts
                userStatus: action.userStatus, // user / admin
                userAddress: action.userAddress, // address if logged
                signer: action.signer,
                userMLPBalance: action.userMLPBalance,
            };

        default:
            throw new Error();
    }
}

export const AppDataStoreContainer = ({ children }) => {
    const [stateAppData, dispatchAppData] = useReducer(reducer, initialAppDataState);

    return (
        <AppDataStoreContext.Provider value={{ stateAppData, dispatchAppData }}>
            {children}
        </AppDataStoreContext.Provider>
    )
}