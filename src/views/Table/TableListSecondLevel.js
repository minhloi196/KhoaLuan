import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class TableListSecondLevel extends Component {
  constructor(props) {
    super(props);

    this.renderListColumn = this.renderListColumn.bind(this);
  }

  renderListColumn = (listColumn) => {
    const result = listColumn.map((item) =>
      <div key={item}>{item}</div>
    )

    return result;
  }

  render() {
    const { listTable, dataBaseName, onChange } = this.props;
    const tableList = listTable.map((item) =>
      <div
        onClick={(e) => {
          e.preventDefault();
          if (onChange) {
            onChange(item.tableName, dataBaseName, item.columns);
          }
          // onChange(item.tableName, dataBaseName, item.columns);
        }}
        key={item.tableName}
      >
        <div className='second-collapsible'>
          <Collapsible trigger={item.tableName}>
            {
              this.renderListColumn(item.columns)
            }
          </Collapsible>
        </div>
      </div>
    )

    return (
      tableList
    );
  }
}

export default TableListSecondLevel;
