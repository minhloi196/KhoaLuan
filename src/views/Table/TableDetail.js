import React, { Component } from 'react';
import ReactTable from "react-table";
import ReactTooltip from 'react-tooltip';

class TableDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columnList !== this.props.columnList &&
        nextProps.columnList.lenght !== 0
      ) {
      this.setState({
        columns: this.generateTableHeader(nextProps.columnList),
      })
    }
  }

  generateTableHeader(columnList) {
    let columns = [];

    for (let item in columnList) {
      const headerItem = {
        Header: columnList[item].toString(),
        accessor: columnList[item].toString(),
        Cell: props => <span data-tip={props.value}>{props.value}</span>
      };

      columns.push(Object.assign({}, headerItem));
    }

    return columns;
  }

  render() {
    const { data, loadingData } = this.props;

    if (this.state.columns.lenght !== 0 &&
      loadingData === 'success') {
      return (
        <div>
          <ReactTable
            defaultPageSize={10}
            data={data}
            columns={this.state.columns}
          />
          <ReactTooltip />
        </div>
      );
    }

    return null;
  }
}

export default TableDetail;
