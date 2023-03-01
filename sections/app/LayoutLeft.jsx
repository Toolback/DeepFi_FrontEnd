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
                            <h2 className="pt-4 font-extrabold text-[24px] leading-[30.24px] ">
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
                    <div className='flex pb-6 gap-4 justify-center'>
                        <button className="hover:font-extrabold" onClick={() => handleNavClick('stake')}>
                            <img
                                // key={social.name}
                                src="iconDocs.png"
                                // alt={social.name}
                                className="w-[24px] h-[24px] object-contain cursor-pointer"
                            />
                        </button>
                        <button className="hover:font-extrabold" onClick={() => handleNavClick('bonds')}>
                            <img
                                // key={social.name}
                                src="iconQuestions.png"
                                // alt={social.name}
                                className="w-[24px] h-[24px] object-contain cursor-pointer"
                            />
                        </button>
                        <Link href="/">
                            <button>
                                <img
                                    // key={social.name}
                                    src="iconHome.png"
                                    // alt={social.name}
                                    className="w-[24px] h-[24px] object-contain cursor-pointer"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutLeft