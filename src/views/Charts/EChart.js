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

  // setOption() {
  //   const { setting } = this.props;
  //   let yAxisData = [];

  //   // let dataZoomEnd = 100;


  //   for (let i = 0; i < this.state.data[setting.yAxis].length; i++) {
  //     yAxisData.push(parseInt(this.state.data[setting.yAxis][i], 10));
  //   }

  //   // console.log('type', setting.type);
  //   // console.log('xaxis', this.state.data[setting.xAxis])
  //   // console.log('yaxis', this.state.data[setting.yAxis])

  //   let listLegend = [];
  //   listLegend.push(setting.xAxis.toString());
  //   console.log('---------------')
  //   console.log(listLegend)

  //   if (setting.type === 'bar') {
  //     return {
  //       legend: {
  //         // data: ['bar', 'bar2'],
  //         data: listLegend,
  //         align: 'left'
  //       },
  //       grid: {
  //         top: '20',
  //         right: '10px',
  //         bottom: '30%'
  //       },
  //       dataZoom: [{
  //         type: 'inside'
  //       }, {
  //           type: 'slider'
  //       }],
  //       tooltip: {},
  //       xAxis: {
  //         data: this.state.data[setting.xAxis],
  //         silent: false,
  //         splitLine: {
  //             show: false
  //         },
  //         axisLabel: {
  //           rotate: 45,
  //         }
  //       },
  //       yAxis: {
  //       },
  //       series: [{
  //         name: setting.xAxis,
  //         type: 'bar',
  //         data: yAxisData,
  //         animationDelay: function (idx) {
  //             return idx * 10;
  //         }
  //       }],
  //       animationEasing: 'elasticOut',
  //       animationDelayUpdate: function (idx) {
  //           return idx * 5;
  //       }
  //     }
  //   }

  //   if (setting.type === 'line') {
  //     return {
  //       legend: {
  //         // data: ['bar', 'bar2'],
  //         data: listLegend,
  //         align: 'left'
  //       },
  //       grid: {
  //         // left: '5%',
  //         top: '20',
  //         right: '10',
  //         bottom: '30%'
  //       },
  //       tooltip: {
  //         trigger: 'axis',
  //       },
  //       dataZoom: [{
  //         type: 'inside'
  //       }, {
  //         type: 'slider'
  //       }],
  //       xAxis: {
  //         type: 'category',
  //         data: this.state.data[setting.xAxis],
  //         splitLine: {
  //           show: false
  //         },
  //         axisLabel: {
  //           rotate: 45,
  //         }
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         name: setting.xAxis,
  //         data: yAxisData,
  //         type: 'line'
  //       }]
  //     }
  //   }

  //   if (setting.type === 'pie') {
  //     return {
  //       tooltip : {
  //         trigger: 'item',
  //         formatter: "{a} <br/>{b} : {c} ({d}%)"
  //       },
  //       legend: {
  //         type: 'scroll',
  //         orient: 'vertical',
  //         right: 10,
  //         top: 20,
  //         bottom: 20,
  //         data: this.state.data[setting.xAxis],
  //       },
  //       series : [
  //         {
  //           type: 'pie',
  //           radius : '55%',
  //           center: ['40%', '50%'],
  //           data: yAxisData,
  //           itemStyle: {
  //             emphasis: {
  //               shadowBlur: 10,
  //               shadowOffsetX: 0,
  //               shadowColor: 'rgba(0, 0, 0, 0.5)'
  //             }
  //           }
  //         },
  //       ]
  //     }
  //   }

  //   // return {
  //   //   grid: {
  //   //     left: '5%',
  //   //     top: '10',
  //   //     right: '10',
  //   //   },
  //   //   tooltip: {
  //   //     trigger: 'axis',
  //   //   },
  //   //   xAxis: {
  //   //     type: 'category',
  //   //     boundaryGap: false,
  //   //     data: this.state.data[setting.xAxis]
  //   //   },
  //   //   yAxis: {
  //   //     type: 'value',
  //   //     boundaryGap: [0, '100%']
  //   //   },
  //   //   // dataZoom: [{
  //   //   //   type: 'inside',
  //   //   //   start: 0,
  //   //   //   end: dataZoomEnd
  //   //   // }, {
  //   //   //   start: 0,
  //   //   //   end: 10,
  //   //   //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
  //   //   //   handleSize: '80%',
  //   //   //   handleStyle: {
  //   //   //     color: '#fff',
  //   //   //     shadowBlur: 3,
  //   //   //     shadowColor: 'rgba(0, 0, 0, 0.6)',
  //   //   //     shadowOffsetX: 2,
  //   //   //     shadowOffsetY: 2
  //   //   //   }
  //   //   // }],
  //   //   series: [
  //   //     {
  //   //       name:'sample data',
  //   //       type:setting.type,
  //   //       smooth:true,
  //   //       symbol: 'none',
  //   //       sampling: 'average',
  //   //       itemStyle: {
  //   //         color: 'rgb(255, 70, 131)'
  //   //       },
  //   //       areaStyle: {
  //   //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //   //           offset: 0,
  //   //           color: 'rgb(255, 158, 68)'
  //   //         }, {
  //   //             offset: 1,
  //   //             color: 'rgb(255, 70, 131)'
  //   //         }])
  //   //       },
  //   //       data: yAxisData
  //   //     }
  //   //   ]
  //   // }
  // }

  setOption() {
    const { setting } = this.props;
    let yAxisData = [];

    for (let i = 0; i < this.state.data[setting.yAxis].length; i++) {
      yAxisData.push(parseInt(this.state.data[setting.yAxis][i], 10));
    }

    let listLegend = [];
    listLegend.push(setting.yAxis.toString());

    return {
      listLegend,
      xAxisData: this.state.data[setting.xAxis],
      yAxisData,
      seriesName: setting.yAxis,
    }

    // if (setting.type === 'bar') {
    //   return {
    //     legend: {
    //       data: listLegend,
    //       align: 'left'
    //     },
    //     grid: {
    //       top: '20',
    //       right: '10px',
    //       bottom: '30%'
    //     },
    //     dataZoom: [{
    //       type: 'inside'
    //     }, {
    //         type: 'slider'
    //     }],
    //     tooltip: {},
    //     xAxis: {
    //       data: this.state.data[setting.xAxis],
    //       silent: false,
    //       splitLine: {
    //           show: false
    //       },
    //       axisLabel: {
    //         rotate: 45,
    //       }
    //     },
    //     yAxis: {
    //     },
    //     series: [{
    //       name: setting.xAxis,
    //       type: 'bar',
    //       data: yAxisData,
    //       animationDelay: function (idx) {
    //           return idx * 10;
    //       }
    //     }],
    //     animationEasing: 'elasticOut',
    //     animationDelayUpdate: function (idx) {
    //         return idx * 5;
    //     }
    //   }
    // }

    // if (setting.type === 'line') {
    //   return {
    //     legend: {
    //       // data: ['bar', 'bar2'],
    //       data: listLegend,
    //       align: 'left'
    //     },
    //     grid: {
    //       // left: '5%',
    //       top: '20',
    //       right: '10',
    //       bottom: '30%'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //     },
    //     dataZoom: [{
    //       type: 'inside'
    //     }, {
    //       type: 'slider'
    //     }],
    //     xAxis: {
    //       type: 'category',
    //       data: this.state.data[setting.xAxis],
    //       splitLine: {
    //         show: false
    //       },
    //       axisLabel: {
    //         rotate: 45,
    //       }
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [{
    //       name: setting.xAxis,
    //       data: yAxisData,
    //       type: 'line'
    //     }]
    //   }
    // }

    // if (setting.type === 'pie') {
    //   return {
    //     tooltip : {
    //       trigger: 'item',
    //       formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },
    //     legend: {
    //       type: 'scroll',
    //       orient: 'vertical',
    //       right: 10,
    //       top: 20,
    //       bottom: 20,
    //       data: this.state.data[setting.xAxis],
    //     },
    //     series : [
    //       {
    //         type: 'pie',
    //         radius : '55%',
    //         center: ['40%', '50%'],
    //         data: yAxisData,
    //         itemStyle: {
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           }
    //         }
    //       },
    //     ]
    //   }
    // }
  }

  // render() {
  //   const {
  //     loadingData,
  //     setting
  //   } = this.props;
  //   console.log('props', this.props)
  //   if (setting.type && setting.xAxis && setting.yAxis && loadingData === 'success') {
  //     let opitons = _.cloneDeep(this.getOption());
  //     return (
  //       <ReactEcharts
  //         option={opitons}
  //       />
  //     );
  //   }

  //   return null;
  // }

  render() {
    const {
      loadingData,
      setting,
      fromReport
    } = this.props;
    // console.log('props', this.props)
    if (setting.type && setting.xAxis && setting.yAxis && loadingData === 'success') {
      // let opitons = _.cloneDeep(this.getOption());

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
