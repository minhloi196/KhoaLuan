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
  Alert
} from 'reactstrap';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ModalExportData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      messageError: '',
      renderFile: 'fasle',
      column: []
    }

    this.changeFileName = this.changeFileName.bind(this);
    this.exportFunct = this.exportFunct.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.renderExcelColumn = this.renderExcelColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.props.showModal &&
      nextProps.showModal === true) {
        let column = Object.keys(nextProps.data[0]);
        console.log('kajsdhflkjahlkfhlaj dlfjalsjflajd', column)
        this.setState({
          fileName: '',
          messageError: '',
          column: column
        });

    }
  }

  renderAlert() {
    if (this.state.messageError !== '') {
      return <Alert color="warning" className="text-center">
        {this.state.messageError}
    </Alert>
    }
  }

  changeFileName(e) {
    this.setState({
      fileName: e.target.value
    })
  }

  exportFunct(fileName) {
    if (fileName === '') {
      this.setState({
        messageError: 'File name is invalid'
      });
      return;
    }

    this.setState({
      messageError: '',
      renderFile: 'true'
    })

    return;
  }

  renderExcelColumn() {
    const { data } = this.props;
    console.log('render excel column', data)
    let column = [];
    let result = [];
    if (data.length > 0) {
      column = Object.keys(data[0]);
      for (let item in column) {
        const excelColumn = <ExcelColumn label={item} value={item}/>
        result.push(Object.assign({}, excelColumn));
      }
    }

    console.log('-------result ----------', result);
  }

  render() {
    const {
      closeFunct,
      showModal,
      data
    } = this.props;
    return (
      <div>
        <Modal isOpen={showModal} toggle={closeFunct}>
          <ModalHeader toggle={closeFunct}>Export Data</ModalHeader>
          <ModalBody>
            {this.renderAlert()}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >

              <FormGroup>
                <Label for="tableName">File name</Label>
                <Input
                  id="fileName"
                  placeholder="File name"
                  value={this.state.fileName}
                  onChange={this.changeFileName}
                />
              </FormGroup>

            </Form>
          </ModalBody>
          <ModalFooter>
            <ExcelFile filename={this.state.fileName} element={<Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                closeFunct();
              }}
            >Export</Button>}>
                <ExcelSheet data={data} name="Sheet1">
                  {
                    this.state.column.map((item) => {
                      return (
                        <ExcelColumn label={item} value={item}/>
                      )
                    })
                  }
                </ExcelSheet>
              </ExcelFile>
            <Button color="secondary" onClick={closeFunct}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExportData;
