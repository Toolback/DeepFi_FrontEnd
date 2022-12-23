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
        <div className=' text-white  h-screen w-[250px]'>
            <div className='fixed h-screen pl-6'>
                <div className='flex flex-col h-screen justify-between '>

                      <Link href="/">
            <button type="button">
                <h2 className="pt-2 font-extrabold text-[24px] leading-[30.24px] ">
                    Deposit.Finance
                </h2>
            </button>
          </Link>
            <div className='flex flex-col gap-2 font-normal sm:text-[23px] text-[20px] '>
                {/* <button className="hover:font-extrabold" onClick={() => handleNavClick('news')}>News</button> */}
                <button className="hover:font-extrabold" onClick={() => handleNavClick('dashboard')}>Dashboard</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>Stake</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>Bonds</button>

            </div>
            <div className='flex flex-col'>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>Docs</button>
                <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>Help</button>
                <Link href="/"><button>Home</button></Link>
            </div>
                </div>
        </div>
        </div>
    )
}

export default LayoutLeft