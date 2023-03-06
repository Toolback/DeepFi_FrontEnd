import React, { useReducer, createContext } from 'react';

interface AppDataState {
  accounts: Record<string, any> // or specify a more specific type if possible,
  userStatus: string,
  userAddress: string,
  userMLPBalance: string,
}

type AppDataAction = { type: 'setAppData', userAccounts: Record<string, any>, userStatus: string, userAddress: string, userMLPBalance: string };

export const initialAppDataState: AppDataState = {
  accounts: {},
  userStatus: 'connect to retrieve',
  userAddress: 'connect to retrieve',
  userMLPBalance: 'connect to retrieve',
}

export const AppDataStoreContext = createContext<{stateAppData: AppDataState, dispatchAppData: React.Dispatch<AppDataAction>}>({
  stateAppData: initialAppDataState,
  dispatchAppData: () => null,
});

export function reducer(state: AppDataState, action: AppDataAction): AppDataState {
  switch (action.type) {
    case 'setAppData':
      return {
        ...state,
        accounts: action.userAccounts,
        userStatus: action.userStatus,
        userAddress: action.userAddress,
        userMLPBalance: action.userMLPBalance,
      };

    default:
      throw new Error();
  }
}

export const AppDataStoreContainer = ({ children }: { children: React.ReactNode }) => {
  const [stateAppData, dispatchAppData] = useReducer(reducer, initialAppDataState);

  return (
    <AppDataStoreContext.Provider value={{ stateAppData, dispatchAppData }}>
      {children}
    </AppDataStoreContext.Provider>
  )
}