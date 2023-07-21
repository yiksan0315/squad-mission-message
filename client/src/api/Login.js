import API from '.';

export const login = async ({ id, password }, onSuccess) => {
  try {
    const response = await API.post('/account/login', {
      id,
      password,
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    onSuccess();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const register = async ({ id, password, nickname }, onSuccess) => {
  try {
    const response = await API.post('/account', {
      id,
      password,
      nickname,
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    onSuccess(data.message);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = async (onSuccess) => {
  try {
    const response = await API.post('/account/logout');
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    onSuccess();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const check = async (token) => {
  const noData = {};
  try {
    const response = await API.post('/account/check', noData, {
      headers: {
        'x-access-token': token,
      },
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};
