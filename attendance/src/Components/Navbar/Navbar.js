import React from "react";
import pic from "../../logo.svg"
import "../Navbar/Navbar.css"
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={pic} alt="pic" />
                Attendance Tracker
            </div>
            <div className="list">
                <NavLink to={"/"} activeclassname="active">Attendance</NavLink>
                <NavLink to={"/emps"} activeclassname="active">Employees</NavLink>
            </div>
        </div>
    )
}