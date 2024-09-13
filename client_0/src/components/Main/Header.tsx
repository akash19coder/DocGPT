import { MdMenu, MdAdd } from "react-icons/md";
import { useNavbar } from "../../contexts/NavbarContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleNavbar } = useNavbar();
  return (
    <div className="flex-item-1-item-0">
      <h1>
        <span className = "float-left">
          <MdMenu style = {{ width: '28px', height: '28px' }} onClick={toggleNavbar} />
        </span>
        DocGPT
        <span className="float-right">
          <Link to='/'>
            <MdAdd style={{ width: '28px', height: '28px' }} />
          </Link>
        </span>
      </h1>
    </div>
  )
}

export default Header;
