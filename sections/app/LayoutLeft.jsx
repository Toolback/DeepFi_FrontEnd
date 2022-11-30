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
        <div className=' text-white flex flex-col h-screen py-2 px-8 justify-between border-r border-gray-500 border-dashed'>
                      <Link href="/">
            <button type="button">
                <h2 className="font-extrabold text-[24px] leading-[30.24px] ">
                    Deposit.Finance
                </h2>
            </button>
          </Link>
            <div className='flex flex-col gap-2 font-normal sm:text-[23px] text-[20px] '>
                {/* <button className="hover:font-extrabold" onClick={() => handleNavClick('news')}>News</button> */}
                <button className="hover:font-extrabold" onClick={() => handleNavClick('pools')}>Pools</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>Stake</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>Bonds</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('dashboard')}>Dashboard</button>

            </div>
            <div className='flex flex-col'>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>Docs</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>Help</button>
                <Link href="/"><button>Home</button></Link>
            </div>
        </div>
    )
}

export default LayoutLeft