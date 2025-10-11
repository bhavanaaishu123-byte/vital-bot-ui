import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DisclaimerBanner = () => {
  return (
    <Alert className="bg-warning/10 border-warning/30 mb-8">
      <AlertTriangle className="h-5 w-5 text-warning" />
      <AlertDescription className="text-sm text-foreground ml-2">
        <strong>Medical Disclaimer:</strong> The AI provides general health information only. 
        Always consult healthcare professionals for medical advice, diagnosis, or treatment. 
        In emergencies, call <strong>911 (US)</strong> or <strong>102 (India)</strong>.
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBanner;
