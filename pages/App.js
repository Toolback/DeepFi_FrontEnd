import { useContext, useState } from 'react'
import { AppRouteStoreContext } from '../data/StoreAppRouter'
import AppContentManager from '../utils/AppContentManager'

import {LayoutTop, LayoutBottom } from 'sections/app/dashboard'


const App = () => {
    const { stateAppRoute } = useContext(AppRouteStoreContext);
    const { destination } = stateAppRoute; // Fetch from store

    const generateAppData = () => {
        switch (destination) {
            case 'appPage':
                return generateView(destination)

            case 'adminPage':
                return generateView(destination)

            default:
                break;
        }
    };

    const generateView = (destination) => {
        return (
            <div className='bg-primary-black flex justify-center overflow-hidden h-auto w-full'>
                <div className='w-full h-full md:px-16 px-6 '>
                    <div className='w-full h-full'>
                        <LayoutTop destination={destination}/>
                    </div>

                    <div className='w-full h-full relative z-30 text-white'>
                        <AppContentManager destination={destination} />
                    </div>
                    <div className=" hidden sm:flex gradient-04 " />

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