import React, { useReducer, createContext } from 'react';

export const initialAppRouteState = {
  destination:'appPage'
}

export const AppRouteStoreContext = createContext(initialAppRouteState);

export function reducer(state, action) {
    switch (action.type) {
        case 'setAppRoute':
            return {...state, destination: action.dDataAppRoute};

        default:
            throw new Error();
    } 
}

export const AppRouteStoreContainer = ({children}) => {
    const [stateAppRoute, dispatchAppRoute] = useReducer(reducer, initialAppRouteState);

    return (
        <AppRouteStoreContext.Provider value={{stateAppRoute, dispatchAppRoute}}>
            {children}
        </AppRouteStoreContext.Provider>
    )
}