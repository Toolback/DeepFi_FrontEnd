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
        { name: 'Total Subscribers', stat: '71,897' },
        { name: 'Avg. Open Rate', stat: '58.16%' },
        { name: 'Avg. Click Rate', stat: '24.57%' },
      ]
    
    return (
        <div className="">
            <StatsCards />
            <PoolsNews />
        <PoolsTable availablePools={availablePools}/>
        </div>
    )
}

export default Pools