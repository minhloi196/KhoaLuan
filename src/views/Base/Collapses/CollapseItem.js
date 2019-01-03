import React, { Component } from "react";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';

class CollapseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleAccordion, accordion, headingId, collapseId, index } = this.props;
    return (
      <Card>
        <CardHeader id={headingId}>
          <Button
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => toggleAccordion(index)}
            aria-expanded={accordion}
            aria-controls={collapseId}
          >
            <h5 className="m-0 p-0">Collapsible Group Item #1</h5>
          </Button>
        </CardHeader>
        <Collapse
          isOpen={accordion}
          data-parent="#accordion"
          id={collapseId}
          aria-labelledby={headingId}
        >
          <CardBody>
            1. Anim pariatur cliche reprehenderit, enim eiusmod high life
            accusamus terry richardson ad squid. 3 wolf moon officia aute, non
            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
            on it squid single-origin coffee nulla assumenda shoreditch et.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
            Leggings occaecat craft beer farm-to-table, raw denim aesthetic
            synth nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default CollapseItem;
