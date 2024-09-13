import '../../src/assets/css/Home.css';
import Navbar from '../components/Navbar';
import MainBody from '../components/MainBody';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import Authentication from './Authentication';

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {
        auth?.isLoggedIn == false ? (
          <>
            {navigate('/signup')}
            <Authentication />
           
          </>
        ) :
        (
          <div className='main-container'>
        <Navbar />
        <MainBody />
      </div>
        )
      }
    </>
  )
}

export default HomePage;