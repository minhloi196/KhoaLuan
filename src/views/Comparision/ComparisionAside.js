import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DropdownList from '../Base/Dropdowns/DropdownList';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const chartTypeList = [
  {
    name: 'line',
    value: 'line',
  },
  {
    name: 'bar',
    value: 'bar',
  },
  {
    name: 'pie',
    value: 'pie',
  }
]

class ComparisionAside extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      chartSetting: {
        type: '',
        xAxis: '',
        yAxis: ''
      }
    };

    this.toggle = this.toggle.bind(this);
    this.onChangeChartType = this.onChangeChartType.bind(this);
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


  onChangeChartType(event) {
    this.setState({
      chartSetting: {
        ...this.state.chartSetting,
        type: event.target.value,
      }
    })
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
                <h6>Chart Type</h6>
                <DropdownList
                  defaultOption={'Select Chart Type'}
                  listOptions={chartTypeList}
                  onChange={this.onChangeChartType}
                />
              </div>

              <div className="block-dropdown">
                <h6>X-Axis</h6>
                <DropdownList
                  defaultOption={'Select X-Axis'}
                  listOptions={listKey}
                  onChange={this.onChangeChartXAxis}
                />
              </div>

              <div className="block-dropdown">
                <div style={{
                  marginBottom: '7px'
                }}>
                  <div style={{
                    width: '60%',
                    display: 'inline-block'
                  }}>
                    <h6>Y-Axis</h6>
                  </div>
                </div>
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
                  Create
                </Button>
              </div>

            </TabPane>
          </TabPane>
          
          
        </TabContent>
      </React.Fragment>
    );
  }
}

ComparisionAside.propTypes = propTypes;
ComparisionAside.defaultProps = defaultProps;

export default ComparisionAside;
