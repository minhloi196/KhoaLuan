import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem, Button } from 'reactstrap';
import classNames from 'classnames';

import DropdownList from '../Base/Dropdowns/DropdownList';


class ChartAside extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      chartSetting: {
        xAxis: '',
        yAxis: ''
      }
    };

    this.toggle = this.toggle.bind(this);
    this.onChangeChartXAxis = this.onChangeChartXAxis.bind(this);
    this.onChangeChartYAxis = this.onChangeChartYAxis.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onChangeChartXAxis(event) {
    this.setState({
      chartSetting: {
        ...this.state.chartSetting,
        xAxis: event.target.value,
      }
    })
  }

  onChangeChartYAxis(event) {
    this.setState({
      chartSetting: {
        ...this.state.chartSetting,
        yAxis: event.target.value,
      }
    })
  }

  submit() {
    const { onSubmit } = this.props;
    onSubmit(this.state.chartSetting);
  }

  render() {

    // eslint-disable-next-line
    const { children,listKey, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <TabPane tabId="3" className="p-3">

              <div className="block-dropdown">
                <h6>X-Axis</h6>
                <DropdownList
                  defaultOption={'Select X-Axis'}
                  listOptions={listKey}
                  onChange={this.onChangeChartXAxis}
                />
              </div>

              <div className="block-dropdown">
                <h6>Y-Axis</h6>
                <DropdownList
                  defaultOption={'Select Y-Axis'}
                  listOptions={listKey}
                  onChange={this.onChangeChartYAxis}
                />
              </div>

              <div className="pull-right btn-submit-query">
                <Button
                  color="primary"
                  onClick={this.submit}
                >
                  Select
                </Button>
              </div>

            </TabPane>
          </TabPane>
          
          
        </TabContent>
      </React.Fragment>
    );
  }
}

export default ChartAside;
