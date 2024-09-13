import { CgAdd } from 'react-icons/cg'
import { MdClose } from "react-icons/md";
import { useNavbar } from '../../contexts/NavbarContext';

const Newchat = () => {
  const { toggleNavbar } = useNavbar();
  return (
    <div className="flex-item-0-item-0">
      <div>
        <a href="/">
          <CgAdd style={{ width: '22px', height: '22px' }} />
          <span> New Chat </span>
        </a>
      </div>
      <button>
        <MdClose style={{ width: '22px', height: '22px' }} onClick={toggleNavbar} />
      </button>
    </div>
  )
}

export default Newchat
