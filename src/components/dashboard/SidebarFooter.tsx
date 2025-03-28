
import React from "react";

const SidebarFooter = () => {
  return (
    <div className="mt-auto border-t p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs font-medium">AU</span>
        </div>
        <div>
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-muted-foreground">Super Admin</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
