import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    // the variant represent the color of the alert, which will be passed as props from the homescreen and also the children will be the error message prop passed from the homescreen
    <Alert variant={variant}>{children}</Alert>
  );
}

export default Message;
