import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import * as _ from 'lodash';

class EChartPie extends Component {
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
    // console.log('-------------------------');
    // console.log(options)
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

    // if (setting.type === 'pie') {

      // series data format [{name: [string], value: [number]}]

      let seriesData = [];
      if (options.xAxisData) {
        for (let i = 0; i < options.xAxisData.length; i++) {
          let item = {
            name: options.xAxisData[i],
            value: options.yAxisData[i],
          }

          seriesData.push(Object.assign({}, item));
        }
      }

      return {
        tooltip : {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: options.xAxisData,
        },
        series : [
          {
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
        ]
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
    }

  //   return null;
  // }
}

export default EChartPie;
