import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import * as _ from 'lodash';

class EChartLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }

    this.getOption = this.getOption.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data !== this.props.data &&
  //     nextProps.loadingData === 'success') {
  //       if (nextProps.listKey.length !== 0) {
  //         let data = {};
  //         for (let i in nextProps.listKey) {
  //           let item = [];
  //           for (let j in nextProps.data){
  //             item.push(nextProps.data[j][nextProps.listKey[i].name]);
  //           }
  //           data[nextProps.listKey[i].name] = item;
  //         };
  //         this.setState({
  //           data: data,
  //         })
  //       }
  //     }
  // }

  getOption() {
    const { options } = this.props;
    // let yAxisData = [];

    // let dataZoomEnd = 100;


    // for (let i = 0; i < this.state.data[setting.yAxis].length; i++) {
    //   yAxisData.push(parseInt(this.state.data[setting.yAxis][i], 10));
    // }

    // console.log('type', setting.type);
    // console.log('xaxis', this.state.data[setting.xAxis])
    // console.log('yaxis', this.state.data[setting.yAxis])

    // let listLegend = [];
    // listLegend.push(setting.xAxis.toString());

    // if (setting.type === 'line') {
      return {
        legend: {
          // data: ['bar', 'bar2'],
          data: options.listLegend,
          align: 'left'
        },
        grid: {
          // left: '5%',
          top: '30',
          right: '10',
          bottom: '20%'
        },
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: {
          type: 'category',
          data: options.xAxisData,
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 45,
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: options.seriesName,
          data: options.yAxisData,
          type: 'line'
        }]
      }
    // }
  }

  render() {
    const style = {
      height: '500px'
    }
    // const {
    //   options
    // } = this.props;
    // console.log('props', this.props)
    // if (setting.type && setting.xAxis && setting.yAxis && loadingData === 'success') {
    //   let opitons = _.cloneDeep(this.getOption());
      return (
        <ReactEcharts
          option={this.getOption()}
          style={style}
        />
      );
    }
// 
    // return null;
  // }
}

export default EChartLine;
