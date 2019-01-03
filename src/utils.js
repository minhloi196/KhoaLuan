export const convertTableList = (tableList) => {
  let result = [];

  for (let i = 0; i < tableList.length; i++) {
    result.push(
      tableList[i].databaseName,
    )
  }

  return result;
}

export const getPrefixTable = (tableList) => {
  let result = '';

  result = tableList[0].split('_')[0];

  return result;
};

export const getListKey = (data) => {
  if (data.length === 0) {
    return [];
  } else {
    const listKey = Object.keys(data[0]);
    let result = [];
    for (let item in listKey) {
      let temp = {
        name: listKey[item],
        value: listKey[item]
      };
      result.push(Object.assign({}, temp));
    }
    return result;
  }
}

export const setAuth = () => {
  let token = sessionStorage.getItem('accessToken');
  let type = sessionStorage.getItem('tokenType');
  let auth = type + ' ' + token;

  return auth;
}
