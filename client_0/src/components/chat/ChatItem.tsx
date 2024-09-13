import { GiProcessor } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import docgptImage from '../../assets/img/docgpt.png';

const ChatItem = ({ message, role }: { message: string, role: string }) => {
    if (role === "user") {
        return (
            <div className="user-chat-item">
                <div>
                    <CgProfile style={{ width: "5vw", height: "5vh" }} />
                </div>
                <div>
                    {message}
                </div>
            </div>
        );
    } else {
        return (
            <div className="gpt-response-item">
                <div>
                    <GiProcessor style={{ width: "5vw", height: "5vh" }} />
                </div>
                <div>
                    {message}
                </div>
            </div>
        );
    }
};

export default ChatItem;
