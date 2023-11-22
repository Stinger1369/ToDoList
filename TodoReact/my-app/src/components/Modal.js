import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import './style/Modal.css'; 
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({ isOpen, onClose, children }) => {
  const theme = useTheme();

  const customStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={customStyle}>
        <Typography variant="h6">Mon Modal</Typography>
        <TextField label="Nom" variant="outlined" fullWidth margin="normal" />
        
        {children}
        <div className="contat-Waiting">
        <CircularProgress />
        <Button className='Fermer' onClick={onClose}>
          <CloseIcon />
         </Button>
         </div>
      </div>
    </div>
  );
};

export default Modal;
