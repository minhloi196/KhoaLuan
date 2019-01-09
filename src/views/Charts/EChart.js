import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { Alert } from 'reactstrap';
import * as _ from 'lodash';

import EChartLine from './EChartLine';
import EChartBar from './EChartBar';
import EChartPie from './EChartPie';

class EChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
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
  }

  setOption() {
    const { setting } = this.props;
    let yAxisData = [];

    if (this.state.data[setting.yAxis]) {
      for (let i = 0; i < this.state.data[setting.yAxis].length; i++) {
        yAxisData.push(parseInt(this.state.data[setting.yAxis][i], 10));
      }
    }

    let listLegend = [];
    listLegend.push(setting.yAxis.toString());

    return {
      listLegend,
      xAxisData: this.state.data[setting.xAxis],
      yAxisData,
      seriesName: setting.yAxis,
    }

  }

  render() {
    const {
      loadingData,
      setting,
      fromReport
    } = this.props;
    // console.log('props', this.props)
    if (setting.type && setting.xAxis && setting.yAxis && loadingData === 'success') {

      if (setting.type === 'line') {
        return (
          <EChartLine
            options={this.setOption()}
          />
        )
      }

      if (setting.type === 'bar') {
        return (
          <EChartBar
            options={this.setOption()}
          />
        )
      }

      if (setting.type === 'pie') {
        return (
          <EChartPie
            options={this.setOption()}
          />
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
