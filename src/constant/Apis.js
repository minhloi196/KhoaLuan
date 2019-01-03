export const UPLOAD_CSV_FILE = '/uploadCSVFile/{user}';
export const UPLOAD_DUMP_FILE = '/uploadDumpSQLFile/{user}';

export const GET_TABLE_COLUMN_API = '/account/database/manager/showTableColumn/{user}?';
export const GET_USER_TABLE_API = '/account/database/manager/showUserTable/{user}';
export const QUERY_API = '/account/database/manager/{user}?';
export const DELETE_TABLE = '/account/database/manager/deleteTable/{user}?';
export const GET_USER_DB_API = '/account/database/manager/showUserDB/{user}';

// login
export const LOGIN_API = '/api/auth/signin';

// register
export const REGISTER_API = '/api/auth/signup';

// delete db
export const DELETE_DATABASE_API = '/account/database/removeDB/{user}?databasename={databasename}';

// corporate health
export const GET_TABLE_1_API = '/account/corporatehealth/manager/caculateTable1/{user}?databasename={databasename}&tablename={tablename}';
export const GET_TABLE_2_API = '/account/corporatehealth/manager/caculateTable2/{user}?databasename={databasename}&tablename={tablename}';
