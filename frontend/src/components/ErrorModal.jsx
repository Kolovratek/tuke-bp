import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';

export const ErrorModal = (props) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal isOpen={true}>
        <ModalHeader>Error</ModalHeader>

        <ModalBody>
          <p>This operation cannot be performed</p>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={props.onConfirm}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ErrorModal.propTypes = {
  onConfirm: PropTypes.func.isRequired
};
