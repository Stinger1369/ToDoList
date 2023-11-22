import React, { useState,useReducer } from 'react';

const sumReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NUMBER':
            return { ...state, numbers: [...state.numbers, action.payload] };
        case 'EDIT_NUMBER':
            const updatedNumbers = [...state.numbers];
            updatedNumbers[action.index] = action.payload;
            return { ...state, numbers: updatedNumbers };
        case 'CALCULATE_SUM':
            return { ...state, total: state.numbers.reduce((acc, curr) => acc + curr, 0) };
        default:
            return state;
    }
};


const initialState = { numbers: [], total: 0 };

const ReducerModal = ({ isOpen, onClose }) => {
    const [state, dispatch] = useReducer(sumReducer, initialState);
    const [newNumber, setNewNumber] = useState('');

    const handleAddNumber = () => {
        const numberToAdd = parseFloat(newNumber);
        if (!isNaN(numberToAdd)) {
            dispatch({ type: 'ADD_NUMBER', payload: numberToAdd });
            setNewNumber('');
        }
    };

    const handleEditNumber = (index, value) => {
        const numberToEdit = parseFloat(value);
        if (!isNaN(numberToEdit)) {
            dispatch({ type: 'EDIT_NUMBER', index: index, payload: numberToEdit });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Calcul de la somme</h2>
                <ul>
                    {state.numbers.map((number, index) => (
                        <li key={index}>
                            <input
                                type="number"
                                value={number}
                                onChange={e => handleEditNumber(index, e.target.value)}
                            />
                        </li>
                    ))}
                </ul>
                <input
                    type="number"
                    value={newNumber}
                    onChange={e => setNewNumber(e.target.value)}
                    placeholder="Ajouter un nombre"
                />
                <button onClick={handleAddNumber}>Ajouter</button>
                <button onClick={() => dispatch({ type: 'CALCULATE_SUM' })}>
                    Calculer la somme
                </button>
                <p>Somme totale: {state.total}</p>
                <button onClick={onClose}>Fermer</button>
            </div>
        </div>
    );
};

export default ReducerModal;

