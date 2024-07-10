import React from 'react';
import './MenuBar.css';
import MenuBarLink from './MenuBarLink';

interface MenuBarProps {
  parallax: any;
}

const MenuBar: React.FC<MenuBarProps> = ({ parallax }) => {
  return (
    <div className="menu-bar">
      <MenuBarLink to=".325" label="Training" parallax={parallax} />
      <MenuBarLink to="1.075" label="Services" parallax={parallax} />
      <MenuBarLink to="2" label="About Us" parallax={parallax} />
      <MenuBarLink to="3.2" label="Contact" parallax={parallax} />
    </div>
  );
};

export default MenuBar;