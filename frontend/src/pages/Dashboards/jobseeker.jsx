import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  message,
  Tabs,
  Layout,
  Typography,
  Avatar,
  Empty,
  Input,
} from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  ApartmentOutlined,
  FileDoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import jobsData from "../data/job_data";
import "../Dashboards/job_seeker.css";

const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const JobSeekerDashboard = () => {
  const [currentJobs, setCurrentJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Load applied jobs from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(stored);

    const remainingJobs = jobsData.filter(
      (job) => !stored.some((a) => a.id === job.id)
    );
    setCurrentJobs(remainingJobs);
  }, []);

  // Apply job
  const handleApply = (job) => {
    const updatedApplied = [...appliedJobs, job];
    setAppliedJobs(updatedApplied);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedApplied));

    // Remove from current jobs
    const updatedCurrent = currentJobs.filter((j) => j.id !== job.id);
    setCurrentJobs(updatedCurrent);

    message.success(`You applied for ${job.title}!`);
  };

  // Filter jobs by title or skill
  const filteredJobs = currentJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills_required.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("appliedJobs");
    message.success("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <Layout className="jobseeker-layout">
      <Header className="jobseeker-header">
        <div className="header-left">
          <Avatar size="large" icon={<UserOutlined />} />
          <Title level={3} className="dashboard-title">
            JobSeeker Dashboard
          </Title>
        </div>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          danger
        >
          Logout
        </Button>
      </Header>

      <Content className="jobseeker-content">
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              key: "1",
              label: (
                <span>
                  <ApartmentOutlined /> Current Openings
                </span>
              ),
              children: (
                <>
                  <Search
                    placeholder="Search by job title or skill"
                    enterButton={<SearchOutlined />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: 400, marginBottom: 20 }}
                  />

                  <div className="card-container">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <Card
                          key={job.id}
                          title={job.title}
                          className="job-card"
                          hoverable
                        >
                          <p>
                            <strong>Company:</strong> {job.company_name}
                          </p>
                          <p>
                            <strong>Location:</strong> {job.location}
                          </p>
                          <p>
                            <strong>Type:</strong> {job.employment_type}
                          </p>
                          <p>
                            <strong>Experience:</strong>{" "}
                            {job.experience_level}
                          </p>
                          <p>
                            <strong>Salary:</strong> {job.salary_range}
                          </p>
                          <p>
                            <strong>Skills:</strong>{" "}
                            {(job.skills_required || []).join(", ")}
                          </p>

                          <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                              type="primary"
                              block
                              onClick={() =>
                                navigate(`/job/${job.id}`, { state: { job } })
                              }
                            >
                              View Details
                            </Button>
                            <Button
                              type="default"
                              block
                              onClick={() => handleApply(job)}
                            >
                              Apply
                            </Button>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <Empty description="No current openings found." />
                    )}
                  </div>
                </>
              ),
            },
            {
              key: "2",
              label: (
                <span>
                  <FileDoneOutlined /> Applied Jobs
                </span>
              ),
              children: (
                <div className="card-container">
                  {appliedJobs.length > 0 ? (
                    appliedJobs.map((job) => (
                      <Card
                        key={job.id}
                        title={job.title}
                        className="job-card applied"
                        hoverable
                      >
                        <p>
                          <strong>Company:</strong> {job.company_name}
                        </p>
                        <p>
                          <strong>Location:</strong> {job.location}
                        </p>
                        <p>
                          <strong>Type:</strong> {job.employment_type}
                        </p>
                        <p>
                          <strong>Experience:</strong>{" "}
                          {job.experience_level}
                        </p>
                        <p>
                          <strong>Salary:</strong> {job.salary_range}
                        </p>
                        <p>
                          <strong>Skills:</strong>{" "}
                          {(job.skills_required || []).join(", ")}
                        </p>
                        <p className="applied-status">✅ Applied Successfully</p>
                      </Card>
                    ))
                  ) : (
                    <Empty description="You haven't applied to any jobs yet." />
                  )}
                </div>
              ),
            },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default JobSeekerDashboard;

