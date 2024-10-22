import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaImages, FaFileAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink 
            to="/users" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaUsers className="icon" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/images" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaImages className="icon" />
            Images
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/posts" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaFileAlt className="icon" />
            Posts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
