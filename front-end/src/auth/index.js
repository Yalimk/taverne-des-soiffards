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
    let response;
    try {
      response = await fetch(`${process.env.REACT_APP_API_URI}/signout`, {
        method: "GET",
      });
    } catch (error) {
      console.log(error);
    }
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
