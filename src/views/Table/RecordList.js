import React, { Component } from 'react';
import ReactTable from "react-table";
import ReactTooltip from 'react-tooltip';

class RecordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data &&
        nextProps.data.length !== 0 &&
        nextProps.loadingData === 'success'
      ) {
      this.setState({
        columns: this.generateTableHeader(nextProps.data),
      })
    }
  }

  generateTableHeader(data) {
    let columns = [];

    let listColumnName = Object.keys(data[0]);

    for (let item in listColumnName) {
      const headerItem = {
        Header: listColumnName[item].toString(),
        accessor: listColumnName[item].toString(),
        Cell: props => <span data-tip={props.value}>{props.value}</span>
      };

      columns.push(Object.assign({}, headerItem));
    }

    return columns;
  }

  componentWillUnmount() {
    this.setState({
      columns: []
    })
  }

  render() {
    const { data, loadingData, defaultPageSize } = this.props;

    if (this.state.columns.length !== 0 &&
      loadingData === 'success') {
      return (
        <div>
          <ReactTable
            defaultPageSize={defaultPageSize}
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

export default RecordList;
