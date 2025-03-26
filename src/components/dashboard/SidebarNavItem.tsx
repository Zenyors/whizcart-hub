
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  badge?: number;
  isActive: boolean;
  children?: { title: string; path: string }[];
}

const SidebarNavItem = ({ icon: Icon, title, path, badge, isActive, children }: NavItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div className="mb-1">
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-foreground/70 hover:bg-accent hover:text-foreground"
        )}
        onClick={hasChildren ? () => setExpanded(!expanded) : undefined}
      >
        <Link 
          to={!hasChildren ? path : "#"}
          className="flex flex-1 items-center"
          onClick={hasChildren ? (e) => e.preventDefault() : undefined}
        >
          <Icon className="mr-2 h-5 w-5" />
          <span className="truncate">{title}</span>
        </Link>
        
        {badge && (
          <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold">
            {badge}
          </span>
        )}
        
        {hasChildren && (
          <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="mt-1 ml-5 space-y-1 animate-fade-in">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavItem;
