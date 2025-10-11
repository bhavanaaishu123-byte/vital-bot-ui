import { useState } from "react";
import { toast } from "sonner";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import HealthTopicCard from "@/components/HealthTopicCard";
import WelcomeMessage from "@/components/WelcomeMessage";
import ChatInput from "@/components/ChatInput";

const Index = () => {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);

  const healthTopics = [
    { icon: "🌡", title: "Fever Management" },
    { icon: "🤕", title: "Headache Relief" },
    { icon: "🤧", title: "Cold Prevention" },
    { icon: "🫁", title: "Cough Treatment" },
    { icon: "😷", title: "COVID-19 Prevention" },
    { icon: "❤️", title: "Heart Health" },
  ];

  const handleTopicClick = (topic: string) => {
    toast.success(`Loading information about ${topic}...`);
    handleSendMessage(`Tell me about ${topic}`);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage = { role: "user", content: message };
    setChatMessages((prev) => [...prev, userMessage]);
    
    toast.info("Processing your health query...");
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...chatMessages, userMessage],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "I apologize, but I couldn't generate a response.",
        },
      ]);
      
      toast.success("Response received!");
    } catch (error) {
      console.error('Error calling health-chat:', error);
      toast.error("Failed to get response. Please try again.");
      
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2 tracking-tight">
            Advanced AI Health Assistant
          </h1>
          <p className="text-muted-foreground text-lg">Your Personal Health Prevention Companion</p>
        </header>

        {/* Disclaimer */}
        <DisclaimerBanner />

        {/* Quick Health Topics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Quick Health Topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {healthTopics.map((topic, index) => (
              <HealthTopicCard
                key={index}
                icon={topic.icon}
                title={topic.title}
                onClick={() => handleTopicClick(topic.title)}
              />
            ))}
          </div>
        </section>

        {/* Welcome Message */}
        <WelcomeMessage />

        {/* Chat Messages */}
        {chatMessages.length > 0 && (
          <div className="mb-8 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                    : "bg-card text-card-foreground border border-border max-w-[85%]"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Chat Input */}
        <div className="sticky bottom-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Index;
