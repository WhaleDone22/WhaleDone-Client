import AsyncStorage from '@react-native-async-storage/async-storage';

const BASEURL =
  'http://ec2-3-37-42-113.ap-northeast-2.compute.amazonaws.com:8080/';
const getAccessToken = () => AsyncStorage.getItem('token') ?? '';

const getBasePrivateHeaders = () => ({
  Accept: `*/*`,
  'Content-Type': `application/json`,
  'X-AUTH-TOKEN': getAccessToken(),
});

const basePublicHeaders = {
  Accept: `*/*`,
  'Content-Type': `application/json`,
};

interface Request {
  url: string;
  headers?: object;
  isPrivate: boolean;
  method: 'get' | 'post' | 'put' | 'delete';
}

interface RequestWithParams extends Request {
  params?: object;
}

interface RequestWithData extends Request {
  data?: object;
}

const sendRequest = ({
  url,
  method,
  headers,
  isPrivate,
}: RequestWithParams) => {
  const baseHeaders = isPrivate ? getBasePrivateHeaders() : basePublicHeaders;
  return fetch(BASEURL + url, {
    method,
    headers: { ...baseHeaders, ...headers },
  }).then((response) => response.json());
};

const sendRequestForData = ({
  url,
  method,
  headers,
  isPrivate,
  data,
}: RequestWithData) => {
  const baseHeaders = isPrivate ? getBasePrivateHeaders() : basePublicHeaders;
  return fetch(BASEURL + url, {
    method,
    headers: { ...baseHeaders, ...headers },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

export const privateAPI = {
  get: ({
    url,
    params,
    headers,
  }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'get', headers, isPrivate: true }),
  post: ({
    url,
    data,
    headers,
  }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      isPrivate: true,
    }),
  put: ({
    url,
    data,
    headers,
  }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'put',
      headers,
      isPrivate: true,
    }),
  delete: ({
    url,
    params,
    headers,
  }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'delete', headers, isPrivate: true }),
};

export const publicAPI = {
  get: ({
    url,
    params,
    headers,
  }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'get', headers, isPrivate: false }),
  post: ({
    url,
    data,
    headers,
  }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      isPrivate: false,
    }),
  put: ({
    url,
    data,
    headers,
  }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'put',
      headers,
      isPrivate: false,
    }),
  delete: ({
    url,
    params,
    headers,
  }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'delete', headers, isPrivate: false }),
};
