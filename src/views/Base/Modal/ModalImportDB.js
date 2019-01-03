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

import DropdownList from '../../Base/Dropdowns/DropdownList';

const importMode = [
  // {
  //   name: 'csv file',
  //   value: 'csv',
  // },
  {
    name: 'sql dumb file',
    value: 'dumb',
  }
]

class ModalImportDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      tableName: '',
      databaseName: '',
      importMode: 'csv file',
      error: false,
      message: '',
    }

    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeTableName = this.onChangeTableName.bind(this);
    this.onChangeDatabaseName = this.onChangeDatabaseName.bind(this);
    this.onChangeMode = this.onChangeMode.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  renderAlert() {
    if (this.props.messageError !== '') {
      return <Alert color="warning" className="text-center">
        {this.props.messageError}
    </Alert>
    }
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.props.showModal &&
      nextProps.showModal === true) {
        this.setState({
          file: null,
          tableName: '',
          databaseName: '',
          importMode: 'csv file',
          error: false,
          message: '',
        })
    }
  }

  onChangeTableName(e) {
    this.setState({
      tableName: e.target.value
    })
  }

  onChangeDatabaseName(e) {
    this.setState({
      databaseName: e.target.value
    })
  }

  onChangeMode(e) {
    console.log(e.target.value)
    this.setState({
      importMode: e.target.value
    })
  }

  render() {
    const {
      importFunct,
      closeFunct,
      showModal,
      uploadStatus,
      messageError
    } = this.props;
    return (
      <div>
        <Modal isOpen={showModal} toggle={closeFunct}>
          <ModalHeader toggle={closeFunct}>Import Database</ModalHeader>
          {this.renderAlert()}
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >

              <FormGroup>
                <Label for="tableName">File type</Label>
                <DropdownList
                  defaultOption={'csv file'}
                  listOptions={importMode}
                  onChange={this.onChangeMode}
                />
              </FormGroup>

              {
                this.state.importMode === 'csv file' &&
                <FormGroup>
                  <Label for="tableName">Table name</Label>
                  <Input
                    id="tableName"
                    placeholder="Input table name"
                    value={this.state.tableName}
                    onChange={this.onChangeTableName}
                  />
                </FormGroup>
              }

              <FormGroup>
                <Label for="tableName">Database name</Label>
                <Input
                  id="databaseName"
                  placeholder="Input database name"
                  value={this.state.databaseName}
                  onChange={this.onChangeDatabaseName}
                />
              </FormGroup>

              <FormGroup>
                <Label for="csvFile">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="csvFile"
                  onChange={this.onChangeFile}
                />
                <FormText color="muted">
                  Please select file to import.
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                importFunct(this.state, this.state.file);
              }}
            >Import</Button>
            <Button color="secondary" onClick={closeFunct}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalImportDB;
