import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    currentName,
  } = props;

  const [modal, setModal] = useState(false);
  const [newName, setNewName] = useState(currentName);

  const toggle = () => setModal(!modal);

  return (
    <div>

      <Button size="sm" color="info" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Change Passenger Name:</ModalHeader>
        <Form onSubmit={() => console.log("Submitted")}>
            <ModalBody>
                <FormGroup>
                    <Input type="name" name="name" id="exampleEmail" placeholder={newName} />
                </FormGroup>        
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>Cancel</Button>{' '}
                <Button type="submit" color="primary" onClick={toggle}>Submit</Button>
            </ModalFooter>
        </Form>
      </Modal>

    </div>
  );
}

export default ModalExample;