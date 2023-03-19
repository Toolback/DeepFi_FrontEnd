
// const PoolsTable = () => {
//     const availablePools = [
//         {
//             name: "MLP - Mummy Finance",
//             infos: "Actual Reward : Deepfi Tokens",
//             ibTokenAddress: "0x0",
//             tvl: "0", 
//             apy:'5%',
//             // image:""
//         },
//         {
//                 name: "Deposit LP - Equalizer Finance",
//                 infos: "Actual Reward : Deepfi Tokens",
//                 ibTokenAddress: "0x0",
//                 tvl: "0", 
//                 apy:'5%',
//                 // image:""
//         }
//     ]
//     return (


//         <div className="w-full px-4 py-10 sm:pt-2 sm:px-6 lg:px-8">
//             <div className="sm:flex sm:items-center">
//                 <div className="sm:flex-auto">
//                     <h1 className="text-xl font-semibold text-white">Available Pools</h1>
//                     <p className="mt-2 text-sm text-gray-300">
//                         A list of all the available pools of the protocol including their name, value, apy and address.
//                     </p>
//                 </div>
//                 {/* <div className=" mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//                     <button
//                         type="button"
//                         className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//                     >
//                         (?)
//                     </button>
//                 </div> */}
//             </div>
//             <div className="mt-8 flex flex-col">
//                 <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                     <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//                         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//                             <table className="min-w-full divide-y divide-gray-300">
//                                 <thead className="bg-gray-50 bg-opacity-5 text-white">
//                                     <tr>
//                                         <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6">
//                                             Name
//                                         </th>
//                                         <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
//                                             Value
//                                         </th>
//                                         <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
//                                             APY
//                                         </th>
//                                         <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
//                                             Address
//                                         </th>
//                                         <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
//                                             <span className="sr-only">Edit</span>
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200 bg-white bg-opacity-5">
//                                     {availablePools.map((pools) => (
//                                         <tr key={pools.infos}>
//                                             <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                                                 <div className="flex items-center">
//                                                     <div className="h-10 w-10 flex-shrink-0">
//                                                         <img className="h-10 w-10 rounded-full" src={pools.image} alt="" />
//                                                     </div>
//                                                     <div className="ml-4">
//                                                         <div className="font-medium text-white">{pools.name}</div>
//                                                         <div className="text-gray-500">{pools.infos}</div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                                                 <div className="text-white">{pools.tvl} tvl</div>
//                                                 <div className="text-gray-500">{pools.amountLocked} locked amount</div>
//                                             </td>
//                                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                                                 <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                                                 {pools.apy}
//                                                 </span>
//                                             </td>
//                                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{pools.ibTokenAddress}</td>
//                                             <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                                                 <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                                                     More<span className="sr-only">, {pools.name}</span>
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



// export default PoolsTable;