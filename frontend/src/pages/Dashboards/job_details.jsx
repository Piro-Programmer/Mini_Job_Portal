import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Tag, message } from "antd";

const JobDetails = () => {
  const { state } = useLocation();
  const job = state?.job;
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);

  // Load saved applications
  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (job && appliedJobs.some((j) => j.id === job.id)) {
      setApplied(true);
    }
  }, [job]);

  if (!job) {
    return <p style={{ textAlign: "center", marginTop: 40 }}>Job not found.</p>;
  }

  const handleApply = () => {
    if (applied) return;
    message.success(`You have applied for "${job.title}" successfully!`);
    setApplied(true);

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    appliedJobs.push(job);
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
  };

  return (
    <div style={{ padding: "40px", maxWidth: 800, margin: "0 auto" }}>
      <Card
        title={job.title}
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: 24,
        }}
      >
        <p><strong>Company:</strong> {job.company_name}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Employment Type:</strong> {job.employment_type}</p>
        <p><strong>Experience:</strong> {job.experience_level}</p>
        <p><strong>Salary Range:</strong> {job.salary_range}</p>

        <h3>About the Company</h3>
        <p>{job.company_description || "No description available."}</p>

        <h3>Job Description</h3>
        <p>{job.description || "Detailed job responsibilities are mentioned here."}</p>

        <h3>Required Skills</h3>
        {(job.skills_required || []).map((skill, i) => (
          <Tag key={i} color="blue">{skill}</Tag>
        ))}

        <div style={{ marginTop: 20 }}>
          <Button
            type="primary"
            size="large"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Applied Successfully" : "Apply Now"}
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JobDetails;
