import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';

import {
  requestRegister,
} from '../../../actions/registerAction';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        userName: '',
        email: '',
        password: '',
        rPassword: '',
      },
      redirect: false,
      error: false,
      message: '',
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.creatAccount = this.creatAccount.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  onInputChange(name, event) {
    let info = Object.assign({}, this.state.info)
    info[name] = event.target.value;
    this.setState({
      info,
    })
  }

  setRedirect() {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return (
        <Redirect to='/login' />
      )
    }
  }

  creatAccount(info) {
    console.log('create account', info);
    if (info.userName === '') {
      this.setState({
        error: true,
        message: 'user name is null!',
      })
      return;
    }
    if (info.email === '') {
      this.setState({
        error: true,
        message: 'email is null!',
      })
      return;
    }
    if (info.password === '') {
      this.setState({
        error: true,
        message: 'password is null!',
      })
      return;
    }
    if (info.password !== info.rPassword) {
      this.setState({
        error: true,
        message: 'repeat password is mismatched!',
      })
      return;
    }

    this.props.requestRegister(this.state.info);
  }

  renderAlert(error, message) {
    if (error) {
      return <Alert color="warning" className="text-center">
        {message}
      </Alert>
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.registerStatus === 'failed') {
        this.setState({
          error: true,
          message: nextProps.message,
        })
      }

      if (nextProps.registerStatus === 'success') {
        console.log('run success')
        let info = {
          userName: '',
          email: '',
          password: '',
          rPassword: '',
        };
        this.setState({
          error: true,
          message: 'register success',
          info,
        })
      }
    }
  }

  render() {
    const { registerStatus } = this.props;
    return (
      <div className="app flex-row align-items-center">
        {
          registerStatus === 'loading' &&
          <div className="loader-wrapper">
            <Loader 
              type="Oval"
              color="#00BFFF"
              height="100"
              width="100"
            />
          </div>
        }
        {this.renderRedirect()}
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    {this.renderAlert(this.state.error, this.state.message)}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        value={this.state.info.userName}
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(value) => {
                          this.onInputChange('userName', value)
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        value={this.state.info.email}
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(value) => {
                          this.onInputChange('email', value)
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        value={this.state.info.password}
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={(value) => {
                          this.onInputChange('password', value)
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
                        value={this.state.info.rPassword}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        onChange={(value) => {
                          this.onInputChange('rPassword', value)
                        }}
                      />
                    </InputGroup>
                    <Button color="success" block
                      onClick={()=>{
                        this.creatAccount(this.state.info)
                      }}
                    >Create Account</Button>
                    <Button color="primary" block
                      onClick={()=>{
                        this.setRedirect()
                      }}
                    >Login</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerStatus: state.registerReducer.registerStatus,
    message: state.registerReducer.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestRegister: bindActionCreators(requestRegister, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
