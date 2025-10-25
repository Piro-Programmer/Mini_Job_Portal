import React from "react";
import axios from "axios";
import { Form, Input, Button, Typography, Card, Select } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const navigate = useNavigate();



  // backend-connection

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      alert("Signup successful! Please sign in to continue.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <Title level={2} className="signup-title">
          Create Account <FontAwesomeIcon icon={faBriefcase} />
        </Title>

        <p className="signup-subtitle">Join Job Portal and start your journey</p>

        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="signup-form"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
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

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Select Role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Choose your role">
              <Option value="jobseeker">Job Seeker</Option>
              <Option value="employer">Employer</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="signin-link">
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
