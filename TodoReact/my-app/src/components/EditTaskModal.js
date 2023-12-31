import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as yup from 'yup';



const contactSchema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  email: yup.string().email('L\'email doit être valide').required('L\'email est requis'),
  subject: yup.string().required('Le sujet est requis'),
  message: yup.string().required('Le message est requis'),
});
const EditTaskModal = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = useState(task || { value: '', completed: false });
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});


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
    console.log("Envoi du formulaire de contact");
    setOpenSnackbar(true);
    
    setTimeout(() => {
      onClose(); 
    }, 500);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  console.log("Snackbar ouvert :", openSnackbar);

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
        <Snackbar open={openSnackbar} autoHideDuration={600} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Message envoyé avec succès !
          </Alert>
        </Snackbar>
      </div>

    </div>
  );
};

export default EditTaskModal;
