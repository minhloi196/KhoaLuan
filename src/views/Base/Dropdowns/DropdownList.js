import React, { Component } from 'react';
import { Input } from 'reactstrap';

class DropdownList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { defaultOption, listOptions, onChange } = this.props;
    const optionList = listOptions.map((item) =>
      <option key={item.value}>{item.name}</option>
    )

    return (
      <Input type="select" name="select" onChange={onChange}>
        <option>{defaultOption}</option>
        {optionList}
      </Input>
    );
  }
}

export default DropdownList;
