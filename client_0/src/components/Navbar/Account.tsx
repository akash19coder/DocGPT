import React, { useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import Button from '../Button'
import AccountModel from '../Modals/AccountModel';
import { useAuth } from '../../contexts/AuthContext';

const Account = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const auth = useAuth();
  const toggleModal = () => {
    setShowModel(!showModel);
  }
  return (
    <div className="flex-item-0-item-2">
      <h3>
        <MdAccountCircle size='30px' />
        <span onClick={toggleModal} > More Options </span>
        {showModel && <AccountModel/>}
      </h3>
    </div>
  )
}

export default Account