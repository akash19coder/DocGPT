import { MdOutlineSettings, MdLogout, MdOutlineHelpCenter, MdEdit } from "react-icons/md";
const AccountModel = () => {
  return (
    <div className='modal'>
      <div className="more-options">
        <div>
          <MdEdit size={22} />
        </div>
        <div>
          <span> Custom Instructions </span>
        </div>
      </div>
      <div className="more-options">
        <div>
          <MdOutlineSettings size={22} />
        </div>
        <div>
          <span>Settings</span>
        </div>
      </div>
      <div className="more-options">
        <div>
          <MdOutlineHelpCenter size={22} />
        </div>
        <div>
          <span> Help and FAQ</span>
        </div>
      </div>
      <hr />
      <div className="more-options">
        <div>
          <MdLogout size={22} />
        </div>
        <div>
          <span>Logout</span>
        </div> 
      </div>
    </div>
  )
}

export default AccountModel
