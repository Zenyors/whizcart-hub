
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  isLoading?: boolean;
  style?: React.CSSProperties; // Add style prop to the interface
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  isLoading = false,
  style, // Add style to the component props
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 card-shadow",
        className
      )}
      style={style} // Pass the style prop to the Card component
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {Icon && (
            <div className="rounded-md bg-secondary p-2">
              <Icon className="h-4 w-4 text-foreground opacity-70" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            {description && <div className="h-4 w-full animate-pulse rounded-md bg-muted" />}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-baseline">
              <h2 className="text-2xl font-bold tracking-tight">
                {value}
              </h2>
              {trend && (
                <span
                  className={cn(
                    "ml-2 text-xs font-medium",
                    trend.positive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {trend.positive ? "+" : "-"}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
