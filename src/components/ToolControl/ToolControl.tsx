import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import menuItems from "./menuItem.json";
import { ToolControlProps } from "../../../type/type";

const ToolControl: React.FC<ToolControlProps> = ({ handleMenuSelect }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar
        collapsed={collapsed}
        width="120px"
        collapsedWidth="80px"
        className={`bg-gray-950 font-medium ${theme}`}
      >
        <Menu>
          {Array.isArray(menuItems) &&
            menuItems.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleMenuSelect(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default ToolControl;
