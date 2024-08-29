import React from "react";
import "../Components/Leftnav.css";
import { NavLink } from "react-router-dom";
const Leftnav = () => {
  return (
    <div className="bg-dark ">
      <ul>
        <li>
          <NavLink to="/" >Home</NavLink>
        </li>
        <li className="text-decoration-none">
          <NavLink to="/addfooter">Footer</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Leftnav;