import React from "react";
import "./style/BarNav.css";
const BarNav = () => {
    return (
        <nav className="barNav">
            <a href="#home">React ToDoList</a>
            <a href="http://127.0.0.1:5500/">JS ToDoList</a>
        </nav>
    );
};

export default BarNav;
