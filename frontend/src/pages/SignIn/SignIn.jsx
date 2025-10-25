import React from "react";
import axios from "axios";
import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import "./SignIn.css";

const { Title, Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();



  // backend-connection
  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: values.email,
        password: values.password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token); // store JWT
      const decoded = JSON.parse(atob(token.split('.')[1])); // decode payload
      const role = decoded.role;

      // Navigate based on role
      if (role === "jobseeker") navigate("/jobseeker-dashboard");
      else if (role === "employer") navigate("/employer-dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="signin-container">
      <Card className="signin-card">
        <Title level={2} className="signin-title">
          Welcome Back <FontAwesomeIcon icon={faBriefcase} />
        </Title>
        <Text type="secondary">Sign in to your Job Portal account</Text>

        <Form
          name="signin"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="signin-form"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>

          <div className="signin-footer">
            <Text type="secondary">Don’t have an account?</Text>{" "}
            <Link to="/signup">Sign Up</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;




