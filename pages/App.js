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
            <div className='bg-primary-black overflow-hidden text-white'>
                <div className=''>
                    <LayoutTop destination={destination} />
                    <div className="gradient-03 z-0" />

                </div>

                <div className='flex flex-rows w-full'>
                    <div className='w-1/3 	'>
                        <LayoutLeft destination={destination} /> 
                    </div>
                    <div className='flex w-full justify-center'>
                        <AppContentManager destination={destination} />
                    </div>
                    <div className="gradient-04 z-0" />
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