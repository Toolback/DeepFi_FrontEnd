import PoolsTable from "../../components/app/PoolsTable"


const Pools = () => {
    const availablePools = [
        {
            name: "Usdt",
            infos: "Safe Strategy",
            ibTokenAddress: "0x0",
            tvl: "100'000", 
            image:""
        },
        {
            asset: "Dai",
            ibTokenAddress: "0x0",
            tvl: "0", 
        }
    ]
    return (
        <div className="">
        <PoolsTable availablePools={availablePools}/>
        </div>
    )
}

export default Pools