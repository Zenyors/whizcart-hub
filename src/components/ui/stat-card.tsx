
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
  style?: React.CSSProperties;
  color?: string;
  iconClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  trendClassName?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  isLoading = false,
  style,
  color,
  iconClassName,
  valueClassName,
  titleClassName,
  descriptionClassName,
  trendClassName,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 card-shadow",
        className
      )}
      style={{ 
        ...style,
        borderTop: color ? `3px solid ${color}` : undefined,
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium text-muted-foreground", titleClassName)}>{title}</p>
          {Icon && (
            <div className={cn("rounded-md bg-secondary p-2", iconClassName)}>
              <Icon className={cn("h-4 w-4 text-foreground opacity-70", color ? `text-${color}` : "")} />
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
              <h2 className={cn("text-2xl font-bold tracking-tight", valueClassName)}>
                {value}
              </h2>
              {trend && (
                <span
                  className={cn(
                    "ml-2 text-xs font-medium",
                    trend.positive ? "text-emerald-500" : "text-red-500",
                    trendClassName
                  )}
                >
                  {trend.positive ? "+" : "-"}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className={cn("text-xs text-muted-foreground", descriptionClassName)}>{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
