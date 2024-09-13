
import '../../assets/css/Notifications.css';

const Notifications = ({ message, buttonName, onButtonClick }: { message: string; buttonName: string, onButtonClick: () => void }) => {
  const handleOkButtonClick = () => {
    onButtonClick();
  }
  const handleCancelButtonClick = ()=> {
    window.location.href = '/new-chat'
  }
  return (
    <div className="notification">
      <h3>{message}</h3>
      <button onClick={handleOkButtonClick} className="ok">{buttonName}</button>
      <button onClick={handleCancelButtonClick} className="cancel">Cancel</button>
    </div>
  );
};

export default Notifications;