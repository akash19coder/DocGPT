import { useState } from "react";
import { SidebarComponent } from "./SidebarComponent";
import { MainComponent } from "./MainComponent";

//              Chat()
export default function Chat() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <MainComponent isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </div>
  );
}
