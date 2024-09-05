import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
  variant?: "Default" | "Glass-Effect" | "Gradiant";
}

export const Container = ({
  children,
  className,
  variant = "Default",
}: Props) => {
  let bgStyles: string = "";

  switch (variant) {
    case "Default":
      bgStyles = "";
      break;
    case "Glass-Effect":
      bgStyles = "glass-effect";
      break;
    case "Gradiant":
      bgStyles = "gradiant-effect";
      break;
  }

  return <div className={cn(bgStyles, className)}>{children}</div>;
};
