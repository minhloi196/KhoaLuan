import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DropdownList from '../Base/Dropdowns/DropdownList';
import TableListDB from '../Table/TableListDB';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ComparisionAside extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      selectedTable: '',
      selectedDB: ''
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    this.selectTable = this.selectTable.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }


  submit() {
    const { onSubmit } = this.props;
    onSubmit(this.state.selectedDB, this.state.selectedTable);
  }

  selectTable(databaseName, tableName) {
    this.setState({
      selectedTable: tableName,
      selectedDB: databaseName
    })
  }

  render() {

    // eslint-disable-next-line
    const { listTable, children,listKey, ...attributes } = this.props;

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
              <h6 style={{backgroundColor: "yellow"}}>
                Please select table to calculate
              </h6>
              <div>
                <h6>Selected database: {this.state.selectedDB}</h6>
                <h6>Selected table: {this.state.selectedTable}</h6>
              </div>
              <div>
                <TableListDB
                  listTable={listTable}
                  selectTable={this.selectTable}
                />

                <div className="pull-right btn-submit-query padding-bottom-5">
                  <Button
                    color="primary"
                    onClick={this.submit}
                  >
                    Apply
                  </Button>
                </div>
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
