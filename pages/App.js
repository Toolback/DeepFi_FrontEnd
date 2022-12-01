import { useContext } from 'react'
import { AppRouteStoreContext } from '../data/StoreAppRouter'
import AppContentManager from '../utils/AppContentManager'

import LayoutTop from '../sections/app/LayoutTop'
import LayoutLeft from '../sections/app/LayoutLeft'

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

        return (
            <div className='bg-primary-black flex overflow-hidden '>
                <div className='hidden sm:flex sm:justify-start'>
                    <div className=''>
                        <LayoutLeft destination={destination} />
                    </div>
                    <div className="gradient-02 z-0" />
                </div>

                <div className='w-full h-auto sm:px-16 px-6 justify-center'>
                    <div className=''>
                        <LayoutTop destination={destination} />
                    </div>
                    <div className='h-full text-white'>
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