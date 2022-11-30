
import StatsCards from '../../components/app/StatsCards';
import StakeCard from '../../components/app/StakeCard';

const Stake = () => {
  const stats = [
    { name: 'Total Deposit', stat: 'N/a' },
    { name: 'Total Claimable', stat: 'N/a' },
    { name: 'Total Earned', stat: 'N/a' },
  ]
  return (
    <>
      {/* <h3 className="pb-2 text-xl font-semibold text-white">My Summary</h3> */}
      {/* <StatsCards stats={stats} /> */}
      <div className='flex flex-col h-full w-auto '>

      <h3 className="pb-2 text-center text-xl font-semibold text-white">Stake your DeepFi Tokens</h3>
      <StakeCard />
      </div>
    </>

  )
}

export default Stake