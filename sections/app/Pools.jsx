import PoolsTable from "../../components/app/PoolsTable"
import StatsCards from '../../components/app/StatsCards'
import PoolsNews from '../../components/app/PoolsNews'

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
    const stats = [
            { name: 'Total Deposit', stat: 'N/a' },
            { name: 'Total Claimable', stat: 'N/a' },
            { name: 'Total Earned', stat: 'N/a' },
            { name: 'Total IbTokens', stat: 'N/a' }
          ]
    return (
        <>
        <div className="hidden sm:block">
                <h3 className="pb-2 text-xl font-semibold text-white">My Summary</h3>
            <StatsCards  stats={stats}/>
        </div>
        <PoolsNews />
        <PoolsTable availablePools={availablePools}/>
        <div className="sm:hidden">
                <h3 className="pb-2 text-xl font-semibold text-white">My Summary</h3>
            <StatsCards  stats={stats}/>
        </div>
        </>
    )
}

export default Pools