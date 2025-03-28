
import React from "react";

const SidebarFooter = () => {
  return (
    <div className="mt-auto border-t p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-medium">AU</span>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate">Admin User</p>
          <p className="text-xs text-muted-foreground truncate">Super Admin</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
