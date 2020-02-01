import React from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";

class SignInForm extends React.Component {
  handleSubmit = e => {
    const { form, onSubmit } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {form.getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("phoneNumber", {
            rules: [
              { required: true, message: "Please input your phone number!" },
              {
                pattern: "[0-9]{9}",
                message: "Please use the following format: 1234567890"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="tel"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SignInForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form.create({ name: "normal_login" })(SignInForm);
