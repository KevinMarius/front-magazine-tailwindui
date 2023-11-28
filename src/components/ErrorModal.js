import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ErrorModal = props => {

  const { onClose, error } = props;

  return (
    <Modal
      onClose={onClose}
      header="An Error Occurred!"
      isOpen={!!error}
      footer={<Button bgColor="bg-blue-500"  onClick={onClose}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
