import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardHeader, Button, Alert, Table, Badge } from 'reactstrap';
import {
  AppAside,
} from '@coreui/react';
import Loader from 'react-loader-spinner';

import { requestGetAllTable } from '../../actions/getAllTable';
import { requestImportFile } from '../../actions/importDB';
import { requestGetTableColumn } from '../../actions/getTableColumn';
import { requestGetRecordByQueryString } from '../../actions/getRecordByQueryString';
import { requestGetAllDB } from '../../actions/getAllDB';
import { clearData } from '../../actions/clearData';
import { requestFirstDataSet, requestSecondDataSet} from '../../actions/getComparisionData';
import { requestGetTable1 } from '../../actions/getTable1';
import { requestGetTable2 } from '../../actions/getTable2';
import { requestGetTable3 } from '../../actions/getTable3';
import { requestGetTable4 } from '../../actions/getTable4';
import ModalChangeQueryString from '../Base/Modal/ModalChangeQueryString';
import RecordList from '../Table/RecordList';
import CorporateHealthAside from './CorporateHealthAside';
import EChart from '../Charts/EChart';
import ModalError from '../Base/Modal/ModalError';
import ModalExportFinancialHealth from '../Base/Modal/ModalExportFinancialHealth';

class CorporateHealth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalChangeQueryFist: false,
      selectedDataBaseFist: '',
      showModalChangeQuerySecond: false,
      selectedDataBaseSecond: '',
      chartSetting: {},
      renderAlert: false,
      showModalExportData: false,
    };

    this.clickBtnChangeQueryStringFirst = this.clickBtnChangeQueryStringFirst.bind(this);
    this.clickBtnChangeQueryStringSecond = this.clickBtnChangeQueryStringSecond.bind(this);
    this.closeModalChangeQueryFist = this.closeModalChangeQueryFist.bind(this);
    this.closeModalChangeQuerySecond = this.closeModalChangeQuerySecond.bind(this);
    this.applyQueryFirst = this.applyQueryFirst.bind(this);
    this.applyQuerySecond = this.applyQuerySecond.bind(this);
    this.applySetting = this.applySetting.bind(this);
    this.hideErrorModal = this.hideErrorModal.bind(this);
    this.renderTable1 = this.renderTable1.bind(this);
    this.renderTable2 = this.renderTable2.bind(this);
    this.renderTable3 = this.renderTable3.bind(this);
    this.renderTable4 = this.renderTable4.bind(this);
    this.showModalExportData = this.showModalExportData.bind(this);
    this.closeModalExportData = this.closeModalExportData.bind(this);
    this.renderButtonExport = this.renderButtonExport.bind(this);
    this.renderClassName = this.renderClassName.bind(this);
  }

  componentWillMount() {
    this.props.requestGetAllDB();
    console.log('check props', this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table1ErrorMessage !== this.props.table1ErrorMessage &&
      nextProps.table1ErrorMessage !== '') {
        this.setState({
          renderAlert: true,
        })
      }

    if (nextProps.loadingTable1Data !== this.props.loadingTable1Data &&
      nextProps.loadingTable1Data === 'success') {
        this.setState({
          renderAlert: false,
        })
      }
  }

  renderClassName(value) {
    if (value > 0) {
      return '';
    } else {
      return 'color-danger';
    }
  }

  showModalExportData() {
    this.setState({
      showModalExportData: true
    });
  }

  closeModalExportData() {
    this.setState({
      showModalExportData: false
    });
  }

  clickBtnChangeQueryStringFirst() {
    this.setState({
      showModalChangeQueryFist: true,
    })
  }

  clickBtnChangeQueryStringSecond() {
    this.setState({
      showModalChangeQuerySecond: true,
    })
  }

  applyQueryFirst(queryString, selectedDataBase) {
    const { getFistDataSet } = this.props;
    this.setState({
      selectedDataBaseFist: selectedDataBase
    })
    getFistDataSet(queryString, selectedDataBase);
  }

  applyQuerySecond(queryString, selectedDataBase) {
    const { getSecondDataSet } = this.props;
    this.setState({
      selectedDataBaseSecond: selectedDataBase
    })
    getSecondDataSet(queryString, selectedDataBase);
  }

  closeModalChangeQueryFist() {
    this.setState({
      showModalChangeQueryFist: false,
    })
  }

  closeModalChangeQuerySecond() {
    this.setState({
      showModalChangeQuerySecond: false,
    })
  }

  applySetting(selectdDB, selectedTable) {
    const { getTable1, getTable2, getTable3, getTable4 } = this.props;
    getTable1(selectdDB, selectedTable);
    getTable2(selectdDB, selectedTable);
    getTable3(selectdDB, selectedTable);
    getTable4(selectdDB, selectedTable);
  }

  hideErrorModal() {
    this.setState({
      renderAlert: false,
    })
  }

  renderButtonExport() {
    const { table1Data, table2Data, table3Data, table4Data } = this.props;
    if (table1Data.static1 &&
      table1Data.static2 &&
      table1Data.static3 &&
      table2Data.static1 &&
      table2Data.static2 &&
      table2Data.static3 &&
      table2Data.static4 &&
      table3Data.static1 &&
      table3Data.static2 &&
      table3Data.static3 &&
      table3Data.static4 &&
      table3Data.static5 &&
      table3Data.static6 &&
      table4Data.static1 &&
      table4Data.static2 &&
      table4Data.static3 &&
      table4Data.static4
      ) {
        return (
          <div style={{marginLeft: 'auto', marginBottom: '10px'}}>
              <Button
                color="primary"
                onClick={this.showModalExportData}
              >
                Export
              </Button>
            </div>
        )
      } else {
        return (
          <div style={{marginLeft: 'auto'}}>
              <Button
                color="primary"
                disabled={true}
              >
                Export
              </Button>
            </div>
        )
      }
  }

  renderTable1() {
    const { table1Data } = this.props;

    if (table1Data.static1 &&
      table1Data.static2 &&
      table1Data.static3
      ) {
        return (
          <Table responsive bordered>
            <thead>
            <tr>
              <th>Targets</th>
              <th>The begin of the year</th>
              <th>The end of the year</th>
              <th>Difference</th>
              <th>Ratio</th>
            </tr>
            </thead>
                
          <tbody>
            <tr>
              <td>Profitability factor</td>
              <td className={this.renderClassName(table1Data.static1.startYear)}>{table1Data.static1.startYear}</td>
              <td className={this.renderClassName(table1Data.static1.endYear)}>{table1Data.static1.endYear}</td>
              <td className={this.renderClassName(table1Data.static1.difference)}>{table1Data.static1.difference}</td>
              <td className={this.renderClassName(table1Data.static1.ratio)}>{table1Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Economic profitability coefficient</td>
              <td className={this.renderClassName(table1Data.static2.startYear)}>{table1Data.static2.startYear}</td>
              <td className={this.renderClassName(table1Data.static2.endYear)}>{table1Data.static2.endYear}</td>
              <td className={this.renderClassName(table1Data.static2.difference)}>{table1Data.static2.difference}</td>
              <td className={this.renderClassName(table1Data.static2.ratio)}>{table1Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Financial profitability coefficient</td>
              <td className={this.renderClassName(table1Data.static3.startYear)}>{table1Data.static3.startYear}</td>
              <td className={this.renderClassName(table1Data.static3.endYear)}>{table1Data.static3.endYear}</td>
              <td className={this.renderClassName(table1Data.static3.difference)}>{table1Data.static3.difference}</td>
              <td className={this.renderClassName(table1Data.static3.ratio)}>{table1Data.static3.ratio}</td>
            </tr>
          </tbody>
          </Table>
        )
      }

    return (
      // <tbody>
      //   <tr>
      //     <td className={this.renderClassName()}>Profitability factor</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Economic profitability coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Financial profitability coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      // </tbody>
      <Alert className="text-center" color="warning">
        Please select databse and table in aside menu
      </Alert>
    )
  }

  renderTable2() {
    const { table2Data } = this.props;

    if (table2Data.static1 &&
      table2Data.static2 &&
      table2Data.static3 &&
      table2Data.static4
      ) {
        return (
          <Table responsive bordered>
            <thead>
            <tr>
              <th>Targets</th>
              <th>The begin of the year</th>
              <th>The end of the year</th>
              <th>Difference</th>
              <th>Ratio</th>
            </tr>
            </thead>
          <tbody>
            <tr>
              <td>Overall solvency coefficient</td>
              <td className={this.renderClassName(table2Data.static1.startYear)}>{table2Data.static1.startYear}</td>
              <td className={this.renderClassName(table2Data.static1.endYear)}>{table2Data.static1.endYear}</td>
              <td className={this.renderClassName(table2Data.static1.difference)}>{table2Data.static1.difference}</td>
              <td className={this.renderClassName(table2Data.static1.ratio)}>{table2Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Short-term solvency coefficient</td>
              <td className={this.renderClassName(table2Data.static2.startYear)}>{table2Data.static2.startYear}</td>
              <td className={this.renderClassName(table2Data.static2.endYear)}>{table2Data.static2.endYear}</td>
              <td className={this.renderClassName(table2Data.static2.difference)}>{table2Data.static2.difference}</td>
              <td className={this.renderClassName(table2Data.static2.ratio)}>{table2Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Quick solvency coefficient</td>
              <td className={this.renderClassName(table2Data.static3.startYear)}>{table2Data.static3.startYear}</td>
              <td className={this.renderClassName(table2Data.static3.endYear)}>{table2Data.static3.endYear}</td>
              <td className={this.renderClassName(table2Data.static3.difference)}>{table2Data.static3.difference}</td>
              <td className={this.renderClassName(table2Data.static3.ratio)}>{table2Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Instant solvency coefficient</td>
              <td className={this.renderClassName(table2Data.static4.startYear)}>{table2Data.static4.startYear}</td>
              <td className={this.renderClassName(table2Data.static4.endYear)}>{table2Data.static4.endYear}</td>
              <td className={this.renderClassName(table2Data.static4.difference)}>{table2Data.static4.difference}</td>
              <td className={this.renderClassName(table2Data.static4.ratio)}>{table2Data.static4.ratio}</td>
            </tr>
          </tbody>
          </Table>
        )
      }

    return (
      // <tbody>
      //   <tr>
      //     <td className={this.renderClassName()}>Overall solvency coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Short-term solvency coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Quick solvency coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Instant solvency coefficient</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      // </tbody>
      <Alert className="text-center" color="warning">
        Please select databse and table in aside menu
      </Alert>
    )
  }

  renderTable3() {
    const { table3Data } = this.props;

    if (table3Data.static1 &&
      table3Data.static2 &&
      table3Data.static3 &&
      table3Data.static4 &&
      table3Data.static5 &&
      table3Data.static6
      ) {
        return (
          <Table responsive bordered>
            <thead>
            <tr>
              <th>Targets</th>
              <th>The begin of the year</th>
              <th>The end of the year</th>
              <th>Difference</th>
              <th>Ratio</th>
            </tr>
            </thead>
          <tbody>
            <tr>
              <td>Receivables turnover</td>
              <td className={this.renderClassName(table3Data.static1.startYear)}>{table3Data.static1.startYear}</td>
              <td className={this.renderClassName(table3Data.static1.endYear)}>{table3Data.static1.endYear}</td>
              <td className={this.renderClassName(table3Data.static1.difference)}>{table3Data.static1.difference}</td>
              <td className={this.renderClassName(table3Data.static1.ratio)}>{table3Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Average collection period</td>
              <td className={this.renderClassName(table3Data.static2.startYear)}>{table3Data.static2.startYear}</td>
              <td className={this.renderClassName(table3Data.static2.endYear)}>{table3Data.static2.endYear}</td>
              <td className={this.renderClassName(table3Data.static2.difference)}>{table3Data.static2.difference}</td>
              <td className={this.renderClassName(table3Data.static2.ratio)}>{table3Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Number of inventory turns</td>
              <td className={this.renderClassName(table3Data.static3.startYear)}>{table3Data.static3.startYear}</td>
              <td className={this.renderClassName(table3Data.static3.endYear)}>{table3Data.static3.endYear}</td>
              <td className={this.renderClassName(table3Data.static3.difference)}>{table3Data.static3.difference}</td>
              <td className={this.renderClassName(table3Data.static3.ratio)}>{table3Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Performance of fixed assets</td>
              <td className={this.renderClassName(table3Data.static4.startYear)}>{table3Data.static4.startYear}</td>
              <td className={this.renderClassName(table3Data.static4.endYear)}>{table3Data.static4.endYear}</td>
              <td className={this.renderClassName(table3Data.static4.difference)}>{table3Data.static4.difference}</td>
              <td className={this.renderClassName(table3Data.static4.ratio)}>{table3Data.static4.ratio}</td>
            </tr>
            <tr>
              <td>Performance using the entire property</td>
              <td className={this.renderClassName(table3Data.static5.startYear)}>{table3Data.static5.startYear}</td>
              <td className={this.renderClassName(table3Data.static5.endYear)}>{table3Data.static5.endYear}</td>
              <td className={this.renderClassName(table3Data.static5.difference)}>{table3Data.static5.difference}</td>
              <td className={this.renderClassName(table3Data.static5.ratio)}>{table3Data.static5.ratio}</td>
            </tr>
            <tr>
              <td>Performance of equity</td>
              <td className={this.renderClassName(table3Data.static6.startYear)}>{table3Data.static6.startYear}</td>
              <td className={this.renderClassName(table3Data.static6.endYear)}>{table3Data.static6.endYear}</td>
              <td className={this.renderClassName(table3Data.static6.difference)}>{table3Data.static6.difference}</td>
              <td className={this.renderClassName(table3Data.static6.ratio)}>{table3Data.static6.ratio}</td>
            </tr>
          </tbody>
          </Table>
        )
      }

    return (
      // <tbody>
      //   <tr>
      //     <td className={this.renderClassName()}>Receivables turnover</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Average collection period</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Number of inventory turns</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Performance of fixed assets</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Performance using the entire property</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Performance of equity</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      // </tbody>
      <Alert className="text-center" color="warning">
        Please select databse and table in aside menu
      </Alert>
    )
  }
  
  renderTable4() {
    const { table4Data } = this.props;

    if (table4Data.static1 &&
      table4Data.static2 &&
      table4Data.static3 &&
      table4Data.static4
      ) {
        return (
          <Table responsive bordered>
            <thead>
            <tr>
              <th>Targets</th>
              <th>The begin of the year</th>
              <th>The end of the year</th>
              <th>Difference</th>
              <th>Ratio</th>
            </tr>
            </thead>
          <tbody>
            <tr>
              <td>Ratio of debt on assets</td>
              <td className={this.renderClassName(table4Data.static1.startYear)}>{table4Data.static1.startYear}</td>
              <td className={this.renderClassName(table4Data.static1.endYear)}>{table4Data.static1.endYear}</td>
              <td className={this.renderClassName(table4Data.static1.difference)}>{table4Data.static1.difference}</td>
              <td className={this.renderClassName(table4Data.static1.ratio)}>{table4Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Debt to equity ratio</td>
              <td className={this.renderClassName(table4Data.static2.startYear)}>{table4Data.static2.startYear}</td>
              <td className={this.renderClassName(table4Data.static2.endYear)}>{table4Data.static2.endYear}</td>
              <td className={this.renderClassName(table4Data.static2.difference)}>{table4Data.static2.difference}</td>
              <td className={this.renderClassName(table4Data.static2.ratio)}>{table4Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Ratio of total assets on equity</td>
              <td className={this.renderClassName(table4Data.static3.startYear)}>{table4Data.static3.startYear}</td>
              <td className={this.renderClassName(table4Data.static3.endYear)}>{table4Data.static3.endYear}</td>
              <td className={this.renderClassName(table4Data.static3.difference)}>{table4Data.static3.difference}</td>
              <td className={this.renderClassName(table4Data.static3.ratio)}>{table4Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Short-term debt ratio on total debt</td>
              <td className={this.renderClassName(table4Data.static4.startYear)}>{table4Data.static4.startYear}</td>
              <td className={this.renderClassName(table4Data.static4.endYear)}>{table4Data.static4.endYear}</td>
              <td className={this.renderClassName(table4Data.static4.difference)}>{table4Data.static4.difference}</td>
              <td className={this.renderClassName(table4Data.static4.ratio)}>{table4Data.static4.ratio}</td>
            </tr>
          </tbody>
          </Table>
        )
      }

    return (
      // <tbody>
      //   <tr>
      //     <td className={this.renderClassName()}>Ratio of debt on assets</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Debt to equity ratio</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Ratio of total assets on equity</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      //   <tr>
      //     <td className={this.renderClassName()}>Short-term debt ratio on total debt</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //     <td className={this.renderClassName()}>null</td>
      //   </tr>
      // </tbody>
      <Alert className="text-center" color="warning">
        Please select databse and table in aside menu
      </Alert>
    )
  }


  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    const {
      loadingTableList,
      tableList,
      columnList,
      loadingColumnList,
      loadingListRecord,
      listRecord,
      listKey,
      databaseList,
      loadingDataBaseList,
      loadingFirstDataSet,
      loadingSecondDataSet,
      firstDataSet,
      secondDataSet,
      table1ErrorMessage,
      loadingTable1Data,
      loadingTable2Data,
      loadingTable3Data,
      loadingTable4Data,
      table1Data,
      table2Data,
      table3Data,
      table4Data
    } = this.props;

    console.log('----------akjsdhfklj', table1Data.static1)

    return (
      <div className="animated fadeIn">
        {
          (loadingTableList === 'loading' ||
          loadingColumnList === 'loading' ||
          loadingListRecord === 'loading' ||
          loadingDataBaseList === 'loading' ||
          loadingFirstDataSet === 'loading' ||
          loadingSecondDataSet === 'loading' ||
          loadingTable1Data === 'loading' ||
          loadingTable2Data === 'loading' ||
          loadingTable3Data === 'loading' ||
          loadingTable4Data === 'loading'
          ) &&
          <div className="loader-wrapper">
            <Loader 
              type="Oval"
              color="#00BFFF"
              height="100"
              width="100"
            />
          </div>
        }

        <div className="report-content">
          <div className="width-50">
            <Card>
              <CardHeader>
              Profitability situation of enterprises
              </CardHeader>
              <CardBody>
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead>
                  {this.renderTable1()}
                </Table> */}
                {this.renderTable1()}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
              Evaluate the operational ability of the enterprise
              </CardHeader>
              <CardBody>
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead> */}
                  {this.renderTable3()}
                {/* </Table> */}
              </CardBody>
            </Card>
          </div>

          <div className="width-50">
            <Card>
              <CardHeader>
              Payment situation
              </CardHeader>
              <CardBody>
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead> */}
                  {this.renderTable2()}
                {/* </Table> */}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
              Ratio of corporate leverage
              </CardHeader>
              <CardBody>
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead> */}
                  {this.renderTable4()}
                {/* </Table> */}
              </CardBody>
            </Card>
          </div>

            {/* <Card>
              <CardHeader>
              Evaluate the operational ability of the enterprise
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={this.renderClassName()}>Circulating capital</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Regular funding coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Self-financing coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Self-financing coefficient of fixed assets</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>

          <div className="width-50">
            <Card>
              <CardHeader>
              Payment situation
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={this.renderClassName()}>Overall solvency coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Short-term solvency coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Quick solvency coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Instant solvency coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
              The situation of using capital of enterprises
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={this.renderClassName()}>Number of rotation cycles of the entire capital</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Business capital rotation</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Number of circulating working capital cycles</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Circulating working capital</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Number of reserve cycles</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Circulation period of reserves</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Number of rounds of receivable capital</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>The period of receivable capital turnover</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
              Profitability situation of enterprises
              </CardHeader>
              <CardBody>
              <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Targets</th>
                    <th>The end of the year</th>
                    <th>The begin of the year</th>
                    <th>Difference</th>
                    <th>Ratio</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={this.renderClassName()}>Profitability factor</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Basic profitability coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Economic profitability coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  <tr>
                    <td className={this.renderClassName()}>Financial profitability coefficient</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                    <td className={this.renderClassName()}>null</td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div> */}
          <AppAside fixed hidden>
            <CorporateHealthAside
              listTable={databaseList}
              onSubmit={this.applySetting}
            />
          </AppAside>
        </div>

        <div>
          {this.renderButtonExport()}
        </div>

        <ModalExportFinancialHealth
          showModal={this.state.showModalExportData}
          closeFunct={this.closeModalExportData}
          dataSet1={table1Data}
          dataSet2={table2Data}
          dataSet3={table3Data}
          dataSet4={table4Data}
        />

        <ModalError
          message={'Format of table is incorrect!'}
          showModal={this.state.renderAlert}
          hideErrorModal={this.hideErrorModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableList: state.tableReducer.tableList,
    prefixTable: state.tableReducer.prefixTable,
    loadingTableList: state.tableReducer.loadingTableList,
    columnList: state.tableColumnReducer.columnList,
    loadingColumnList: state.tableColumnReducer.loadingColumnList,
    importFileStatus: state.importFileReducer.importFile,
    loadingAllRecord: state.allRecordReducer.loadingAllRecord,
    allRecord: state.allRecordReducer.data,
    listRecord: state.recordList.data,
    loadingListRecord: state.recordList.loadingRecordList,
    listKey: state.fistRecordList.listKey,
    loadingDataBaseList: state.databaseReducer.loadingDataBaseList,
    databaseList: state.databaseReducer.dataBaseList,
    firstDataSet: state.fistRecordList.data,
    loadingFirstDataSet: state.fistRecordList.loadingRecordList,
    secondDataSet: state.secondRecordList.data,
    loadingSecondDataSet: state.secondRecordList.loadingRecordList,
    table1Data: state.getTable1.data,
    loadingTable1Data: state.getTable1.loadingTable,
    table1ErrorMessage: state.getTable1.messageError,
    table2Data: state.getTable2.data,
    loadingTable2Data: state.getTable2.loadingTable,
    table2ErrorMessage: state.getTable2.messageError,
    table3Data: state.getTable3.data,
    loadingTable3Data: state.getTable3.loadingTable,
    table3ErrorMessage: state.getTable3.messageError,
    table4Data: state.getTable4.data,
    loadingTable4Data: state.getTable4.loadingTable,
    table4ErrorMessage: state.getTable4.messageError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGetAllTable: bindActionCreators(requestGetAllTable, dispatch),
    requestImportFile: bindActionCreators(requestImportFile, dispatch),
    requestGetTableColumn: bindActionCreators(requestGetTableColumn, dispatch),
    requestGetRecordByQueryString: bindActionCreators(requestGetRecordByQueryString, dispatch),
    requestGetAllDB: bindActionCreators(requestGetAllDB, dispatch),
    clearData: bindActionCreators(clearData, dispatch),
    getFistDataSet: bindActionCreators(requestFirstDataSet, dispatch),
    getSecondDataSet: bindActionCreators(requestSecondDataSet, dispatch),
    getTable1: bindActionCreators(requestGetTable1, dispatch),
    getTable2: bindActionCreators(requestGetTable2, dispatch),
    getTable3: bindActionCreators(requestGetTable3, dispatch),
    getTable4: bindActionCreators(requestGetTable4, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateHealth);
