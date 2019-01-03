import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { requestLogout } from '../../actions/logoutActions';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navItemSelected: 1,
      userName: ''
    };

    this.onClickNavItem = this.onClickNavItem.bind(this);
    this.logoutFunct = this.logoutFunct.bind(this);
  }

  componentWillMount() {
    const user = sessionStorage.getItem('userName');
    this.setState({
      userName: user,
    })
  }

  onClickNavItem(value) {
    this.setState({
      navItemSelected: value,
    })
  }

  logoutFunct() {
    this.props.requestLogout();
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}

        <Nav className="d-md-down-none" pills>
          <NavItem className="px-3">
            <NavLink href="/" onClick={() => this.onClickNavItem(1)} active={this.state.navItemSelected === 1}>Manage</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/analyze" onClick={() => this.onClickNavItem(2)} active={this.state.navItemSelected === 2}>Analyze</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/report" onClick={() => this.onClickNavItem(3)} active={this.state.navItemSelected === 3}>Reporting</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/comparision" onClick={() => this.onClickNavItem(4)} active={this.state.navItemSelected === 4}>Comparision</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/corporate-health" onClick={() => this.onClickNavItem(5)} active={this.state.navItemSelected === 5}>Corporate Health</NavLink>
          </NavItem>
        </Nav>


        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink>{this.state.userName}</NavLink>
          </NavItem>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider /> */}
              {/* <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={this.logoutFunct}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogout: bindActionCreators(requestLogout, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
