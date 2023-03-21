import VaultHero from './VaultHero'
import VaultsRender from './VaultsRender'
import VaultMetrics from "./VaultMetrics";

const App_Page = ({ data }) => {
    
    const userMetrics = [
        { name: 'Total Deposit', stat: 'N/a' },
        { name: 'Total Claimable', stat: 'N/a' },
        { name: 'Total Earned', stat: 'N/a' },
        { name: 'Actual Deepfi Balance', stat: '' }
    ]
    const treasury = [
        { name: 'MMY', stat: 'N/a', src: "https://s2.coinmarketcap.com/static/img/coins/64x64/23038.png" },
        { name: 'X', stat: 'N/a' },
        // { name: 'Total Earned', stat: 'N/a' },
        // { name: 'Actual Deepfi Balance', stat: 'N/a' }
    ]
    return (
        <div className="overflow-hidden">
            {/* <div className="absolute w-[20%] h-[30%]  gradient-01" /> */}

                <VaultHero />
                <div className=" hidden sm:flex gradient-06 " />
                <div className=" hidden sm:flex gradient-07 " />
                <VaultsRender setModaleConnectStatus={data} />
                <VaultMetrics treasury={treasury} userMetrics={userMetrics} />
        </div>
    )
}

export default App_Page