const localStorageConfig = {
  tokenName: 'GYfXORPwLt',
};

const { tokenName } = localStorageConfig;

const setAccessToken = (token) => {
  try {
    localStorage.setItem(tokenName, token);
  } catch (err) {
    Console.log(err);
  }
};

const getAccessToken = () => {
  try {
    return localStorage.getItem(tokenName) || '';
  } catch (err) {
    Console.log(err);
  }
};

export default {
  setAccessToken,
  getAccessToken,
};
