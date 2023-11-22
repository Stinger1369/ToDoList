import React, { useState } from "react";
import "./style/BarNav.css";
import ReducerModal from "./ReducerModal";

const BarNav = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <nav className="barNav">
            <a href="#home">React ToDoList</a>
            <a href="http://127.0.0.1:5500/">JS ToDoList</a>
            <button onClick={openModal}>Reducer</button>

            <ReducerModal isOpen={isModalOpen} onClose={closeModal} />

        </nav>
    );
};

export default BarNav;

