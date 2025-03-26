
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navItems } from "./sidebarNavData";

const SidebarNav = () => {
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems[item.title] || false;
            const isActive = pathname === item.path || 
              (hasChildren && item.children?.some(child => pathname === child.path));

            return (
              <SidebarMenuItem key={index}>
                <div className="flex flex-col w-full">
                  <SidebarMenuButton
                    asChild={!hasChildren}
                    isActive={isActive}
                    tooltip={item.title}
                    onClick={hasChildren ? () => toggleExpand(item.title) : undefined}
                    className="w-full justify-between"
                  >
                    {hasChildren ? (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    ) : (
                      <Link to={item.path} className="flex w-full items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </SidebarMenuButton>

                  {hasChildren && isExpanded && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.children?.map((child, childIndex) => (
                        <SidebarMenuButton
                          key={childIndex}
                          asChild
                          isActive={pathname === child.path}
                          className="h-9 px-2"
                        >
                          <Link to={child.path} className="flex items-center gap-2">
                            <span>{child.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNav;
