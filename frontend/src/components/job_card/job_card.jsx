import React from "react";
import { Card, Tag, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./jobCard.css";

const { Title, Paragraph, Text } = Typography;

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  if (!job) return null;

  const handleApply = () => {
    navigate("/signin");
  };

  return (
    <Card hoverable className="job-card">
      <Title level={4} className="job-card-title">
        {job.title}
      </Title>
      <Text className="job-card-company">{job.company}</Text>

      <Paragraph className="job-card-description">
        {job.description.length > 120
          ? job.description.slice(0, 120) + "..."
          : job.description}
      </Paragraph>

      <div className="job-card-tags">
        {job.tags?.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>

      <div className="job-card-footer">
        <div>
          <Text className="job-card-location">{job.location}</Text>
          {job.type && (
            <Tag style={{ marginLeft: 8 }} color="green">
              {job.type}
            </Tag>
          )}
        </div>
        <Button
          type="primary"
          shape="round"
          className="job-card-button"
          onClick={handleApply}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;










