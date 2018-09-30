import React, { Component } from 'react';
import { Card, CardBody, CardColumns, CardHeader, Button } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import EChartLine from './EChartLine';



class Charts extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        {/* <CardColumns className="cols-2"> */}
          <Card>
            <CardHeader>
              Line Chart
              <div className="card-header-actions">
                {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                {/* <span style={{width: '50px', backgroundColor: 'pink'}}><i className="icon-cloud-download"></i></span> */}
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <EChartLine/>
              </div>
            </CardBody>
          </Card>
        {/* </CardColumns> */}
      </div>
    );
  }
}

export default Charts;
