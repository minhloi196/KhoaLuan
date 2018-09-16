import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  requestLogin,
} from '../../../actions/loginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        userName: '',
        password: '',
      },
      redirect: '',
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(name, event) {
    let info = Object.assign({}, this.state.info)
    info[name] = event.target.value;
    this.setState({
      info,
    })
  }

  setRedirect(destination) {
    this.setState({
      redirect: destination,
    })
  }

  renderRedirect() {
    if (this.state.redirect === 'register') {
      return (
        <Redirect to='/register' />
      )
    }
    if (this.state.redirect === 'dashboard') {
      return (
        <Redirect to='/dashboard' />
      )
    }
  }

  renderAlert() {
    if (this.props.message !== '') {
      return <Alert color="warning" className="text-center">
        {this.props.message}
    </Alert>
    }
  }

  handleSubmit() {
    this.props.requestLogin(this.state.info);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.loginStatus === 'success') {
      this.setRedirect('dashboard');
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        {this.renderRedirect()}
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.renderAlert()}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={this.state.userName}
                          onChange={(value) => {
                            this.onInputChange('userName', value)
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={(value) => {
                            this.onInputChange('password', value)
                          }}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={() => {
                              this.props.requestLogin(this.state.info)
                            }}
                          >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Sign up to user this web app</p>
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        onClick={(event) => {
                          event.preventDefault();
                          this.setRedirect('register');
                        }}
                      >Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.loginReducer.loginStatus,
    message: state.loginReducer.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: bindActionCreators(requestLogin, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
