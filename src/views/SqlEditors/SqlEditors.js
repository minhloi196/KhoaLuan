import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/sql/sql.js';
// import 'codemirror/mode/xml/xml.js';
// import 'codemirror/mode/javascript/javascript.js';
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
// require('codemirror/mode/xml/xml.js');
// require('codemirror/mode/javascript/javascript.js');

// import {Controlled as CodeMirror} from 'react-codemirror2';

{/* <CodeMirror
  value={this.state.value}
  options={options}
  onBeforeChange={(editor, data, value) => {
    this.setState({value});
  }}
  onChange={(editor, value) => {
    console.log('controlled', {value});
  }}
/> */}



class SqlEditors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateQueryString, value } = this.props;

    return (

      // <CodeMirror
      //   value='SELECT column FROM table
      //   ORDER BY RANDOM()
      //   LIMIT 1'
      //   options={{
      //     mode: 'sql',
      //     theme: 'default',
      //     lineNumbers: true
      //   }}
      //   onChange={(editor, data, value) => {
      //   }}
      // />
    <CodeMirror
      value={value}
      options={{
        mode: "text/x-sql",
            theme: 'default',
            lineNumbers: true
          }}
          
      onChange={(editor, data, value) => {updateQueryString(value)}}
    />
    );
  }
}

export default SqlEditors;
