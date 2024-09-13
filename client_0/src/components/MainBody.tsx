import { LuSun } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

import Header from './Main/Header'
import InfoItem from './Main/InfoItem'
import InputBox from './InputBox'

const MainBody = () => {

  return (
    <div className='main-flex-item-1'>
      <Header />
      <div className='flex-item-1-item-1'>
        <InfoItem sectionClass='Capabilities' icon={<LuSun style={{ width: '32px', height: '32px' }} />} />
        <InfoItem sectionClass='Limatations' icon={<CgDanger style={{ width: '32px', height: '32px' }} />} />
        <InfoItem sectionClass='Examples' icon={<AiOutlineThunderbolt style={{ width: '32px', height: '32px' }} />} />
      </div>
      <InputBox />
    </div>
  )
}
export default MainBody