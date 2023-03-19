import App_Page from '../sections/app/dashboard/App_Page'
import Admin_Page from '../sections/admin/Admin_Page'

const AppViewManager = ({ destination, data }) => {

  const generateProtocolView = () => {
    switch (destination) {

      case 'appPage':
        return <App_Page data={data} />

      case 'adminPage':
        return <Admin_Page data={data} />

      default:
        break;
    }
  };

  return (
    (generateProtocolView())
  )
}

export default AppViewManager;