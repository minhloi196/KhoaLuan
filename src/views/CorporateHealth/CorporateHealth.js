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

  renderTable1() {
    const { table1Data } = this.props;

    if (table1Data.static1 &&
      table1Data.static2 &&
      table1Data.static3 &&
      table1Data.static4
      ) {
        return (
          <tbody>
            <tr>
              <td>Profitability factor</td>
              <td>{table1Data.static1.startYear}</td>
              <td>{table1Data.static1.endYear}</td>
              <td>{table1Data.static1.difference}</td>
              <td>{table1Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Basic profitability coefficient</td>
              <td>{table1Data.static2.startYear}</td>
              <td>{table1Data.static2.endYear}</td>
              <td>{table1Data.static2.difference}</td>
              <td>{table1Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Economic profitability coefficient</td>
              <td>{table1Data.static3.startYear}</td>
              <td>{table1Data.static3.endYear}</td>
              <td>{table1Data.static3.difference}</td>
              <td>{table1Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Financial profitability coefficient</td>
              <td>{table1Data.static4.startYear}</td>
              <td>{table1Data.static4.endYear}</td>
              <td>{table1Data.static4.difference}</td>
              <td>{table1Data.static4.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Profitability factor</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Basic profitability coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Economic profitability coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Financial profitability coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      </tbody>
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
          <tbody>
            <tr>
              <td>Overall solvency coefficient</td>
              <td>{table2Data.static1.startYear}</td>
              <td>{table2Data.static1.endYear}</td>
              <td>{table2Data.static1.difference}</td>
              <td>{table2Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Short-term solvency coefficient</td>
              <td>{table2Data.static2.startYear}</td>
              <td>{table2Data.static2.endYear}</td>
              <td>{table2Data.static2.difference}</td>
              <td>{table2Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Quick solvency coefficient</td>
              <td>{table2Data.static3.startYear}</td>
              <td>{table2Data.static3.endYear}</td>
              <td>{table2Data.static3.difference}</td>
              <td>{table2Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Instant solvency coefficient</td>
              <td>{table2Data.static4.startYear}</td>
              <td>{table2Data.static4.endYear}</td>
              <td>{table2Data.static4.difference}</td>
              <td>{table2Data.static4.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Overall solvency coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Short-term solvency coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Quick solvency coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Instant solvency coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      </tbody>
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
          <tbody>
            <tr>
              <td>Receivables turnover</td>
              <td>{table3Data.static1.startYear}</td>
              <td>{table3Data.static1.endYear}</td>
              <td>{table3Data.static1.difference}</td>
              <td>{table3Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Average collection period</td>
              <td>{table3Data.static2.startYear}</td>
              <td>{table3Data.static2.endYear}</td>
              <td>{table3Data.static2.difference}</td>
              <td>{table3Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Number of inventory turns</td>
              <td>{table3Data.static3.startYear}</td>
              <td>{table3Data.static3.endYear}</td>
              <td>{table3Data.static3.difference}</td>
              <td>{table3Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Performance of fixed assets</td>
              <td>{table3Data.static4.startYear}</td>
              <td>{table3Data.static4.endYear}</td>
              <td>{table3Data.static4.difference}</td>
              <td>{table3Data.static4.ratio}</td>
            </tr>
            <tr>
              <td>Performance using the entire property</td>
              <td>{table3Data.static4.startYear}</td>
              <td>{table3Data.static4.endYear}</td>
              <td>{table3Data.static4.difference}</td>
              <td>{table3Data.static4.ratio}</td>
            </tr>
            <tr>
              <td>Performance of equity</td>
              <td>{table3Data.static4.startYear}</td>
              <td>{table3Data.static4.endYear}</td>
              <td>{table3Data.static4.difference}</td>
              <td>{table3Data.static4.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Receivables turnover</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Average collection period</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Number of inventory turns</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Performance of fixed assets</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Performance using the entire property</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Performance of equity</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      </tbody>
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
          <tbody>
            <tr>
              <td>Ratio of debt on assets</td>
              <td>{table4Data.static1.startYear}</td>
              <td>{table4Data.static1.endYear}</td>
              <td>{table4Data.static1.difference}</td>
              <td>{table4Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Debt to equity ratio</td>
              <td>{table4Data.static2.startYear}</td>
              <td>{table4Data.static2.endYear}</td>
              <td>{table4Data.static2.difference}</td>
              <td>{table4Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Ratio of total assets on equity</td>
              <td>{table4Data.static3.startYear}</td>
              <td>{table4Data.static3.endYear}</td>
              <td>{table4Data.static3.difference}</td>
              <td>{table4Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Short-term debt ratio on total debt</td>
              <td>{table4Data.static4.startYear}</td>
              <td>{table4Data.static4.endYear}</td>
              <td>{table4Data.static4.difference}</td>
              <td>{table4Data.static4.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Ratio of debt on assets</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Debt to equity ratio</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Ratio of total assets on equity</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Short-term debt ratio on total debt</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      </tbody>
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
      table1Data,
      loadingTable1Data,
      table1ErrorMessage,
      loadingTable2Data,
      loadingTable3Data,
      loadingTable4Data
    } = this.props;

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
                  {this.renderTable1()}
                </Table>
              </CardBody>
            </Card>

            <Card>
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
                  {this.renderTable3()}
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
                  {this.renderTable2()}
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
              Ratio of corporate leverage
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
                  {this.renderTable4()}
                </Table>
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
                    <td>Circulating capital</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Regular funding coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Self-financing coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Self-financing coefficient of fixed assets</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
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
                    <td>Overall solvency coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Short-term solvency coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Quick solvency coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Instant solvency coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
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
                    <td>Number of rotation cycles of the entire capital</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Business capital rotation</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Number of circulating working capital cycles</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Circulating working capital</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Number of reserve cycles</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Circulation period of reserves</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Number of rounds of receivable capital</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>The period of receivable capital turnover</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
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
                    <td>Profitability factor</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Basic profitability coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Economic profitability coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                  <tr>
                    <td>Financial profitability coefficient</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
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
