import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import Authenticaton from './pages/Authentication';


import { Routes, Route } from 'react-router';

import { pdfjs } from 'react-pdf';
import VerifyOTP from './pages/VerifyOTP';
import Notifications from './components/Modals/Notifications';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   'pdfjs-dist/build/pdf.worker.min.js',
   import.meta.url,
).toString();

function App() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/new-chat" element={<HomePage />} />
         <Route path="/login" element={<Authenticaton />} />
         <Route path="/signup" element={<Authenticaton />} />
         <Route path="/chat/:chatID?" element={<ChatPage />} />
         <Route path="/verifyOTP/:otp?" element={<Authenticaton />} />
         <Route path='/notification' element = {<Notifications message='I am notification' buttonName='OK'/>}/>
      </Routes>
   );
}

export default App
