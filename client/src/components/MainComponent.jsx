import { AvatarMenu } from "./AvatarMenu";
import { ChatComponent } from "./ChatComponent";
import Header from "./Header";
import { LogoWithDropdownComponent } from "./LogoWithDropdownComponent";
import { TinyGradientFooter } from "./TinyGradientFooter";
import ChatInterface from "./ChatInterface";

export function MainComponent({ isExpanded, setIsExpanded }) {
  return (
    <div className="flex flex-col flex-grow">
      <Header isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* when messages changes */}
      <ChatInterface />
    </div>
  );
}
