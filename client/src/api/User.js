import API from '.';

export const getUsers = async () => {
  try {
    const response = await API.get('/account');
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.accountNoPassword;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await API.get(`/account/:${id}`);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.account;
  } catch (err) {
    throw new Error(err.message);
  }
};
