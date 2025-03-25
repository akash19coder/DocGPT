import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDocument } from "../utils/documentSlice";
import { addMessage } from "../utils/chatSlice";

export function TinyGradientFooter({ id }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileRef = useRef();
  const messageRef = useRef();

  const handleFile = () => {
    fileRef.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select file");
    } else {
      console.log(e.target.files[0]);
      setSelectedFile(file);
    }
  };

  const handleSend = async () => {
    if (id === null) {
      console.log("your document was null");
      return;
    }

    // saving user message in store
    dispatch(
      addMessage({
        role: "user",
        content: messageRef.current.value,
      })
    );

    const response = await fetch(
      `http://localhost:3002/api/v1/chat/normal-reply/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ prompt: messageRef.current.value }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("i a data", data.answer);
    dispatch(addMessage({ role: "system", content: data.answer }));
  };

  // Use a separate Hook for it to optimize it
  useEffect(() => {
    const handleFileSubmit = async () => {
      const form = new FormData();
      if (selectedFile === null) {
        console.log("the file is empty right now");
        return;
      }
      form.append("pdfName", selectedFile);

      console.log(form.get("pdfName"));

      const response = await fetch(
        "http://localhost:3002/api/v1/document/upload",
        {
          method: "POST",
          body: form,
          credentials: "include",

          // TODO: i removed it and it worked why??
          // headers: {
          //   "Content-Type": "application/pdf",
          // },
        }
      );

      const data = await response.json();

      console.log(data);
      // setDocumentId(data._id);
      dispatch(
        addMessage({ role: "system", content: "How can i help you today?" })
      );
      dispatch(addDocument(data));
      navigate(`/chat/${data._id.toString()}`);
    };
    handleFileSubmit();
  }, [selectedFile]);

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <div className="flex items-center space-x-2 bg-muted rounded-lg">
        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild> */}
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={handleFile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <span className="sr-only">Upload file</span>
        </Button>
        {/* </DialogTrigger> */}
        {/* <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Upload Source</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {uploadOptions.map((option) => (
                <Button
                  key={option.key}
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.text}
                </Button>
              ))}
            </div>
          </DialogContent> */}
        {/* </Dialog> */}
        <input
          ref={fileRef}
          onChange={handleFileInput}
          accept="application/pdf"
          type="file"
          className="hidden"
        />
        <Input
          ref={messageRef}
          className="flex-grow"
          placeholder="Type your message..."
        />
        <Button onClick={handleSend} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  );
}
