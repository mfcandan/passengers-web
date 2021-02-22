import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ErrorModal = (props) => {
  const {
    buttonLabel,
    className,
    show,
    errorMessage,
  } = props;

  useEffect(() => {
    showMessage();
    return () => {
      console.log("messsage clean")
    }
  }, [show]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const showMessage = () => {
    setModal(show);
  }

  return (
    <div>
      <Button color="white" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Error!</ModalHeader>
        <ModalBody>
          {errorMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Okay, Understand</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ErrorModal;