import React, { useState, useEffect } from "react";
import { Input, Select, Row, Col, Typography, Empty, Divider } from "antd";
import JobCard from "../job_card/job_card";
import jobsData from "../../pages/data/job_data";
import "./browse_jobs.css";

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");

  useEffect(() => {
    setJobs(jobsData);
    setFilteredJobs(jobsData);
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchText.toLowerCase());
      const matchesLocation = location === "All" || job.location === location;
      const matchesType = type === "All" || job.type === type;
      return matchesSearch && matchesLocation && matchesType;
    });
    setFilteredJobs(filtered);
  }, [searchText, location, type, jobs]);

  const uniqueLocations = ["All", ...new Set(jobsData.map((j) => j.location))];
  const uniqueTypes = ["All", ...new Set(jobsData.map((j) => j.type))];

  return (
    <div className="browse-jobs-container">
      <Title level={2} className="browse-jobs-title">
        Browse Jobs
      </Title>
      <Text className="browse-jobs-subtitle">
        Find your dream job by filtering based on title, company, location, and type
      </Text>

      {/* Filters */}
      <Row gutter={[16, 16]} justify="center" className="filters-row">
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search by job title or company"
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            value={location}
            onChange={setLocation}
            size="large"
            style={{ width: "100%" }}
            placeholder="Select location"
          >
            {uniqueLocations.map((loc) => (
              <Option key={loc} value={loc}>
                {loc}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            value={type}
            onChange={setType}
            size="large"
            style={{ width: "100%" }}
            placeholder="Select type"
          >
            {uniqueTypes.map((t) => (
              <Option key={t} value={t}>
                {t}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider className="jobs-divider" />

      {/* Job list */}
      <Row gutter={[24, 24]} justify="center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col xs={24} sm={12} md={8} key={job.id}>
              <JobCard job={job} />
            </Col>
          ))
        ) : (
          <Col span={24} className="empty-jobs">
            <Empty
              description="No jobs found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BrowseJobs;
