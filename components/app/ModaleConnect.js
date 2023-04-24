// import Link from 'next/link';
// import Image from 'next/image';
// import metamaskLogo from '../../public/metamask.svg';
// import { connectWallet } from 'lib/bc/wallet-connect';
// import { AppDataStoreContext } from 'data/StoreAppData';
// import { useContext } from 'react';
// import { isHandlerAdmin } from 'lib/bc/smc';

// const ModaleConnect = ({ setModaleConnectStatus }) => {
//   const {stateAppData, dispatchAppData} = useContext(AppDataStoreContext);

//   const handleConnectClick = async () => {
//     const res = await connectWallet();
//     let userStatus = await isHandlerAdmin(res.userAddress, res.signer) ? "admin" : "member";
//     await dispatchAppData({...stateAppData, type: 'setAppData', accounts : res.accounts, connected: true, userStatus, userAddress : res.userAddress, provider : res.signer})

//     setModaleConnectStatus(false);
//   }



//   return (

//     <div className='fixed w-full h-screen items-center z-50 bg-primary-black bg-opacity-90 '>
//       <div className='h-screen flex justify-center items-center '>
//         {/* <div className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg px-9 py-16 border border-white border-opacity-20 bg-primary-black white:bg-light-dark"
//         // {...props}
//         > */}
//           <div className="flex flex-col w-[440px] rounded-lg px-9 py-16 border border-white border-opacity-20 bg-primary-black white:bg-light-dark"
//         // {...props}
//         >
//           <div className=' flex justify-end text-white -mt-8 pb-8'>
//           <button onClick={() => setModaleConnectStatus(false)}>X</button>
//           </div>
//           <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-100 white:text-dark">
//             Connect Wallet
//           </h2>
//           <p className="text-center text-sm leading-loose tracking-tight text-gray-400 white:text-gray-400">
//             By connecting your wallet, you agree to our Terms of Service and our
//             Privacy Policy.
//           </p>

//           <div
//             className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5"
//             onClick={() => handleConnectClick()}
//           >
//             <span>MetaMask</span>
//             <span className="h-auto w-9">
//               <Image src={metamaskLogo} alt="metamask" />
//             </span>
//           </div>

//           {/* {error && (
//           <p className="mt-3 text-center text-xs text-red-500">
//           Please install Metamask plugin in your browser in order to connect
//             wallet.
//             </p>
//           )} */}
//         </div>
//       </div>
//      </div>
//   )
// }

// export default ModaleConnect;