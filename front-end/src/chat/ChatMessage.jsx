import React from "react";

const messageLayout = ({ pseudo, message }) => (
  <p>
    <strong>{pseudo}</strong> <em>{message}</em>
  </p>
);

export default messageLayout;