import React, { useEffect } from 'react'
import Link from 'next/link';

const ContractInfoRenderer = ({contract}) => {

    // console.log("Contract Retrieved : ", contract)
  return (
        <dl key={contract.name} className="border mt-8  border-white border-opacity-20 drop-shadow-lg rounded p-2">
          <div className="pb-2 flex justify-between">
            <h3 className="font-extrabold">{contract.name}</h3>
            <Link href={contract.link}>
              <button className="transition duration-200 ease hover:-translate-y-[1.5px] text-blue-400">Contract</button>
            </Link>
          </div>
          <p>{contract.description}</p>
        </dl>
  )
}

export default ContractInfoRenderer