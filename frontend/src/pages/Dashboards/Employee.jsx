import React, { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Avatar,
  Dropdown,
  message,
  ConfigProvider,
  Form,
  Input,
  List,
} from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedJobId, setSelectedJobId] = useState(null);

  const token = localStorage.getItem("token");

  // Redirect if token not found
  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/jobs/employer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch jobs");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const getApplicantsForJob = (jobId) =>
    applications.filter((app) => app.job_id === jobId);

  const handleCreateJob = async (values) => {
    try {
      await axios.post("http://localhost:5000/jobs", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success(`Job "${values.title}" created successfully!`);
      setActiveTab("1");
      fetchJobs();
    } catch (err) {
      console.error(err);
      message.error("Failed to create job");
    }
  };

  const handleViewApplicants = (jobId) => {
    setSelectedJobId(jobId);
    setActiveTab("2");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate("/signin");
  };

  const profileMenuItems = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { type: "divider" },
    { key: "logout", label: "Logout", danger: true, onClick: handleLogout },
  ];

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#4f46e5", borderRadius: 14 } }}
    >
      <div style={{ padding: "40px 60px", background: "#f9fafc", minHeight: "100vh" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            padding: "16px 32px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3} style={{ margin: 0, color: "#1a1a1a" }}>
            Employer Dashboard
          </Title>
          <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" arrow>
            <Avatar
              size={48}
              icon={<UserOutlined style={{ color: "white" }} />}
              style={{
                cursor: "pointer",
                border: "2px solid #fff",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 0 12px rgba(124, 58, 237, 0.5)",
              }}
            />

          </Dropdown>
        </header>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="line"
          centered
          items={[
            // 1️⃣ Jobs Posted
            {
              key: "1",
              label: "Jobs Posted",
              children: (
                <Row gutter={[24, 24]} justify="center">
                  {jobs.length ? (
                    jobs.map((job) => (
                      <Col key={job.id} xs={24} sm={12} md={8}>
                        <Card
                          hoverable
                          title={job.title}
                          className="job-card"
                          extra={
                            <Button
                              type="text"
                              icon={<EyeOutlined />}
                              onClick={() => handleViewApplicants(job.id)}
                            />
                          }
                          style={{
                            borderRadius: 14,
                            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Space direction="vertical" size="small">
                            <Text>
                              <UserOutlined /> {job.company_name}
                            </Text>
                            <Text>
                              <EnvironmentOutlined /> {job.location}
                            </Text>
                            <Text type="secondary">
                              {job.description?.length > 80
                                ? job.description.slice(0, 80) + "..."
                                : job.description || "No description provided."}
                            </Text>
                            <Text>
                              <CalendarOutlined />{" "}
                              {new Date(job.created_at).toLocaleDateString()}
                            </Text>
                            <Text>
                              <TeamOutlined /> Applicants:{" "}
                              {getApplicantsForJob(job.id).length}
                            </Text>
                            <Tag color="blue">Full-time</Tag>
                          </Space>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Text>No jobs posted yet.</Text>
                  )}
                </Row>
              ),
            },

            // 2️⃣ Job Applicants
            {
              key: "2",
              label: "Job Applicants",
              children: (() => {
                if (!selectedJobId)
                  return (
                    <Card
                      style={{
                        textAlign: "center",
                        padding: "40px 0",
                        borderRadius: 12,
                      }}
                    >
                      <Title level={5}>Select a job to view applicants</Title>
                      <Text type="secondary">
                        Click the 👁️ icon on a job card in “Jobs Posted”.
                      </Text>
                    </Card>
                  );

                const selectedJob = jobs.find((j) => j.id === selectedJobId);
                const jobApplicants = getApplicantsForJob(selectedJobId);

                return (
                  <div style={{ padding: "20px 40px" }}>
                    <Title level={4} style={{ marginBottom: 16 }}>
                      Applicants for:{" "}
                      <span style={{ color: "#4f46e5" }}>
                        {selectedJob ? selectedJob.title : "Selected Job"}
                      </span>
                    </Title>

                    {jobApplicants.length > 0 ? (
                      <List
                        itemLayout="horizontal"
                        bordered
                        dataSource={jobApplicants}
                        renderItem={(app) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar icon={<UserOutlined />} />}
                              title={<Text strong>{app.name}</Text>}
                              description={
                                <>
                                  <Text>Email: {app.email || "N/A"}</Text>
                                  <br />
                                  <Text type="secondary">
                                    Job ID: {app.job_id}
                                  </Text>
                                </>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Card
                        style={{
                          textAlign: "center",
                          padding: "40px 0",
                          borderRadius: 12,
                        }}
                      >
                        <Title level={5}>
                          No applicants yet for {selectedJob?.title}.
                        </Title>
                        <Text type="secondary">
                          Applicants will appear here once they apply.
                        </Text>
                      </Card>
                    )}
                  </div>
                );
              })(),
            },

            // 3️⃣ Create Job
            {
              key: "3",
              label: "Create Job",
              children: (
                <Card style={{ borderRadius: 14 }}>
                  <Form layout="vertical" onFinish={handleCreateJob}>
                    <Form.Item
                      name="title"
                      label="Job Title"
                      rules={[
                        { required: true, message: "Please enter job title" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="company_name"
                      label="Company Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter company name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="location"
                      label="Location"
                      rules={[
                        { required: true, message: "Please enter location" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Job Description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter job description",
                        },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                      >
                        Create Job
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};

export default EmployerDashboard;








// import React, { useState, useEffect } from "react";
// import {
//   Tabs,
//   Card,
//   Button,
//   Row,
//   Col,
//   Typography,
//   Space,
//   Tag,
//   Avatar,
//   Dropdown,
//   message,
//   ConfigProvider,
//   Form,
//   Input,
//   List,
// } from "antd";
// import {
//   UserOutlined,
//   EnvironmentOutlined,
//   CalendarOutlined,
//   TeamOutlined,
//   PlusOutlined,
//   EyeOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const { Title, Text } = Typography;

// const EmployerDashboard = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [activeTab, setActiveTab] = useState("1");
//   const [selectedJobId, setSelectedJobId] = useState(null);

//   const token = localStorage.getItem("token");

//   // Redirect if token not found
//   useEffect(() => {
//     if (!token) navigate("/signin");
//   }, [token, navigate]);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/jobs/employer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setJobs(res.data);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to fetch jobs");
//     }
//   };

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to fetch applications");
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//     fetchApplications();
//   }, []);

//   const getApplicantsForJob = (jobId) =>
//     applications.filter((app) => app.job_id === jobId);

//   const handleCreateJob = async (values) => {
//     try {
//       await axios.post("http://localhost:5000/jobs", values, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success(`Job "${values.title}" created successfully!`);
//       setActiveTab("1");
//       fetchJobs();
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to create job");
//     }
//   };

//   const handleViewApplicants = (jobId) => {
//     setSelectedJobId(jobId);
//     setActiveTab("2");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     message.success("Logged out successfully!");
//     navigate("/signin");
//   };

//   // Updated Dropdown menu
//   const profileMenuItems = [
//     { key: "profile", label: "Profile" },
//     { key: "settings", label: "Settings" },
//     { type: "divider" },
//     { key: "logout", label: "Logout", danger: true, onClick: handleLogout },
//   ];

//   return (
//     <ConfigProvider
//       theme={{ token: { colorPrimary: "#4f46e5", borderRadius: 14 } }}
//     >
//       <div style={{ padding: 20 }}>
//         <header
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 20,
//           }}
//         >
//           <Title level={3}>Employer Dashboard</Title>
//           <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" arrow>
//             <Avatar size={48} icon={<UserOutlined />} />
//           </Dropdown>
//         </header>

//         {/* Updated Tabs with items prop */}
//         <Tabs
//           activeKey={activeTab}
//           onChange={setActiveTab}
//           type="line"
//           centered={false}
//           items={[
//             {
//               key: "1",
//               label: "Jobs Posted",
//               children: (
//                 <Row gutter={[24, 24]}>
//                   {/* {jobs.length ? (
//                     jobs.map((job) => (
//                       <Col key={job.id} xs={24} sm={12} md={8}>
//                         <Card
//                           hoverable
//                           title={job.title}
//                           extra={
//                             <Button
//                               type="text"
//                               icon={<EyeOutlined />}
//                               onClick={() => handleViewApplicants(job.id)}
//                             />
//                           }
//                         >
//                           <Space direction="vertical" size="small">
//                             <Text>
//                               <UserOutlined /> {job.company_name}
//                             </Text>
//                             <Text>
//                               <EnvironmentOutlined /> {job.location}
//                             </Text>
//                             <Text>
//                               <CalendarOutlined />{" "}
//                               {new Date(job.created_at).toLocaleDateString()}
//                             </Text>
//                             <Text>
//                               <TeamOutlined /> Applicants:{" "}
//                               {getApplicantsForJob(job.id).length}
//                             </Text>
//                             <Tag color="blue">Full-time</Tag>
//                           </Space>
//                         </Card>
//                       </Col>
//                     ))
//                   ) : (
//                     <Text>No jobs posted yet</Text>
//                   )} */}

//                   {/* backend */}
//                   {jobs.length ? (
//                     jobs.map((job) => (
//                       <Col key={job.id} xs={24} sm={12} md={8}>
//                         <Card
//                           hoverable
//                           title={job.title}
//                           extra={
//                             <Button
//                               type="text"
//                               icon={<EyeOutlined />}
//                               onClick={() => handleViewApplicants(job.id)}
//                             />
//                           }
//                         >
//                           <Space direction="vertical" size="small">
//                             <Text>
//                               <UserOutlined /> {job.company_name}
//                             </Text>
//                             <Text>
//                               <EnvironmentOutlined /> {job.location}
//                             </Text>
//                             <Text type="secondary">
//                               {job.description?.length > 80
//                                 ? job.description.slice(0, 80) + "..."
//                                 : job.description || "No description provided."}
//                             </Text>
//                             <Text>
//                               <CalendarOutlined />{" "}
//                               {new Date(job.created_at).toLocaleDateString()}
//                             </Text>
//                             <Text>
//                               <TeamOutlined /> Applicants: {getApplicantsForJob(job.id).length}
//                             </Text>
//                             <Tag color="blue">Full-time</Tag>
//                           </Space>
//                         </Card>
//                       </Col>
//                     ))
//                   ) : (
//                     <Text>No jobs posted yet</Text>
//                   )}

//                 </Row>
//               ),
//             },
//             {
//               key: "2",
//               label: "Job Applicants",
//               children: selectedJobId ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={getApplicantsForJob(selectedJobId)}
//                   renderItem={(app) => (
//                     <List.Item>
//                       <List.Item.Meta
//                         avatar={<Avatar icon={<UserOutlined />} />}
//                         title={app.name}
//                         description={`Applied for Job ID: ${app.job_id}`}
//                       />
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <Text>Select a job to view applicants</Text>
//               ),
//             },
//             {
//               key: "3",
//               label: "Create Job",
//               children: (
//                 <Card>
//                   <Form layout="vertical" onFinish={handleCreateJob}>
//                     <Form.Item
//                       name="title"
//                       label="Job Title"
//                       rules={[{ required: true, message: "Please enter job title" }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Form.Item
//                       name="company_name"
//                       label="Company Name"
//                       rules={[{ required: true, message: "Please enter company name" }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Form.Item
//                       name="location"
//                       label="Location"
//                       rules={[{ required: true, message: "Please enter location" }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Form.Item
//                       name="description"
//                       label="Job Description"
//                       rules={[{ required: true, message: "Please enter job description" }]}
//                     >
//                       <Input.TextArea rows={4} />
//                     </Form.Item>
//                     <Form.Item>
//                       <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
//                         Create Job
//                       </Button>
//                     </Form.Item>
//                   </Form>
//                 </Card>
//               ),
//             },
//           ]}
//         />
//       </div>
//     </ConfigProvider>
//   );
// };

// export default EmployerDashboard;
