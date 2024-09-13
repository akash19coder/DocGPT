import Newchat from './Navbar/Newchat'
import ChatHistory from './Navbar/ChatHistory'
import Account from './Navbar/Account'
import { useNavbar } from '../contexts/NavbarContext'

const Navbar = () => {
  const { showNavbar } = useNavbar();
  return (
    <div className={`main-flex-item-0 ${showNavbar ? 'showSideBar' : ''}`}>
      <Newchat />
      <ChatHistory />
      <Account />
    </div>
  )
}

export default Navbar