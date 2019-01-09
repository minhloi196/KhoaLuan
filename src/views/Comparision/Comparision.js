import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardHeader, Button, Alert } from 'reactstrap';
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
import ModalChangeQueryString from '../Base/Modal/ModalChangeQueryString';
import RecordList from '../Table/RecordList';
import ComparisionAside from './ComparisionAside';
import EChart from '../Charts/EChart';
import ModalExportData from '../Base/Modal/ModalExportData';
import ModalError from '../Base/Modal/ModalError';

class Comparision extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalChangeQueryFist: false,
      selectedDataBaseFist: '',
      showModalChangeQuerySecond: false,
      selectedDataBaseSecond: '',
      chartSetting: {},
      showModalExportData1: false,
      showModalExportData2: false
    };

    this.clickBtnChangeQueryStringFirst = this.clickBtnChangeQueryStringFirst.bind(this);
    this.clickBtnChangeQueryStringSecond = this.clickBtnChangeQueryStringSecond.bind(this);
    this.closeModalChangeQueryFist = this.closeModalChangeQueryFist.bind(this);
    this.closeModalChangeQuerySecond = this.closeModalChangeQuerySecond.bind(this);
    this.applyQueryFirst = this.applyQueryFirst.bind(this);
    this.applyQuerySecond = this.applyQuerySecond.bind(this);
    this.createChart = this.createChart.bind(this);
    this.showModalExportData1 = this.showModalExportData1.bind(this);
    this.showModalExportData2 = this.showModalExportData2.bind(this);
    this.closeModalExportData1 = this.closeModalExportData1.bind(this);
    this.closeModalExportData2 = this.closeModalExportData2.bind(this);
    this.hideErrorModal = this.hideErrorModal.bind(this);
  }

  componentWillMount() {
    this.props.requestGetAllDB();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.loadingFirstDataSet !== this.props.loadingFirstDataSet &&
      nextProps.loadingFirstDataSet === 'failed') ||
      (nextProps.loadingSecondDataSet !== this.props.loadingSecondDataSet &&
      nextProps.loadingSecondDataSet === 'failed')) {
        this.setState({
          renderAlert: true,
        })
      }

    if ((nextProps.loadingFirstDataSet !== this.props.loadingFirstDataSet &&
      nextProps.loadingFirstDataSet === 'success') &&
      nextProps.loadingSecondDataSet !== this.props.loadingFirstDataSet &&
      nextProps.loadingSecondDataSet === 'success') {
        this.setState({
          renderAlert: false,
        })
      }
  }

  hideErrorModal() {
    this.setState({
      renderAlert: false,
    })
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

  createChart(setting) {
    this.setState({
      chartSetting: setting,
    })
  }

  showModalExportData1() {
    this.setState({
      showModalExportData1: true
    });
  }

  showModalExportData2() {
    this.setState({
      showModalExportData2: true
    });
  }

  closeModalExportData1() {
    this.setState({
      showModalExportData1: false
    });
  }

  closeModalExportData2() {
    this.setState({
      showModalExportData2: false
    });
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
      secondDataSet
    } = this.props;

    return (
      <div className="animated fadeIn">
        {
          (loadingTableList === 'loading' ||
          loadingColumnList === 'loading' ||
          loadingListRecord === 'loading' ||
          loadingDataBaseList === 'loading' ||
          loadingFirstDataSet === 'loading' ||
          loadingSecondDataSet === 'loading'
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
            <Card className="chart-page-item">
              <CardHeader>
                Fist Dataset
              </CardHeader>
              <CardBody>
              <div className="query-menu">
                  <div className="label-query-menu">
                    <span>Change query string: </span>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      className="btn-change-query"
                      onClick={this.clickBtnChangeQueryStringFirst}
                    >
                      <i className="fa fa-code" aria-hidden="true"></i>
                    </Button>
                  </div>
                  {
                    firstDataSet.length <= 0 ?
                    <div style={{marginLeft: 'auto'}}>
                      <Button
                        color="primary"
                        disabled={true}
                      >
                        Export
                      </Button>
                    </div>
                    :
                    <div style={{marginLeft: 'auto'}}>
                      <Button
                        color="primary"
                        onClick={this.showModalExportData1}
                      >
                        Export
                      </Button>
                    </div>
                  }
                </div>
                <div className="chart-wrapper">
                  Result data:
                </div>
                {
                  this.state.selectedDataBaseFist !== '' ?
                  <div className="record-list">
                    <RecordList
                      defaultPageSize={10}
                      data={firstDataSet}
                      loadingData={loadingFirstDataSet}
                    />
                  </div>
                  :
                  <Alert color="warning" className="text-center">
                    Please select databse and input query string
                  </Alert>
                }
              </CardBody>
            </Card>

            <Card className="chart-page-item">
              <CardHeader>
                Visual data
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <EChart
                    fromReport={true}
                    data={firstDataSet}
                    listKey={listKey}
                    loadingData={loadingFirstDataSet}
                    setting={this.state.chartSetting}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="width-50">
            <Card className="chart-page-item">
              <CardHeader>
                Second Dataset
              </CardHeader>
              <CardBody>
              <div className="query-menu">
                  <div className="label-query-menu">
                    <span>Change query string: </span>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      className="btn-change-query"
                      onClick={this.clickBtnChangeQueryStringSecond}
                    >
                      <i className="fa fa-code" aria-hidden="true"></i>
                    </Button>
                  </div>
                  {
                    secondDataSet.length <= 0 ?
                    <div style={{marginLeft: 'auto'}}>
                      <Button
                        color="primary"
                        disabled={true}
                      >
                        Export
                      </Button>
                    </div>
                    :
                    <div style={{marginLeft: 'auto'}}>
                      <Button
                        color="primary"
                        onClick={this.showModalExportData2}
                      >
                        Export
                      </Button>
                    </div>
                  }
                </div>
                <div className="chart-wrapper">
                  Result data:
                </div>
                {
                  this.state.selectedDataBaseSecond !== '' ?
                  <div className="record-list">
                    <RecordList
                      defaultPageSize={10}
                      data={secondDataSet}
                      loadingData={loadingSecondDataSet}
                    />
                  </div>
                  :
                  <Alert color="warning" className="text-center">
                    Please select databse and input query string
                  </Alert>
                }
              </CardBody>
            </Card>

            <Card className="chart-page-item">
              <CardHeader>
                Visual Data
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <EChart
                    fromReport={true}
                    data={secondDataSet}
                    listKey={listKey}
                    loadingData={loadingSecondDataSet}
                    setting={this.state.chartSetting}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <ModalChangeQueryString
            showModal={this.state.showModalChangeQueryFist}
            closeFunct={this.closeModalChangeQueryFist}
            applyQuery={this.applyQueryFirst}
            databaseList={databaseList}
          />

          <ModalChangeQueryString
            showModal={this.state.showModalChangeQuerySecond}
            closeFunct={this.closeModalChangeQuerySecond}
            applyQuery={this.applyQuerySecond}
            databaseList={databaseList}
          />

          <AppAside fixed hidden>
            <ComparisionAside
              listKey={listKey}
              onSubmit={this.createChart}
            />
          </AppAside>

          <ModalExportData
            showModal={this.state.showModalExportData1}
            closeFunct={this.closeModalExportData1}
            data={firstDataSet}
          />

          <ModalExportData
            showModal={this.state.showModalExportData2}
            closeFunct={this.closeModalExportData2}
            data={secondDataSet}
          />

          <ModalError
            message={'Can not get data with current query string!'}
            showModal={this.state.renderAlert}
            hideErrorModal={this.hideErrorModal}
          />

        </div>
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
    loadingSecondDataSet: state.secondRecordList.loadingRecordList
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comparision);
