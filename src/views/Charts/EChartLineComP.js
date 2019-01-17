import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import * as _ from 'lodash';

class EChartLineComP extends Component {
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
          name: series1,
          data: options.yAxisData,
          type: 'line'
        },{
          name: series2,
          data: options.yAxisDataSecond,
          type: 'line'
        }
      ]
      }
    // }
  }

  render() {
    const style = {
      height: '500px'
    }
      return (
        <ReactEcharts
          option={this.getOption()}
          style={style}
        />
      );
    }
}

export default EChartLineComP;
