import React, { useReducer, createContext } from 'react';
import { ethers } from 'ethers';

export const initialAppDataState = {
    provider: new ethers.providers.StaticJsonRpcProvider(
        "https://rpc.testnet.fantom.network/"
      ), 
    accounts: {}, // [] ?,
    userStatus: 'connect to retrieve',
    userAddress: 'connect to retrieve',
    userMLPBalance: 'connect to retrieve',
    connected:false,
    vaults: []

}

export const AppDataStoreContext = createContext(initialAppDataState);

export function reducer(state, action) {
    switch (action.type) {
        case 'setAppData':
            return {
                ...state,
                provider: action.provider,
                accounts: action.accounts, // multiple user accounts
                userStatus: action.userStatus, // user / admin
                userAddress: action.userAddress, // address if logged
                signer: action.signer,
                userMLPBalance: action.userMLPBalance,
                connected: action.connected,
                vaults: action.vaults,
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