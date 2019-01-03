import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from 'reactstrap';

import SqlEditors from '../../SqlEditors';
import TableList from '../../Table/TableList';

class ModalChangeQueryString extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: '',
      selectedDataBase: '',
      showError: false,
      message: ''
    }

    this.closeFunct = this.closeFunct.bind(this);
    this.applyQuery = this.applyQuery.bind(this);
    this.updateQueryString = this.updateQueryString.bind(this);
    this.selectDataBase = this.selectDataBase.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  closeFunct() {
    const { closeFunct } = this.props;
    this.setState({
      queryString: '',
      selectedDataBase: '',
      showError: false,
      message: ''
    })

    closeFunct();
  }

  selectDataBase = (dataBaseName) => {
    if (dataBaseName !== this.state.selectedDataBase) {
      this.setState({
        selectedDataBase: dataBaseName
      })
    }
  }

  applyQuery(queryString) {
    const { applyQuery, closeFunct } = this.props;
    if (queryString !== '' && this.state.selectedDataBase !== '') {
      this.setState({
        showError: false,
        message: ''
      })
      applyQuery(queryString, this.state.selectedDataBase);
      closeFunct();
    } else {
      this.setState({
        showError: true,
        message: 'Query string or database is missing'
      })
    }
    
  }

  updateQueryString(value) {
    this.setState({
      queryString: value,
    })
  }

  renderAlert() {
    if (this.state.showError === true) {
      return <Alert color="warning" className="text-center">
        {this.state.message}
    </Alert>
    }
  }

  render() {
    const {
      showModal,
      databaseList,
    } = this.props;
    return (
      <div>
        <Modal isOpen={showModal} toggle={this.closeFunct}>
          <ModalHeader toggle={this.closeFunct}>Change Query String</ModalHeader>
          <ModalBody>
            {this.renderAlert()}
            <div className="modal-container-body">
              <div className="left-block width-40">
                <div className="label-list-table">
                  List DataBase
                </div>
                <div className="list-table-content">
                  <TableList
                    listTable={databaseList}
                    analyze={true}
                    selectDataBase={this.selectDataBase}
                  />
                </div>
              </div>

              <div className="right-block width-60">
                <h6>Selected DataBase: {this.state.selectedDataBase}</h6>
                <div className="sql-editors">
                  <SqlEditors
                    value={this.state.queryString}
                    updateQueryString={this.updateQueryString}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                this.applyQuery(this.state.queryString);
              }}
            >Apply</Button>
            <Button color="secondary" onClick={this.closeFunct}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalChangeQueryString;
