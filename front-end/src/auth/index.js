export const signup = async (newUser) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const signout = async (redirect) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    redirect();
    const response = await fetch(`${process.env.REACT_APP_API_URI}/signout`, {
      method: "GET",
    });
    return response.json({
      message: "User disconnected",
    });
  }
};

export const logUserIn = (jwt, redirect) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  redirect();
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const forgotPassword = async (email) => {
  console.info(
    `[index.js forgotPassword (front-end)] : E-mail retrieved as an argument of forgotPassword in auth/index: ${email}`
  );
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/forgot-password/`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(
      `The method forgotPassword encountered an error of type: ${error}.`
    );
  }
};

export const resetPassword = async (newCredentials) => {
  console.log(`[index.js resetPassword (front-end)] : newCredentials: ${JSON.stringify(newCredentials)}`)
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/reset-password/`, {
      method: "PUT",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCredentials)
    });
    console.log('[index.js resetPassword (front-end)] : response: ', response);
    return await response.json();
  } catch (error) {
    console.error(`The method resetPassword inside auth/index encountered and error of type: ${error}.`)
  }
};
