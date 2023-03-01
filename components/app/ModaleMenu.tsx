import Link from 'next/link';
import { useContext } from 'react'
import { AppRouteStoreContext } from '../../data/StoreAppRouter'


const ModaleMenu = ({setModaleMenuStatus} : any) => {
    const { dispatchAppRoute } = useContext(AppRouteStoreContext);

    const handleNavClick = (paramRoute : any) => {
        let dDataAppRoute = paramRoute;
        setModaleMenuStatus(false);
        return dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute })
    }

    return (
        <div className="flex justify-center pb-8" role="status">
            <div className='flex flex-col gap-2 font-normal text-white text-[20px] '>
                {/* <button className="hover:font-extrabold" onClick={() => handleNavClick('news')}>News</button> */}
                <button className="hover:font-extrabold" onClick={() => handleNavClick('dashboard')}>Dashboard</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>Stake</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>Bonds</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('dashboard')}>Docs</button>
                <Link href="/"><button>Home</button></Link>

            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default ModaleMenu;