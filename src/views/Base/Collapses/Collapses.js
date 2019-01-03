import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';

import CollapseItem from './CollapseItem';

class Collapses extends Component {

  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      collapse: false,
      accordion: [false, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
    };

    this.stubData = ['123', '345', '456'];
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <div id="accordion">
                
                  <CollapseItem
                    toggleAccordion={this.toggleAccordion}
                    accordion={this.state.accordion[0]}
                    headingId={'minhloi123'}
                    collapseId={'minhloi321'}
                    index={0}
                  />
                  <CollapseItem
                    toggleAccordion={this.toggleAccordion}
                    accordion={this.state.accordion[1]}
                    headingId={'minhloi1234'}
                    collapseId={'minhloi3214'}
                    index={1}
                  />
                  <CollapseItem
                    toggleAccordion={this.toggleAccordion}
                    accordion={this.state.accordion[2]}
                    headingId={'minhloi1235'}
                    collapseId={'minhloi3215'}
                    index={2}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Collapses;
