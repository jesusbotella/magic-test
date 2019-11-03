const BASE_URL = 'https://api.magicthegathering.io/';
const defaultParameters = {
  page: 0,
  pageSize: 30,
  contains: 'imageUrl',
};

async function sendRequest(url) {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    return Promise.reject(response);
  }

  return response.json();
}

/* eslint-disable-next-line import/prefer-default-export */
export async function getCards(requestParameters) {
  const parameters = {
    ...defaultParameters,
    ...requestParameters
  };

  // Seems like Expo's React Native version doesn't have
  // latest URLSearchParams version within RN
  // and cannot use toString :(
  let queryParameters = `page=${parameters.page}&pageSize=${parameters.pageSize}&contains=${parameters.contains}`;

  if (parameters.name) {
    queryParameters += `&name=${parameters.name}`;
  }

  return sendRequest(`/v1/cards?${queryParameters}`);
}
