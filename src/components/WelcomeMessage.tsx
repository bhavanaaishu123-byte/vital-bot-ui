import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-foreground leading-relaxed">
            Hello! I'm your <strong>Advanced AI Health Prevention Assistant</strong> with voice capabilities. 
            I can help you understand disease prevention strategies, symptoms management, and healthy lifestyle recommendations. 
            What would you like to know about preventing diseases or maintaining good health?
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
