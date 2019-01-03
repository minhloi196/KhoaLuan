import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardHeader, Button, Alert } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Loader from 'react-loader-spinner';
import {
  AppAside,
} from '@coreui/react';
// import React, { Component } from 'react';
// import { Card, CardBody, CardColumns, CardHeader, Button } from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import EChartLine from './EChartLine';

import { requestGetAllDB } from '../../actions/getAllDB';
import ModalChangeQueryString from '../Base/Modal/ModalChangeQueryString';
import { requestGetRecordByQueryString } from '../../actions/getRecordByQueryString';
import { clearData } from '../../actions/clearData';
import RecordList from '../Table/RecordList';
import ChartAside from './ChartAside';
import ModalExportData from '../Base/Modal/ModalExportData';
import EChart from './EChart';

class Charts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModalChangeQuery: false,
      selectedTable: '',
      selectedDataBase: '',
      chartSetting: {},
      showModalExportData: false
    };

    this.clickBtnChangeQueryString = this.clickBtnChangeQueryString.bind(this);
    this.closeModalChangeQuery = this.closeModalChangeQuery.bind(this);
    this.applyQuery = this.applyQuery.bind(this);
    this.createChart = this.createChart.bind(this);
    this.showModalExportData = this.showModalExportData.bind(this);
    this.closeModalExportData = this.closeModalExportData.bind(this);
  }

  componentWillMount() {
    this.props.requestGetAllDB();
  }

  clickBtnChangeQueryString() {
    this.setState({
      showModalChangeQuery: true,
    })
  }

  closeModalChangeQuery() {
    this.setState({
      showModalChangeQuery: false,
    })
  }

  applyQuery(queryString, selectedDataBase) {
    const { requestGetRecordByQueryString } = this.props;
    this.setState({
      selectedDataBase: selectedDataBase
    })
    requestGetRecordByQueryString(queryString, selectedDataBase);
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

  // componentWillReceiveProps(nextProps) {
  //   console.log('----------check me-------', nextProps.listRecord)
  // }

  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    const {
    databaseList,
    loadingDataBaseList,
    listKey,
    loadingColumnList,
    listRecord,
    loadingListRecord,
    } = this.props;

    return (
      <div className="animated fadeIn">
        {
          (loadingColumnList === 'loading' ||
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
        <div className="report-content">
          <div className="width-50">
            <Card className="chart-page-item">
              <CardHeader>
                Data
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
                      onClick={this.clickBtnChangeQueryString}
                    >
                      <i className="fa fa-code" aria-hidden="true"></i>
                    </Button>
                  </div>
                  {
                    listRecord.length <= 0 ?
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
                        onClick={this.showModalExportData}
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
                  this.state.selectedDataBase !== '' ?
                  <div>
                    <div className="record-list">
                      <RecordList
                        defaultPageSize={10}
                        data={listRecord}
                        loadingData={loadingListRecord}
                      />
                    </div>
                    
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
                Pie chart
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <EChart
                    fromReport={true}
                    data={listRecord}
                    listKey={listKey}
                    loadingData={loadingListRecord}
                    setting={{
                      type: 'pie',
                      xAxis: this.state.chartSetting.xAxis,
                      yAxis: this.state.chartSetting.yAxis
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="width-50">
            <Card className="chart-page-item">
              <CardHeader>
                Line Chart
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <EChart
                    fromReport={true}
                    data={listRecord}
                    listKey={listKey}
                    loadingData={loadingListRecord}
                    setting={{
                      type: 'line',
                      xAxis: this.state.chartSetting.xAxis,
                      yAxis: this.state.chartSetting.yAxis
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          
            <Card className="chart-page-item">
              <CardHeader>
                Bar Chart
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <EChart
                    fromReport={true}
                    data={listRecord}
                    listKey={listKey}
                    loadingData={loadingListRecord}
                    setting={{
                      type: 'bar',
                      xAxis: this.state.chartSetting.xAxis,
                      yAxis: this.state.chartSetting.yAxis
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <AppAside fixed hidden>
            <ChartAside
              listKey={listKey}
              onSubmit={this.createChart}
            />
          </AppAside>

          <ModalChangeQueryString
            showModal={this.state.showModalChangeQuery}
            closeFunct={this.closeModalChangeQuery}
            applyQuery={this.applyQuery}
            databaseList={databaseList}
          />

          <ModalExportData
            showModal={this.state.showModalExportData}
            closeFunct={this.closeModalExportData}
            data={listRecord}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    databaseList: state.databaseReducer.dataBaseList,
    loadingDataBaseList: state.databaseReducer.loadingDataBaseList,
    listKey: state.recordList.listKey,
    loadingColumnList: state.tableColumnReducer.loadingColumnList,
    listRecord: state.recordList.data,
    loadingListRecord: state.recordList.loadingRecordList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGetRecordByQueryString: bindActionCreators(requestGetRecordByQueryString, dispatch),
    requestGetAllDB: bindActionCreators(requestGetAllDB, dispatch),
    clearData: bindActionCreators(clearData, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
// class Charts extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
//         {/* <CardColumns className="cols-2"> */}
//           <Card>
//             <CardHeader>
//               Line Chart
//               <div className="card-header-actions">
//                 {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
//                 {/* <span style={{width: '50px', backgroundColor: 'pink'}}><i className="icon-cloud-download"></i></span> */}
//               </div>
//             </CardHeader>
//             <CardBody>
//               <div className="chart-wrapper">
//                 <EChartLine/>
//               </div>
//             </CardBody>
//           </Card>
//         {/* </CardColumns> */}
//       </div>
//     );
//   }
// }

// export default Charts;
