import get from 'lodash/get';

export const isLocal = () =>
  (process.env.IS_LOCAL && JSON.parse(process.env.IS_LOCAL)) ||
  (process.env.IS_OFFLINE && JSON.parse(process.env.IS_OFFLINE));

export const failure = (callback, error) => {
  console.log('failure', error);
  return callback(get(error, 'message', 'Something went wrong. Please contact support@bankshift.com'));
};

export const success = (callback, data) => {
  console.log('success', JSON.stringify(data));
  return callback(null, data);
};
export const base64Encode = data => {
  try {
    data = JSON.stringify(data);
    const buff = Buffer.from(data);
    return buff.toString('base64');
  } catch (err) {
    console.log({ err });
  }
  return null;
};

export const base64Decode = data => {
  try {
    data = JSON.stringify(data);
    const buff = Buffer.from(data, 'base64');
    return JSON.parse(buff.toString('ascii'));
  } catch (err) {
    console.log({ err });
  }
  return null;
};

export const getFirstFromArray = (dbResponse, args) => {
  if (get(dbResponse.Items, 'length')) {
    return dbResponse.Items[0];
  }
  throw new Error(`No record present: {dbResponse: ${JSON.stringify(dbResponse)}, args: ${JSON.stringify(args)}}`);
};

export const addPagination = dbResponse => {
  if (dbResponse.LastEvaluatedKey) {
    dbResponse.pagination = { nextToken: base64Encode(dbResponse.LastEvaluatedKey) };
  }
  return dbResponse;
};

export const getSystemId = event => {
  if (!event.headers) {
    return {};
  }
  return { systemId: event.headers['x-ws-system-id'] };
};

export const logHandler = (event, callback) => {
  console.log(JSON.stringify({ event }));
  return callback(event);
};
