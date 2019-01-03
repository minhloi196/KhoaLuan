import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Button,
} from 'reactstrap';
import Loader from 'react-loader-spinner';

import { requestGetAllTable } from '../../actions/getAllTable';
import { requestGetAllDB } from '../../actions/getAllDB';
import { requestImportFile, clearData } from '../../actions/importDB';
import { requestGetTableColumn } from '../../actions/getTableColumn';
import { requestGetAllRecord } from '../../actions/getAllRecord';
import { requestDeleteDB } from '../../actions/deleteDB';
import ModalImportDB from '../Base/Modal/ModalImportDB';
// import TableListDropdown from '../Base/Dropdowns/TableListDropdown';
import ColumnList from '../Table/ColumnList';
import TableList from '../Table/TableList';
import TableDetail from '../Table/TableDetail';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      showModalImport: false,
      selectedTable: '',
      selectedDB: '',
      columnList: []
    };

    this.clickBtnImport = this.clickBtnImport.bind(this);
    this.closeModalImport = this.closeModalImport.bind(this);
    this.onChangeTable = this.onChangeTable.bind(this);
    this.deleteDB = this.deleteDB.bind(this);
  }

  componentWillMount() {
    console.log('chekc porp')
    console.log(this.props)
    // this.props.requestGetAllTable();
    this.props.requestGetAllDB();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.importFileStatus !== this.props.importFileStatus &&
      nextProps.importFileStatus === 'success') {
        this.props.requestGetAllDB();
        // this.props.requestGetAllTable();
        this.closeModalImport();
    }

    if (nextProps.deleteDBStatus !== this.props.deleteDBStatus &&
      nextProps.deleteDBStatus === 'success') {
        nextProps.requestGetAllDB();
    }
  }

  clickBtnImport() {
    this.setState({
      showModalImport: true,
    })
  }

  closeModalImport() {
    this.props.clearData();
    this.setState({
      showModalImport: false,
    })
  }

  deleteDB(dbName) {
    const { requestDeleteDB } = this.props;
    console.log('-----delete db------', dbName)
    requestDeleteDB(dbName);
  }

  onChangeTable(tableName, databaseName, columnList) {

    if (tableName !== this.state.selectedTable ||
      databaseName !== this.state.selectedDB) {
        this.setState({
          selectedTable: tableName,
          selectedDB: databaseName,
          columnList: columnList
        });

        // this.props.requestGetTableColumn(tableName);
        this.props.requestGetAllRecord(databaseName, tableName)
      }
    
    // this.props.requestGetTableColumn(tableName);
    // this.props.requestGetAllRecord(databaseName, tableName);
  }

  render() {
    const {
      loadingTableList,
      tableList,
      columnList,
      loadingColumnList,
      importFileStatus,
      loadingAllRecord,
      allRecord,
      databaseList,
      loadingDataBaseList,
      importFileMessage,
      deleteDBStatus
    } = this.props;

    return (
      <div className="animated fadeIn" id="minhloi">
        {
          (loadingTableList === 'loading' ||
          importFileStatus === 'loading' ||
          loadingColumnList === 'loading' ||
          loadingAllRecord === 'loading' ||
          loadingDataBaseList === 'loading' ||
          deleteDBStatus === 'loading'
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
        <div className="dashboard-menu">
          <div className="label-data-source">
            <span>Data Source: </span>
          </div>
          {/* <div className="table-list-dropdown">
            <TableListDropdown
              listOptions={tableList}
              onChange={this.onChangeTable}
            />
          </div> */}
          <div>
            <Button
              color="primary"
              className="btn-import-db"
              onClick={this.clickBtnImport}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-content-left">
            {/* <ColumnList
              listColumn={columnList}
            /> */}
            <div className="label-list-table">
              List database
            </div>
            <TableList
              listTable={databaseList}
              onChange={this.onChangeTable}
              deleteDB={this.deleteDB}
              showDelete={true}
            />
          </div>

          {/* <div className="dashboard-content-right">
            <div className="label-list-column">
              List column: {this.state.selectedTable}
            </div>
            <ColumnList
              listColumn={columnList}
            />
          </div> */}

          <div className="dashboard-content-right">
            <div className="label-list-column">
              Table name: {this.state.selectedTable}
            </div>
            <TableDetail
              columnList={this.state.columnList}
              data={allRecord}
              loadingData={loadingAllRecord}
            />
          </div>

        </div>
        <ModalImportDB
          importFunct={this.props.requestImportFile}
          closeFunct={this.closeModalImport}
          showModal={this.state.showModalImport}
          uploadStatus={importFileStatus}
          messageError={importFileMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkData: state.databaseReducer,
    databaseList: state.databaseReducer.dataBaseList,
    loadingDataBaseList: state.databaseReducer.loadingDataBaseList,
    tableList: state.tableReducer.tableList,
    prefixTable: state.tableReducer.prefixTable,
    loadingTableList: state.tableReducer.loadingTableList,
    columnList: state.tableColumnReducer.columnList,
    loadingColumnList: state.tableColumnReducer.loadingColumnList,
    importFileStatus: state.importFileReducer.importFile,
    importFileMessage: state.importFileReducer.messageError,
    loadingAllRecord: state.allRecordReducer.loadingAllRecord,
    allRecord: state.allRecordReducer.data,
    deleteDBStatus: state.deleteDB.deleteStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGetAllTable: bindActionCreators(requestGetAllTable, dispatch),
    requestImportFile: bindActionCreators(requestImportFile, dispatch),
    clearData: bindActionCreators(clearData, dispatch),
    requestGetTableColumn: bindActionCreators(requestGetTableColumn, dispatch),
    requestGetAllRecord: bindActionCreators(requestGetAllRecord, dispatch),
    requestGetAllDB: bindActionCreators(requestGetAllDB, dispatch),
    requestDeleteDB: bindActionCreators(requestDeleteDB, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
