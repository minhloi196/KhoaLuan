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

    this.renderAlert = this.renderAlert.bind(this);
  }

  renderAlert() {
    const { message } = this.props;
    if (message === 'Format of table is incorrect!') {
      return (
        <Alert className="text-center" color="danger">
          {message}
          <div>
            Please refer <a href="https://drive.google.com/file/d/1ifK0tnBt7P8TWstVboWyCoHGOFDx_W4F/view?usp=sharing" target="_blank">here</a> to get correct format of table
          </div>
        </Alert>
      )
    } else {
      return (
        <Alert className="text-center" color="danger">
          {message}
        </Alert>
      )
    }
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
          {/* <Alert className="text-center" color="danger">
            {message}
            {

            }
          </Alert> */}
          {this.renderAlert()}
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
