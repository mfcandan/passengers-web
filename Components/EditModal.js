import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    currentName,
    value,
    onChangeValue,
    onSubmitValue,
  } = props;

  const [modal, setModal] = useState(false);
  const [newName, setNewName] = useState(currentName, ()=>{value=newName});
  const toggle = () => setModal(!modal);

  return (
    <div>   
      <Button size="sm" color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Change the Passenger Name:</ModalHeader>
        
        <Form onSubmit={() => onSubmitValue()}>
            <ModalBody>
                <FormGroup>
                    <Input type="name" name="name" value={value} onChange={onChangeValue} id="exampleEmail" placeholder={newName} />
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