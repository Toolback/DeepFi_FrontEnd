// import React, { useReducer, createContext } from 'react';

// interface AppDataState {
//   accounts: Record<string, any> // or specify a more specific type if possible,
//   connected: bolean,
//   userStatus: string,
//   userAddress: string,
//   userMLPBalance: string,
//   vaults?: {
//     vaultId: number,
//     address: string,
//     vaultButtonName: string  
//   }[],
//   userTest:string,
// }

// type AppDataAction = { 
//   type: 'setAppData', 
//   userAccounts: Record<string, any>, 
//   connected: bolean,
//   userStatus: string, 
//   userAddress: string, 
//   userMLPBalance: string, 
//   vaults?: {
//     vaultId: number,
//     address: string,
//     vaultButtonName: string  
//   }[],
//   userTest:string
// };

// export const initialAppDataState: AppDataState = {
//   accounts: {},
//   connected: false,
//   userStatus: 'connect to retrieve',
//   userAddress: 'connect to retrieve',
//   userMLPBalance: 'connect to retrieve',
//   vaults:undefined,
// }

// export const AppDataStoreContext = createContext<{stateAppData: AppDataState, dispatchAppData: React.Dispatch<AppDataAction>}>({
//   stateAppData: initialAppDataState,
//   dispatchAppData: () => null,
// });

// export function reducer(state: AppDataState, action: AppDataAction): AppDataState {
//   switch (action.type) {
//     case 'setAppData':
//       return {
//         ...state,
//         accounts: action.userAccounts,
//         connected: action.connected,
//         userStatus: action.userStatus,
//         userAddress: action.userAddress,
//         userMLPBalance: action.userMLPBalance,
//         vaults: action.vaults,
        
//       };

//     default:
//       throw new Error();
//   }
// }

// export const AppDataStoreContainer = ({ children }: { children: React.ReactNode }) => {
//   const [stateAppData, dispatchAppData] = useReducer(reducer, initialAppDataState);

//   return (
//     <AppDataStoreContext.Provider value={{ stateAppData, dispatchAppData }}>
//       {children}
//     </AppDataStoreContext.Provider>
//   )
// }