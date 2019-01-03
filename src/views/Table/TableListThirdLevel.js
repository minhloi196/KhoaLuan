import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class TableListThirdLevel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listTable, onChange } = this.props;
    const tableList = listTable.map((item) =>
      // <div
      //   onClick={(e) => {
      //     e.preventDefault();
      //     onChange(item);
      //   }}
      //   className="item-table-name"
      //   key={item}
      // >

      <div
        onClick={(e) => {
          e.preventDefault();
          console.log('click minh loi')
        }}
        key={item}
      >
        {/* {item} */}
        <Collapsible trigger={item}>
         <div className='second-collapsible'>
          <Collapsible trigger={item}>
            <div>minh loi 123</div>
            <div>minh loi 789</div>
          </Collapsible>
          <Collapsible trigger={item}>
            <div>minh loi 123</div>
            <div>minh loi 789</div>
          </Collapsible>
          <Collapsible trigger={item}>
            <div>minh loi 123</div>
            <div>minh loi 789</div>
          </Collapsible>
          </div>
        </Collapsible>
      </div>
    )

    return (
      tableList
    );
  }
}

export default TableListThirdLevel;
