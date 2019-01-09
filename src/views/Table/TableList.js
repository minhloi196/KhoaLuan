import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

import TableListSecondLevel from './TableListSecondLevel';

class TableList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listTable, onChange, analyze, selectDataBase, deleteDB, showDelete } = this.props;
    let tableList = null;
    if (showDelete && showDelete === true) {
      tableList = listTable.map((item) =>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (analyze === true && selectDataBase) {
              selectDataBase(item.databaseName);
            }
          }}
          key={item.databaseName}
          style={{
            display:"flex",
            flexBasis:"row"
          }}
        >
          <Collapsible
            trigger={item.databaseName}
            className="width-95"
          >
            <TableListSecondLevel
              listTable={item.tables}
              dataBaseName={item.databaseName}
              onChange={onChange}
            />
          </Collapsible>
          <div
            style={{
              paddingTop:"10px",
              color:"red"
            }}
            onClick={(e) => {
              e.preventDefault();
              if (deleteDB) {
                deleteDB(item.databaseName);
              }
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      )
    } else {
      tableList = listTable.map((item) =>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (analyze === true && selectDataBase) {
              selectDataBase(item.databaseName);
            }
          }}
          key={item.databaseName}
        >
          <Collapsible
            trigger={item.databaseName}
          >
            <TableListSecondLevel
              listTable={item.tables}
              dataBaseName={item.databaseName}
              onChange={onChange}
            />
          </Collapsible>
        </div>
      )
    }

    return (
      tableList
    );
  }
}

export default TableList;
