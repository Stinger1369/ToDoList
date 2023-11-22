import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = useState(task || { value: '', completed: false });
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });


  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleContactSubmit = () => {
    // Traiter les données de contact ici
    console.log(contact);
    onClose(); // Fermer le modal après l'envoi
  };
  return (
    <div className="modal">
      <input 
        type="text"
        value={editedTask.value}
        onChange={(e) => setEditedTask({ ...editedTask, value: e.target.value })}
      />
      <button className='save' onClick={handleSave}>Save Changes</button>
      <button className='close' onClick={onClose}>Close</button>
      <h2>Contactez-nous</h2>
      
      <div className="contact-form">
        <input 
          type="text" 
          name="name" 
          value={contact.name} 
          onChange={handleContactChange} 
          placeholder="Nom"
        />
        <input 
          type="email" 
          name="email" 
          value={contact.email} 
          onChange={handleContactChange} 
          placeholder="Email"
        />
        <input 
          type="text" 
          name="subject" 
          value={contact.subject} 
          onChange={handleContactChange} 
          placeholder="Sujet"
        />
        <textarea 
          name="message" 
          value={contact.message} 
          onChange={handleContactChange} 
          placeholder="Message"
        />
        <button className='send' onClick={handleContactSubmit}>Envoyer</button>
      </div>

    </div>
  );
};

export default EditTaskModal;
