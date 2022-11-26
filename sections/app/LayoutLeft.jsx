import Link from 'next/link';
import { useContext } from 'react'
import { AppRouteStoreContext } from '../../data/StoreAppRouter'


const LayoutLeft = () => {
    const { dispatchAppRoute } = useContext(AppRouteStoreContext);

    const handleNavClick = (paramRoute) => {
        let dDataAppRoute = paramRoute;
        return dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute })
    }

    return (
        <div className='bg-primary-black h-screen border-r-10 rounded border-white'>
            <div className='absolute left-8 bottom-1/2 flex flex-col '>
                <button className="" onClick={() => handleNavClick('news')}>News</button>
                <button className="" onClick={() => handleNavClick('pools')}>Pools</button>
                <button className="" onClick={() => handleNavClick('stake')}>Stake</button>
                <button className="" onClick={() => handleNavClick('bonds')}>Bonds</button>
                <button className="" onClick={() => handleNavClick('dashboard')}>Dashboard</button>

            </div>
            <div className='absolute left-8 bottom-10 flex flex-col'>
                <button className="" onClick={() => handleNavClick('stake')}>Docs</button>
                <button className="" onClick={() => handleNavClick('bonds')}>Help</button>
                <Link href="/"><button>Home</button></Link>
            </div>
        </div>
    )
}

export default LayoutLeft