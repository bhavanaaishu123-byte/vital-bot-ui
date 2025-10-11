import { Card } from "@/components/ui/card";

interface HealthTopicCardProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

const HealthTopicCard = ({ icon, title, onClick }: HealthTopicCardProps) => {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-card border-border"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-4xl" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
    </Card>
  );
};

export default HealthTopicCard;
