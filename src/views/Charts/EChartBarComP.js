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
    this.getSeriesName = this.getSeriesName.bind(this);
  }

  getSeriesName(params1, params2) {
    return (params1 + ' ' + params2).toString();
  }

  getOption() {
    const { options } = this.props;

    let series1 = this.getSeriesName(options.seriesName, 'dataset 1')
    let series2 = this.getSeriesName(options.seriesName, 'dataset 2')

      return {
        legend: {
          data: [series1, series2],
          // data: options.listLegend,
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
          name: series1,
          type: 'bar',
          data: options.yAxisData,
          animationDelay: function (idx) {
              return idx * 10;
          }
        },{
          name: series2,
          type: 'bar',
          data: options.yAxisDataSecond,
          animationDelay: function (idx) {
              return idx * 10;
          }
        }
        ],
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
