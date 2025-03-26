
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarData {
  src?: string;
  alt: string;
  fallback: string;
}

interface AvatarGroupProps {
  avatars: AvatarData[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const AvatarGroup = ({ avatars, max = 4, size = "md" }: AvatarGroupProps) => {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  
  // Size classes mapping
  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base"
  };
  
  const avatarSize = sizeClasses[size];
  
  return (
    <div className="flex -space-x-3">
      {displayAvatars.map((avatar, index) => (
        <div 
          key={index} 
          className={`${avatarSize} rounded-full ring-2 ring-background transition-transform hover:translate-y-[-2px] z-[${displayAvatars.length - index}]`}
        >
          <Avatar className="h-full w-full">
            {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt} />}
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className={`${avatarSize} flex items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-2 ring-background z-0`}>
          <span>+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};

export { AvatarGroup };
