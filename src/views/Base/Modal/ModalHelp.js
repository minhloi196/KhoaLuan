import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

class ModalHelp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      hideModal,
      showModal,
    } = this.props;

    return (
      <div>
        <Modal isOpen={showModal} toggle={hideModal} size='lg'>
          <ModalHeader toggle={hideModal}>Help</ModalHeader>
          <ModalBody>
            <Alert color="success" className="text-center">
              <h5>Here are some basic guidelines for using the web-app</h5>
            </Alert>
            <h5>Import data to system</h5>
            <img className="img-help" src={'assets/img/help/help1.png'} alt="manage database" />
            <h5>Analyze data</h5>
            <img className="img-help" src={'assets/img/help/help2.png'} alt="analyze data" />
            <h5>Show modal to select database and input query string</h5>
            <img className="img-help" src={'assets/img/help/help3.png'} alt="report" />
            <h5>Show aside menu for more configure</h5>
            <img className="img-help" src={'assets/img/help/help4.png'} alt="show aside menu" />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={hideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalHelp;
