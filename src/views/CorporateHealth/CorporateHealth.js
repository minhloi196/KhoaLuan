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
  }

  componentWillMount() {
    this.props.requestGetAllDB();
    // this.props.getTable1('test1', 'tinh_hinh_tai_chinh');
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
    const { getTable1, getTable2 } = this.props;
    getTable1(selectdDB, selectedTable);
    getTable2(selectdDB, selectedTable);
  }

  hideErrorModal() {
    this.setState({
      renderAlert: false,
    })
  }

  // renderTable1() {
  //   const { table1Data } = this.props;

  //   if (table1Data.static1 &&
  //     table1Data.static2 &&
  //     table1Data.static3 &&
  //     table1Data.static4 &&
  //     table1Data.static5
  //     ) {
  //       return (
  //         <tbody>
  //           <tr>
  //             <td>Số vòng luân chuyển của toàn bộ vốn</td>
  //             <td>{table1Data.static1.startYear}</td>
  //             <td>{table1Data.static1.endYear}</td>
  //             <td>{table1Data.static1.difference}</td>
  //             <td>{table1Data.static1.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Kỳ luân chuyển vốn kinh doanh</td>
  //             <td>{table1Data.static2.startYear}</td>
  //             <td>{table1Data.static2.endYear}</td>
  //             <td>{table1Data.static2.difference}</td>
  //             <td>{table1Data.static2.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Số vòng luân chuyển vốn lưu động</td>
  //             <td>{table1Data.static3.startYear}</td>
  //             <td>{table1Data.static3.endYear}</td>
  //             <td>{table1Data.static3.difference}</td>
  //             <td>{table1Data.static3.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Kỳ luân chuyển vốn lưu động</td>
  //             <td>{table1Data.static5.startYear}</td>
  //             <td>{table1Data.static5.endYear}</td>
  //             <td>{table1Data.static5.difference}</td>
  //             <td>{table1Data.static5.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Số vòng luân chuyển vốn dự trữ</td>
  //             <td>{table1Data.static5.startYear}</td>
  //             <td>{table1Data.static5.endYear}</td>
  //             <td>{table1Data.static5.difference}</td>
  //             <td>{table1Data.static5.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Kỳ luân chuyển vốn dự trữ</td>
  //             <td>{table1Data.static5.startYear}</td>
  //             <td>{table1Data.static5.endYear}</td>
  //             <td>{table1Data.static5.difference}</td>
  //             <td>{table1Data.static5.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Số vòng luân chuyển vốn phải thu</td>
  //             <td>{table1Data.static5.startYear}</td>
  //             <td>{table1Data.static5.endYear}</td>
  //             <td>{table1Data.static5.difference}</td>
  //             <td>{table1Data.static5.ratio}</td>
  //           </tr>
  //           <tr>
  //             <td>Số kỳ luân chuyển vốn phải thu</td>
  //             <td>{table1Data.static5.startYear}</td>
  //             <td>{table1Data.static5.endYear}</td>
  //             <td>{table1Data.static5.difference}</td>
  //             <td>{table1Data.static5.ratio}</td>
  //           </tr>
  //         </tbody>
  //       )
  //     }

  //   return (
  //     <tbody>
  //       <tr>
  //         <td>Số vòng luân chuyển của toàn bộ vốn</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Kỳ luân chuyển vốn kinh doanh</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Số vòng luân chuyển vốn lưu động</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Kỳ luân chuyển vốn lưu động</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Số vòng luân chuyển vốn dự trữ</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Kỳ luân chuyển vốn dự trữ</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Số vòng luân chuyển vốn phải thu</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //       <tr>
  //         <td>Số kỳ luân chuyển vốn phải thu</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //         <td>null</td>
  //       </tr>
  //     </tbody>
  //   )
  // }

  renderTable1() {
    const { table1Data } = this.props;

    if (table1Data.static1 &&
      table1Data.static2 &&
      table1Data.static3 &&
      table1Data.static4 &&
      table1Data.static5
      ) {
        return (
          <tbody>
            <tr>
              <td>Debt ratio on assets</td>
              <td>{table1Data.static1.startYear}</td>
              <td>{table1Data.static1.endYear}</td>
              <td>{table1Data.static1.difference}</td>
              <td>{table1Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Debt ratio on equity</td>
              <td>{table1Data.static2.startYear}</td>
              <td>{table1Data.static2.endYear}</td>
              <td>{table1Data.static2.difference}</td>
              <td>{table1Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Debt ratio on charter capital</td>
              <td>{table1Data.static3.startYear}</td>
              <td>{table1Data.static3.endYear}</td>
              <td>{table1Data.static3.difference}</td>
              <td>{table1Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Short-term debt ratio on total debt</td>
              <td>{table1Data.static4.startYear}</td>
              <td>{table1Data.static4.endYear}</td>
              <td>{table1Data.static4.difference}</td>
              <td>{table1Data.static4.ratio}</td>
            </tr>
            <tr>
              <td>Maturity debt ratio on long-term debt</td>
              <td>{table1Data.static5.startYear}</td>
              <td>{table1Data.static5.endYear}</td>
              <td>{table1Data.static5.difference}</td>
              <td>{table1Data.static5.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Debt ratio on assets</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Debt ratio on equity</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Debt ratio on charter capital</td>
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
        <tr>
          <td>Maturity debt ratio on long-term debt</td>
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
      table2Data.static4 &&
      table2Data.static5 &&
      table2Data.static6
      ) {
        return (
          <tbody>
            <tr>
              <td>Total assets</td>
              <td>{table2Data.static1.startYear}</td>
              <td>{table2Data.static1.endYear}</td>
              <td>{table2Data.static1.difference}</td>
              <td>{table2Data.static1.ratio}</td>
            </tr>
            <tr>
              <td>Short-term investment coefficient</td>
              <td>{table2Data.static2.startYear}</td>
              <td>{table2Data.static2.endYear}</td>
              <td>{table2Data.static2.difference}</td>
              <td>{table2Data.static2.ratio}</td>
            </tr>
            <tr>
              <td>Fixed asset investment coefficients</td>
              <td>{table2Data.static3.startYear}</td>
              <td>{table2Data.static3.endYear}</td>
              <td>{table2Data.static3.difference}</td>
              <td>{table2Data.static3.ratio}</td>
            </tr>
            <tr>
              <td>Financial investment coefficients</td>
              <td>{table2Data.static4.startYear}</td>
              <td>{table2Data.static4.endYear}</td>
              <td>{table2Data.static4.difference}</td>
              <td>{table2Data.static4.ratio}</td>
            </tr>
            <tr>
              <td>Real estate investment coefficients</td>
              <td>{table2Data.static5.startYear}</td>
              <td>{table2Data.static5.endYear}</td>
              <td>{table2Data.static5.difference}</td>
              <td>{table2Data.static5.ratio}</td>
            </tr>
            <tr>
              <td>Short-term asset investment ratio compared to long-term assets</td>
              <td>{table2Data.static6.startYear}</td>
              <td>{table2Data.static6.endYear}</td>
              <td>{table2Data.static6.difference}</td>
              <td>{table2Data.static6.ratio}</td>
            </tr>
          </tbody>
        )
      }

    return (
      <tbody>
        <tr>
          <td>Total assets</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Short-term investment coefficient</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Fixed asset investment coefficients</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Financial investment coefficients</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Real estate investment coefficients</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
        <tr>
          <td>Short-term asset investment ratio compared to long-term assets</td>
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
          loadingTable2Data === 'loading'
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
              Capital Situation
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
          </div>

          <div className="width-50">
            <Card>
              <CardHeader>
                Property situation
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
          </div>

            {/* <Card>
              <CardHeader>
              Funding situation
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
    table2ErrorMessage: state.getTable2.messageError
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateHealth);
