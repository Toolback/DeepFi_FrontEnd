import { useContext, useState } from 'react'
import { AppRouteStoreContext } from '../data/StoreAppRouter'
import AppContentManager from '../utils/AppContentManager'

import LayoutTop from '../sections/app/LayoutTop'
import LayoutBottom from '../sections/app/LayoutBottom'
import LayoutLeft from '../sections/app/LayoutLeft'
import ModaleMenu from '../components/app/ModaleMenu'
import ModaleConnect from '../components/app/ModaleConnect'

const App = () => {
    const { stateAppRoute } = useContext(AppRouteStoreContext);
    const { destination } = stateAppRoute; // Fetch from store

    const generateAppData = () => {
        switch (destination) {
            case 'news':
                return generateView(destination)

            case 'pools':
                return generateView(destination)

            case 'stake':
                return generateView(destination)

            case 'bonds':
                return generateView(destination)

            case 'dashboard':
                return generateView(destination)

            case 'admin':
                return generateView(destination)

            default:
                break;
        }
    };

    const generateView = (destination) => {
        // console.log('- generateView : destination + StateAppData ', destination, stateAppData + '+ accounts', accounts)
        const [modaleMenuStatus, setModaleMenuStatus] = useState(false);
        const [modaleConnectStatus, setModaleConnectStatus] = useState(false);

        return (

            <div className='bg-primary-black flex justify-center overflow-hidden h-auto w-full'>
                {modaleConnectStatus == true ? (<ModaleConnect setModaleConnectStatus={setModaleConnectStatus} />) : (<></>)}
                {/* <div className='hidden md:flex  w-[250px] h-auto border-r border-gray-500 border-dashed'>
                    <LayoutLeft destination={destination} />
                    <div className="gradient-02 z-0" />
                </div> */}

                <div className='w-full h-full md:px-16 px-6 '>
                    <div className='w-full h-full'>
                        <LayoutTop destination={destination} modaleConnectStatus={modaleConnectStatus} setModaleConnectStatus={setModaleConnectStatus} modaleMenuStatus={modaleMenuStatus} setModaleMenuStatus={setModaleMenuStatus} />
                        {modaleMenuStatus == true ? (<ModaleMenu setModaleMenuStatus={setModaleMenuStatus} />) : (<></>)}

                    </div>
                    <div className='w-full h-full text-white'>
                        <AppContentManager destination={destination} data={setModaleConnectStatus} />
                    </div>
                    <div className=" hidden sm:flex gradient-04 z-0" />

                    <div className='w-full h-full'>
                        <LayoutBottom destination={destination}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {generateAppData()}
        </>
    )
}

export default App;