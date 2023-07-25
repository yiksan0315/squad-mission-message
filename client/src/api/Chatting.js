import API from '.';

export const getChattings = async (from_id) => {
  try {
    const response = await API.get('/chatting', {
      params: { from_id },
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getChattingById = async ({ from_id, to_id }) => {
  try {
    const response = await API.get(`/chatting/${to_id}`, {
      params: { from_id },
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postChatting = async ({ from_id, to_id }) => {
  try {
    const response = await API.post('/chatting', {
      from_id,
      to_id,
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getMessages = async ({ chatting_id, from_id }) => {
  try {
    const response = await API.get('/message', {
      params: { chatting_id, from_id },
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postMessage = async ({ chatting_id, from_id, content }) => {
  try {
    const response = await API.post('/message', {
      chatting_id,
      from_id,
      content,
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};
