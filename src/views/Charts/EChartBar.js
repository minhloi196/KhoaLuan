import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import * as _ from 'lodash';

class EChartBar extends Component {
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
    // const { setting } = this.props;
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
    // console.log('---------------')
    // console.log(listLegend)

    // if (setting.type === 'bar') {
      return {
        legend: {
          // data: ['bar', 'bar2'],
          data: options.listLegend,
          align: 'left'
        },
        grid: {
          top: '30',
          right: '10px',
          bottom: '20%'
        },
        dataZoom: [{
          type: 'inside'
        }, {
            type: 'slider'
        }],
        tooltip: {},
        xAxis: {
          data: options.xAxisData,
          silent: false,
          splitLine: {
              show: false
          },
          axisLabel: {
            rotate: 45,
          }
        },
        yAxis: {
        },
        series: [{
          name: options.seriesName,
          type: 'bar',
          data: options.yAxisData,
          animationDelay: function (idx) {
              return idx * 10;
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
      }
    // }
  }

  render() {
    const style = {
      height: '500px'
    }
    // const {
    //   loadingData,
    //   setting
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
    // }

    // return null;
  }
}

export default EChartBar;
