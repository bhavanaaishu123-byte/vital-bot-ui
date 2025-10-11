import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info("Voice input feature coming soon!");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message…"
          className="pr-12 h-12 rounded-full bg-card border-border"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleVoiceInput}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${
            isRecording ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>
      <Button
        size="icon"
        onClick={handleSend}
        disabled={!message.trim()}
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
