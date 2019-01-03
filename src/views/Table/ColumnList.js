import React, { Component } from 'react';

class ColumnList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listColumn } = this.props;
    const columnList = listColumn.map((item) =>
      <div key={item}>{item}</div>
    )

    return (
      columnList
    );
  }
}

export default ColumnList;
