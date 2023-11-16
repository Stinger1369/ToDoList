import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = useState(task || { value: '', completed: false });

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <div className="modal">
      <input 
        type="text"
        value={editedTask.value}
        onChange={(e) => setEditedTask({ ...editedTask, value: e.target.value })}
      />
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditTaskModal;
