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
            <div className='bg-primary-black flex w-full overflow-hidden '>
                <div className='hidden md:block md:justify-start'>
                        <LayoutLeft destination={destination} /> 
                    <div className="gradient-03 z-0" />

                </div>

                <div className='w-full justify-center'>
                    <div className='flex justify-end w-full'>
                    <LayoutTop destination={destination} />
                    </div>
                    <div className='flex justify-center text-white'>
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