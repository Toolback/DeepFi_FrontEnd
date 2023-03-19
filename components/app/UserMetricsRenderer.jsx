import { useEffect, useState } from "react";
import Loader from "./Loader";

const UserMetricsRenderer = ({ metric }) => {


  return (

    <div key={metric.name} className="overflow-hidden flex flex-col items-center px-4 py-5 sm:p-6  ">
      <dt className="truncate text-sm font-medium text-gray-300">{metric.name}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight">{metric.stat}</dd>
    </div>

  )



}

export default UserMetricsRenderer