import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { generateUniqueID } from "../helpers/uuid";

type UserChat = {
    conversation: object[];
    pdfSecureUrl: string;
    chatID: string,
    getChatMessages: (conversation:object[]) => void;
    pushUserMessagesToConversation: (message: object) => void;
    updateUserMessageWithOpenAIResponse: (conversation: object[]) => void;
    updateUserPdfUrl: (url: string) => void;
}

const ChatContext = createContext<UserChat | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [conversation, setConversation] = useState<object[]>([]); // Adjust the type according to your conversation structure
    const [pdfSecureUrl, setPdfSecureUrl] = useState<string | null>(null);
    const [chatID, setChatID] = useState<string>('');
    
    const pushUserMessagesToConversation = (message: object) => { // Adjust the type according to your message structure
        setConversation((prev) => [...prev, message]);
    }

    const updateUserMessageWithOpenAIResponse = (conversation: object[]) => {
        setConversation(conversation)
    }

    const updateUserPdfUrl = (url: string) => {
        console.log(url);
        setPdfSecureUrl(url)
    }
    const getChatMessages = (conversation:object[]) => {
       setConversation(conversation);
    }

    useEffect(() => {
        const uniqueID = generateUniqueID();
        setChatID(uniqueID);
    }, [])

    const value = {
        conversation,
        pdfSecureUrl,
        chatID,
        getChatMessages,
        pushUserMessagesToConversation,
        updateUserMessageWithOpenAIResponse,
        updateUserPdfUrl
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
