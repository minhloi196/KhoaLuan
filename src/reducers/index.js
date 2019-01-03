import { combineReducers } from 'redux'
import loginReducer from './loginReducer';
import tableReducer from './tableReducer';
import tableColumnReducer from './tableColumeReducer';
import importFileReducer from './importFileReducer';
import allRecordReducer from './getAllRecordReducer';
import recordList from './getRecordByQueryString';
import errorReducer from './errorReducer';
import registerReducer from './registerReducer';
import databaseReducer from './dataBaseReducer';
import fistRecordList from './getDataSetFist';
import secondRecordList from './getDataSetSecond';
import deleteDB from './deleteDatabase';
import getTable1 from './getTable1Reducer';
import getTable2 from './getTable2Reducer';

export default combineReducers({
  loginReducer,
  tableReducer,
  tableColumnReducer,
  importFileReducer,
  allRecordReducer,
  recordList,
  errorReducer,
  registerReducer,
  databaseReducer,
  fistRecordList,
  secondRecordList,
  deleteDB,
  getTable1,
  getTable2
})