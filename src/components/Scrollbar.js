import React from "react";
import Scrollbars from "react-custom-scrollbars";

export default function Scrollbar(props) {
  return <Scrollbars {...props}>{props.children}</Scrollbars>;
}
