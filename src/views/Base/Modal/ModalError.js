import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

class ModalError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      message,
      hideErrorModal,
      showModal,
    } = this.props;

    return (
      <div>
        <Modal isOpen={showModal} toggle={hideErrorModal}>
          <ModalHeader toggle={hideErrorModal}>Error!</ModalHeader>
          <ModalBody>
          <Alert className="text-center" color="danger">
            {message}
          </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={hideErrorModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalError;
