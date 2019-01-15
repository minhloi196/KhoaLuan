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

class ModalExportFinancialHealth extends Component {
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
    // this.renderExcelColumn = this.renderExcelColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.props.showModal &&
      nextProps.showModal === true) {
        
        let dataset1 = [
            {
              name: "Profitability factor",
              column1: nextProps.dataSet1.static1.startYear,
              column2: nextProps.dataSet1.static1.endYear,
              column3: nextProps.dataSet1.static1.difference,
              column4: nextProps.dataSet1.static1.ratio
            },
            {
              name: "Economic profitability coefficient",
              column1: nextProps.dataSet1.static2.startYear,
              column2: nextProps.dataSet1.static2.endYear,
              column3: nextProps.dataSet1.static2.difference,
              column4: nextProps.dataSet1.static2.ratio
            },
            {
              name: "Financial profitability coefficient",
              column1: nextProps.dataSet1.static3.startYear,
              column2: nextProps.dataSet1.static3.endYear,
              column3: nextProps.dataSet1.static3.difference,
              column4: nextProps.dataSet1.static3.ratio
            }
          ]

          let dataset2 = [
            {
              name: "Overall solvency coefficient",
              column1: nextProps.dataSet2.static1.startYear,
              column2: nextProps.dataSet2.static1.endYear,
              column3: nextProps.dataSet2.static1.difference,
              column4: nextProps.dataSet2.static1.ratio
            },
            {
              name: "Short-term solvency coefficient",
              column1: nextProps.dataSet2.static2.startYear,
              column2: nextProps.dataSet2.static2.endYear,
              column3: nextProps.dataSet2.static2.difference,
              column4: nextProps.dataSet2.static2.ratio
            },
            {
              name: "Quick solvency coefficient",
              column1: nextProps.dataSet2.static3.startYear,
              column2: nextProps.dataSet2.static3.endYear,
              column3: nextProps.dataSet2.static3.difference,
              column4: nextProps.dataSet2.static3.ratio
            },
            {
              name: "Instant solvency coefficient",
              column1: nextProps.dataSet2.static4.startYear,
              column2: nextProps.dataSet2.static4.endYear,
              column3: nextProps.dataSet2.static4.difference,
              column4: nextProps.dataSet2.static4.ratio
            }
          ]

          let dataset3 = [
            {
              name: "Receivables turnover",
              column1: nextProps.dataSet3.static1.startYear,
              column2: nextProps.dataSet3.static1.endYear,
              column3: nextProps.dataSet3.static1.difference,
              column4: nextProps.dataSet3.static1.ratio
            },
            {
              name: "Average collection period",
              column1: nextProps.dataSet3.static2.startYear,
              column2: nextProps.dataSet3.static2.endYear,
              column3: nextProps.dataSet3.static2.difference,
              column4: nextProps.dataSet3.static2.ratio
            },
            {
              name: "Number of inventory turns",
              column1: nextProps.dataSet3.static3.startYear,
              column2: nextProps.dataSet3.static3.endYear,
              column3: nextProps.dataSet3.static3.difference,
              column4: nextProps.dataSet3.static3.ratio
            },
            {
              name: "Performance of fixed assets",
              column1: nextProps.dataSet3.static4.startYear,
              column2: nextProps.dataSet3.static4.endYear,
              column3: nextProps.dataSet3.static4.difference,
              column4: nextProps.dataSet3.static4.ratio
            },
            {
              name: "Performance using the entire property",
              column1: nextProps.dataSet3.static5.startYear,
              column2: nextProps.dataSet3.static5.endYear,
              column3: nextProps.dataSet3.static5.difference,
              column4: nextProps.dataSet3.static5.ratio
            }
            ,
            {
              name: "Performance of equity",
              column1: nextProps.dataSet3.static6.startYear,
              column2: nextProps.dataSet3.static6.endYear,
              column3: nextProps.dataSet3.static6.difference,
              column4: nextProps.dataSet3.static6.ratio
            }
          ]

          let dataset4 = [
            {
              name: "Ratio of debt on assets",
              column1: nextProps.dataSet4.static1.startYear,
              column2: nextProps.dataSet4.static1.endYear,
              column3: nextProps.dataSet4.static1.difference,
              column4: nextProps.dataSet4.static1.ratio
            },
            {
              name: "Debt to equity ratio",
              column1: nextProps.dataSet4.static2.startYear,
              column2: nextProps.dataSet4.static2.endYear,
              column3: nextProps.dataSet4.static2.difference,
              column4: nextProps.dataSet4.static2.ratio
            },
            {
              name: "Ratio of total assets on equity",
              column1: nextProps.dataSet4.static3.startYear,
              column2: nextProps.dataSet4.static3.endYear,
              column3: nextProps.dataSet4.static3.difference,
              column4: nextProps.dataSet4.static3.ratio
            },
            {
              name: "Short-term debt ratio on total debt",
              column1: nextProps.dataSet4.static4.startYear,
              column2: nextProps.dataSet4.static4.endYear,
              column3: nextProps.dataSet4.static4.difference,
              column4: nextProps.dataSet4.static4.ratio
            }
          ]

        this.setState({
          fileName: '',
          messageError: '',
          dataset1,
          dataset2,
          dataset3,
          dataset4
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

  // renderExcelColumn() {
  //   const { data } = this.props;
  //   console.log('render excel column', data)
  //   let column = [];
  //   let result = [];
  //   if (data.length > 0) {
  //     column = Object.keys(data[0]);
  //     for (let item in column) {
  //       const excelColumn = <ExcelColumn label={item} value={item}/>
  //       result.push(Object.assign({}, excelColumn));
  //     }
  //   }

  //   console.log('-------result ----------', result);
  // }

  render() {
    const {
      closeFunct,
      showModal,
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
                <ExcelSheet data={this.state.dataset1} name="Profitability situation of enterprises">
                  <ExcelColumn label="Targets" value='name'/>
                  <ExcelColumn label="The begin of the year" value='column1'/>
                  <ExcelColumn label="The end of the year" value='column2'/>
                  <ExcelColumn label="Difference" value='column3'/>
                  <ExcelColumn label="Ratio" value='column4'/>
                </ExcelSheet>
                <ExcelSheet data={this.state.dataset2} name="Payment situation">
                  <ExcelColumn label="Targets" value='name'/>
                  <ExcelColumn label="The begin of the year" value='column1'/>
                  <ExcelColumn label="The end of the year" value='column2'/>
                  <ExcelColumn label="Difference" value='column3'/>
                  <ExcelColumn label="Ratio" value='column4'/>
                </ExcelSheet>
                <ExcelSheet data={this.state.dataset3} name="Evaluate the operational ability of the enterprise">
                  <ExcelColumn label="Targets" value='name'/>
                  <ExcelColumn label="The begin of the year" value='column1'/>
                  <ExcelColumn label="The end of the year" value='column2'/>
                  <ExcelColumn label="Difference" value='column3'/>
                  <ExcelColumn label="Ratio" value='column4'/>
                </ExcelSheet>
                <ExcelSheet data={this.state.dataset4} name="Ratio of corporate leverage">
                  <ExcelColumn label="Targets" value='name'/>
                  <ExcelColumn label="The begin of the year" value='column1'/>
                  <ExcelColumn label="The end of the year" value='column2'/>
                  <ExcelColumn label="Difference" value='column3'/>
                  <ExcelColumn label="Ratio" value='column4'/>
                </ExcelSheet>
              </ExcelFile>
            <Button color="secondary" onClick={closeFunct}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExportFinancialHealth;
