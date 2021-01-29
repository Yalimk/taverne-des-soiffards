export const read = async (userId, token) => {
  let response;
  try {
    response = await fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Couldn't get response from api because of error: ${error}.`);
  }
  if (response) {
    try {
      return response.json();
    } catch (error) {
      console.error(
        `Couldn't send the response.json() because of error: ${error}.`
      );
    }
  } else {
    console.error(`Couldn't find any response for some reason...`);
  }
};

export const listAllUsers = async () => {
  let response;
  try {
    response = await fetch(`${process.env.REACT_APP_API_URI}/users`, {
      method: "GET",
    });
  } catch (error) {
    console.error(`Couldn't get response from api because of error: ${error}.`);
  }
  if (response) {
    try {
      return response.json();
    } catch (error) {
      console.error(
        `Couldn't send the response.json() because of error: ${error}.`
      );
    }
  } else {
    console.error(`Couldn't find any response for some reason...`);
  }
};

export const updateUser = async (userId, token, user) => {
  let response;
  try {
    response = await fetch(`${process.env.REACT_APP_API_URI}/user/edit/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.error(`Couldn't put date to api because of error: ${error}.`);
  }
  if (response) {
    try {
      return response.json();
    } catch (error) {
      console.error(
        `Couldn't send the response.json() because of error: ${error}.`
      );
    }
  } else {
    console.error(`Couldn't find any response for some reason...`);
  }
};

export const remove = async (userId, token) => {
  let response;
  try {
    response = await fetch(`${process.env.REACT_APP_API_URI}/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Couldn't get response from api because of error: ${error}.`);
  }
  if (response) {
    try {
      return response.json();
    } catch (error) {
      console.error(
        `Couldn't send the response.json() because of error: ${error}.`
      );
    }
  } else {
    console.error(`Couldn't find any response for some reason...`);
  }
};
