import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useChat } from '../contexts/ChatContext';
import Notifications from './Modals/Notifications';

const PdfViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showNotification, setShowNotifcation] = useState<boolean>(true);
    const chat = useChat();

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <>
            {showNotification && numPages && numPages > 1 ? (
                <Notifications
                    message='We only accept single page doc currently!'
                    buttonName='OK'
                    onButtonClick={() => {
                        setShowNotifcation(false);
                    }}
                />
            ) : (
                <div>
                    <Document file={chat.pdfSecureUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        {/* Set scale prop to adjust canvas size */}
                        <Page pageNumber={pageNumber} scale={1.5} renderTextLayer={false} renderAnnotationLayer={false} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            )}
        </>
    );
};

export default PdfViewer;
