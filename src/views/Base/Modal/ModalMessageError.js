import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

import {
  hideErrorModal
} from '../../../actions/errorModal';

class ModalMessageError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      message,
      // closeFunct,
      show,
    } = this.props;

    let showModal = false;
    if (show === 'true') {
      showModal = true;
    }

    console.log('-------------------')
    console.log(this.props)

    return (
      <div>
        <Modal isOpen={showModal} toggle={hideErrorModal}>
          <ModalHeader toggle={hideErrorModal}>Error!</ModalHeader>
          <ModalBody>
          <Alert color="danger">
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

const mapStateToProps = state => {
  return {
    // message: state.tableReducer.tableList,
    // loadingTableList: state.tableReducer.loadingTableList,
    message: state.errorReducer.message,
    show: state.errorReducer.show
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideErrorModal: bindActionCreators(hideErrorModal, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessageError);
