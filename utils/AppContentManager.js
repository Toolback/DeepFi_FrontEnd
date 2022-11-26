import News from '../sections/app/News'
import Pools from '../sections/app/Pools'
import Stake from '../sections/app/Stake'
import Bonds from '../sections/app/Bonds'
import Dashboard from '../sections/app/Dashboard'
import Admin from '../sections/app/Admin'






const AppViewManager = ({ destination, data }) => {

  const generateProtocolView = () => {
    switch (destination) {
      case 'news':
        return <News data={data} />

      case 'pools':
        return <Pools data={data} />


      case 'stake':
        return <Stake data={data} />

      case 'bonds':
        return <Bonds data={data} />

      case 'dashboard':
        return <Dashboard data={data} />

      case 'admin':
        return <Admin data={data} />



      default:
        break;


    }
  };

  return (
    (generateProtocolView())

  )
}

export default AppViewManager;