
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

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
        "overflow-hidden transition-all duration-200",
        className
      )}
      style={{ 
        ...style,
        borderTop: color ? `3px solid ${color}` : undefined,
      }}
    >
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            {description && <div className="h-4 w-full animate-pulse rounded-md bg-muted" />}
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className={cn("text-sm font-medium text-muted-foreground", titleClassName)}>
                {title}
              </p>
              <div className="space-y-1">
                <h2 className={cn("text-3xl font-bold", valueClassName)}>
                  {value}
                </h2>
                {trend && (
                  <div className="flex items-center gap-1">
                    {trend.positive ? (
                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        trend.positive ? "text-emerald-500" : "text-red-500",
                        trendClassName
                      )}
                    >
                      {trend.value}%
                    </span>
                    {description && (
                      <span className={cn("text-sm text-muted-foreground", descriptionClassName)}>
                        {description}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {Icon && (
              <div className={cn("rounded-full bg-primary/10 p-3", iconClassName)}>
                <Icon className={cn("h-5 w-5 text-primary")} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
