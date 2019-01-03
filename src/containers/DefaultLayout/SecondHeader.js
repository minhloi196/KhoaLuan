import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class SecondHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navItemSelected: 1,
    };

    this.onClickNavItem = this.onClickNavItem.bind(this);
  }

  onClickNavItem(value) {
    this.setState({
      navItemSelected: value,
    })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <div className="second-header">
        <Nav className="d-md-down-none" pills>
          <NavItem className="px-3">
            <NavLink href="/" onClick={() => this.onClickNavItem(1)} active={this.state.navItemSelected === 1}>Data Manager</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#" onClick={() => this.onClickNavItem(2)} active={this.state.navItemSelected === 2}>Data Imports</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/charts" onClick={() => this.onClickNavItem(3)} active={this.state.navItemSelected === 3}>Data Transforms</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

SecondHeader.propTypes = propTypes;
SecondHeader.defaultProps = defaultProps;

export default SecondHeader;
