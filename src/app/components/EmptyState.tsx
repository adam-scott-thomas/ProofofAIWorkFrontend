import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-12 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F7]">
          <Icon className="h-8 w-8 text-[#717182]" />
        </div>
        <h3 className="mb-2 text-[15px]">{title}</h3>
        <p className="mb-6 max-w-md text-[14px] text-[#717182]">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </div>
    </Card>
  );
}
