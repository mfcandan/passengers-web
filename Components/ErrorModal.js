import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ErrorModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [errorText, setErrorText] = useState('This name using from another user. Please try a different name');

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Error!</ModalHeader>
        <ModalBody>
          {errorText}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Okay, Understand</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ErrorModal;