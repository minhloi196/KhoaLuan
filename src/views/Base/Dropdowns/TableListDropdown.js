import React, { Component } from 'react';
import { Input } from 'reactstrap';

class TableListDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listOptions, onChange } = this.props;
    const optionList = listOptions.map((item) =>
      <option key={item.value}>{item.name}</option>
    )

    return (
      <Input type="select" name="select" onChange={onChange}>
        <option>Select table</option>
        {optionList}
      </Input>
    );
  }
}

export default TableListDropdown;
