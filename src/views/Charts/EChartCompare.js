import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { Alert } from 'reactstrap';
import * as _ from 'lodash';

import EChartLine from './EChartLine';
import EChartBar from './EChartBar';
import EChartPie from './EChartPie';
import EChartLineComP from './EChartLineComP';
import EChartBarComP from './EChartBarComP';

class EChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataSecond: {}
    }

    this.setOption = this.setOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data &&
      nextProps.loadingData === 'success') {
        if (nextProps.listKey.length !== 0) {
          let data = {};
          for (let i in nextProps.listKey) {
            let item = [];
            for (let j in nextProps.data){
              item.push(nextProps.data[j][nextProps.listKey[i].name]);
            }
            data[nextProps.listKey[i].name] = item;
          };
          this.setState({
            data: data,
          })
        }
      }

    if (nextProps.dataSecond !== this.props.dataSecond &&
      nextProps.loadingDataSecond === 'success') {
        if (nextProps.listKey.length !== 0) {
          let dataSecond = {};
          for (let i in nextProps.listKey) {
            let item = [];
            for (let j in nextProps.dataSecond){
              item.push(nextProps.dataSecond[j][nextProps.listKey[i].name]);
            }
            dataSecond[nextProps.listKey[i].name] = item;
          };
          this.setState({
            dataSecond: dataSecond,
          })
        }
      }
  }

  setOption() {
    const { setting } = this.props;
    let yAxisData = [];
    let yAxisDataSecond = [];

    if (this.state.data[setting.yAxis]) {
      for (let i = 0; i < this.state.data[setting.yAxis].length; i++) {
        yAxisData.push(parseInt(this.state.data[setting.yAxis][i], 10));

      }
    }

    if (this.state.dataSecond[setting.yAxis]) {
      for (let i = 0; i < this.state.dataSecond[setting.yAxis].length; i++) {
        yAxisDataSecond.push(parseInt(this.state.dataSecond[setting.yAxis][i], 10));
      }
    }

    let listLegend = [];
    listLegend.push(setting.yAxis.toString());

    return {
      listLegend,
      xAxisData: this.state.data[setting.xAxis],
      yAxisData,
      seriesName: setting.yAxis,
      yAxisDataSecond
    }

  }

  render() {
    const {
      loadingData,
      setting,
      fromReport,
    } = this.props;
    // console.log('props', this.props)
    if (setting.type && setting.xAxis && setting.yAxis && loadingData === 'success') {

      if (setting.type === 'line') {
        return (
          <EChartLineComP
            options={this.setOption()}
          />
        )
      }

      if (setting.type === 'bar') {
        return (
          <EChartBarComP
            options={this.setOption()}
          />
        )
      }

      if (setting.type === 'pie') {
        return (
          <Alert color="warning" className="text-center">
            Not support this format!
          </Alert>
        )
      };
    }

    if (fromReport) {
      return (
        <Alert color="warning" className="text-center">
          Please select x-axis and y-axis
        </Alert>
      );
    }

    return null;
  }
}

export default EChart;
