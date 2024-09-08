import React, { useRef } from "react";
import { SiAddthis } from "react-icons/si";
import { IoMdSend } from "react-icons/io";
import { uploadUserDocument } from "../../helpers/api-communicator";
import { sendUserMessage } from "../../helpers/api-communicator";
import { useChat } from "../../contexts/ChatContext";
import { useParams } from "react-router";

const FileInput: React.FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const messageInput = useRef<HTMLTextAreaElement>(null);
    const chat = useChat();
    const { chatID } = useParams();

    const handleFileSubmit = (e) => {
        e.preventDefault();
        
        fileInput.current.click();
    }
    
    const handleFileInputChange = async (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            await uploadUserDocument(selectedFile, chat.chatID);
        }
    }
    const handleMessageSubmit = async (e) => {
        e.preventDefault();

        const message = {
            role: 'user',
            content: messageInput.current?.value
        }
        
        chat.pushUserMessagesToConversation(message);
        const userChat = await sendUserMessage(messageInput.current?.value, chatID)
        console.log('userchat:',userChat);
        chat.updateUserMessageWithOpenAIResponse(userChat.conversation);
        chat.updateUserPdfUrl(userChat.pdfSecureUrl);
        messageInput.current.value = "";
    }

    return (
        <>
            <div>
                <form encType="multipart/form-data">
                    {/* Attach the ref to the file input */}
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileInputChange}
                        ref={fileInput}
                    />
                </form>
                <button type="button" className="btn-0" onClick={handleFileSubmit}>
                    <SiAddthis style={{ width: '32px', height: '32px' }} />
                </button> 
            </div>
            <div className="text-and-button-container">
                <form>
                    <textarea
                        ref={messageInput}
                        name=""
                        id="indexTextarea"
                        cols={80}
                        rows={1}
                        placeholder=""
                    ></textarea>
                    <sup>
                        <button type="submit" className="btn-1" onClick={handleMessageSubmit}>
                            <IoMdSend style={{ width: '32px', height: '32px' }} />
                        </button>
                    </sup>
                </form>

            </div>
        </>
    );
};

export default FileInput;
