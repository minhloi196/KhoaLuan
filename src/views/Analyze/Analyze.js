import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Button,
} from 'reactstrap';
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
import TableList from '../Table/TableList';
import ColumnList from '../Table/ColumnList';
import RecordList from '../Table/RecordList';
import SqlEditors from '../SqlEditors';
import AnalyzeAside from './AnalyzeAside';
import EChart from '../Charts/EChart';
import ModalMessageError from '../Base/Modal/ModalMessageError';
import ModalExportData from '../Base/Modal/ModalExportData';
import ModalError from '../Base/Modal/ModalError';

class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTable: '',
      queryString: '',
      chartSetting: {},
      selectedDB: '',
      showModalExportData: false
    };

    this.onChangeTable = this.onChangeTable.bind(this);
    this.updateQueryString = this.updateQueryString.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createChart = this.createChart.bind(this);
    this.selectDataBase = this.selectDataBase.bind(this);
    this.showModalExportData = this.showModalExportData.bind(this);
    this.closeModalExportData = this.closeModalExportData.bind(this);
    this.hideErrorModal = this.hideErrorModal.bind(this);
  }

  componentWillMount() {
    // this.props.requestGetAllTable();
    this.props.requestGetAllDB();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadingListRecord !== this.props.loadingListRecord &&
      nextProps.loadingListRecord === 'failed') {
        this.setState({
          renderAlert: true,
        })
      }

    if (nextProps.loadingListRecord !== this.props.loadingListRecord &&
      nextProps.loadingListRecord === 'success') {
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

  // onChangeTable(tableName) {
  //   this.setState({
  //     selectedTable: tableName
  //   })
  //   this.props.requestGetTableColumn(tableName);
  // }

  onChangeTable(tableName, databaseName, columnList) {

    if (databaseName !== this.state.selectedDB) {
        this.setState({
          selectedDB: databaseName,
        });
      }
  }

  selectDataBase = (databaseName) => {

    if (databaseName !== this.state.selectedDB) {
        this.setState({
          selectedDB: databaseName,
        });
      }
  }

  updateQueryString(value) {
    this.setState({
      queryString: value,
    })
  }

  onSubmit() {
    const { requestGetRecordByQueryString } = this.props;
    requestGetRecordByQueryString(this.state.queryString, this.state.selectedDB);
  }

  createChart(setting) {
    this.setState({
      chartSetting: setting,
    })
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
      loadingDataBaseList
    } = this.props;

    return (
      <div className="animated fadeIn">
        {
          (loadingTableList === 'loading' ||
          loadingColumnList === 'loading' ||
          loadingListRecord === 'loading' ||
          loadingDataBaseList === 'loading'
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
        <div className="dashboard-content">
          <div className="dashboard-content-left">
            <div className="left-list-top">
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
            {/* <div className="left-list-bottom">
              <div className="label-list-table">
                Current Table: {this.state.selectedTable}
              </div>
              <div className="list-table-content">
                <ColumnList
                  listColumn={columnList}
                />
              </div>
            </div> */}
          </div>

          <div className="dashboard-content-right">
            <div className="label-list-table">
              Selected DataBase: {this.state.selectedDB}
            </div>

            <SqlEditors
              value={this.state.queryString}
              updateQueryString={this.updateQueryString}
            />

            <div className="pull-right btn-submit-query">
              <Button
                color="primary"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
              {
                listRecord.length <= 0 ?
                <Button
                  color="primary"
                  disabled={true}
                  className="margin-left-20"
                >
                  Export
                </Button>
                :
                <Button
                  color="primary"
                  className="margin-left-20"
                  onClick={this.showModalExportData}
                >
                  Export
                </Button>
              }
            </div>

            <div className="clear-float-both">
              <RecordList
                defaultPageSize={10}
                data={listRecord}
                loadingData={loadingListRecord}
              />
            </div>

            <div className="analyze-chart-wrapper">
              <EChart
                data={listRecord}
                listKey={listKey}
                loadingData={loadingListRecord}
                setting={this.state.chartSetting}
              />
            </div>

          </div>
          <AppAside fixed hidden>
              <AnalyzeAside
                listKey={listKey}
                onSubmit={this.createChart}
              />
            </AppAside>
        </div>
        <ModalMessageError />
        <ModalExportData
          showModal={this.state.showModalExportData}
          closeFunct={this.closeModalExportData}
          data={listRecord}
        />

        <ModalError
          message={'Can not get data with current query string!'}
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
    listKey: state.recordList.listKey,
    loadingDataBaseList: state.databaseReducer.loadingDataBaseList,
    databaseList: state.databaseReducer.dataBaseList,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyze);
