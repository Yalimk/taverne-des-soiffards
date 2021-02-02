export const createPost = async (userId, token, post) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/post/new/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: post,
      }
    );
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't post data to api because of error: ${error}.`
    );
  }
};

export const listAllPosts = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/posts`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
      );
    }
};

export const viewPost = async (postId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api in viewPost because of error: ${error}.`
      );
    }
};

export const listUserPosts = async (userId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/posts/by/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
      );
    }
};

export const remove = async (postId, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't get response from api because of error: ${error}.`
    );
  }
};

export const updatePost = async (postId, token, post) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: post,
    });
    console.info('INSIDE UPDATEPOST APRES LE FETCH MAIS AVANT LE RETOUR DE LA REPONSE')
    return response.json();
  } catch (error) {
    return console.error(
      `Couldn't put data to api because of error: ${error}.`
    );
  }
};


