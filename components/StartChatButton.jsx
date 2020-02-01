import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

export default function StartChatButton({ onClick }) {
  return (
    <Button
      type="primary"
      shape="round"
      icon="message"
      size="large"
      onClick={onClick}
    >
      Start chat
    </Button>
  );
}

StartChatButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
