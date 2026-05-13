import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Badge } from "@/components/ui/badge";
import type { ProviderAccount } from "../types";

interface ProviderModalIntroProps {
  provider?: ProviderAccount | null;
}

export default function ProviderModalIntro({
  provider,
}: ProviderModalIntroProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted p-3">
        <ForwardedIconComponent
          name="WatsonxOrchestrate"
          className="h-8 w-8 text-foreground"
        />
        <span className="text-sm font-medium">watsonx Orchestrate</span>
        <Badge variant="purpleStatic" size="xq" className="shrink-0">
          Beta
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {provider ? (
          "Update environment name or rotate API key. Service instance URL is fixed after creation."
        ) : (
          <>
            Configure your watsonx Orchestrate credentials below. New to wxO?{" "}
            <a
              href="https://www.ibm.com/products/watsonx-orchestrate#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Sign up for watsonx Orchestrate
            </a>
            . Already have an account?{" "}
            <a
              href="https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=api-getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Find your credentials
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
