import { useContext, useState } from 'react'
import { AppRouteStoreContext } from '../data/StoreAppRouter'
import AppContentManager from '../utils/AppContentManager'

import LayoutTop from '../sections/app/LayoutTop'
import LayoutLeft from '../sections/app/LayoutLeft'
import ModaleMenu from '../components/app/ModaleMenu'

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
        return (
            <div className='bg-primary-black flex overflow-hidden h-auto w-screen'>
                <div className='hidden md:flex  w-[250px] h-auto border-r border-gray-500 border-dashed'>
                    {/* <div className=''> */}
                        <LayoutLeft destination={destination} />
                    {/* </div> */}
                    <div className="gradient-02 z-0" />
                </div>

                <div className='w-full h-full md:px-16 px-6 '>
                    <div className='w-full h-full'>
                        <LayoutTop destination={destination} modaleMenuStatus={modaleMenuStatus} setModaleMenuStatus={setModaleMenuStatus}/>
                {modaleMenuStatus == true ? (<ModaleMenu setModaleMenuStatus={setModaleMenuStatus}/>) : (<></>)}
                    </div>
                    <div className='w-full h-full text-white'>
                        <AppContentManager destination={destination} />
                    </div>
                    <div className=" hidden sm:flex gradient-04 z-0" />
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