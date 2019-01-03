import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class TableListDB extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listTable, selectTable } = this.props;
    const tableList = listTable.map((item) =>
        <div
          key={item.databaseName}
          className='second-collapsible'
        >
          <Collapsible
            trigger={item.databaseName}
          >
            {
              item.tables &&
              item.tables.map((table) => {
                return (
                  <div onClick={(e) => {
                    e.preventDefault();
                    selectTable(item.databaseName, table.tableName);
                  }}>
                    {table.tableName}
                  </div>
                )
              })
            }
            {/* <TableListSecondLevel
              listTable={item.tables}
              dataBaseName={item.databaseName}
              onChange={onChange}
            /> */}
          </Collapsible>
        </div>
      )

    return (
      tableList
    );
  }
}

export default TableListDB;
