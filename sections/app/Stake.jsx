
import StatsCards from '../../components/app/StatsCards';
import StakeCard from '../../components/app/StakeCard';
import StakeNews from '../../components/app/StakeNews';

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
      <div className='flex flex-col h-full w-auto  '>

      <StakeNews>
      <StakeCard />
      </StakeNews>
      </div>
    </>

  )
}

export default Stake