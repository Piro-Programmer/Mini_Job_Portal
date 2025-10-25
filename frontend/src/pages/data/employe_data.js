export const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Bangalore",
    company_name: "Growth Jockey",
    created_at: "2025-10-01",
    employer_id: 101,
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "Remote",
    company_name: "Growth Jockey",
    created_at: "2025-10-05",
    employer_id: 101,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    location: "Gurugram",
    company_name: "Growth Jockey",
    created_at: "2025-10-10",
    employer_id: 101,
  },
];

// 👥 Applicants for each Job (connected via job_id)
export const initialApplications = [
  // Frontend Developer applicants
  {
    id: 1,
    job_id: 1,
    seeker_name: "Rahul Sharma",
    status: "Pending",
  },
  {
    id: 2,
    job_id: 1,
    seeker_name: "Neha Verma",
    status: "Reviewed",
  },
  {
    id: 3,
    job_id: 1,
    seeker_name: "Aditya Mehta",
    status: "Hired",
  },

  // Backend Engineer applicants
  {
    id: 4,
    job_id: 2,
    seeker_name: "Priya Singh",
    status: "Pending",
  },
  {
    id: 5,
    job_id: 2,
    seeker_name: "Arjun Kumar",
    status: "Reviewed",
  },

  {
    id: 6,
    job_id: 3,
    seeker_name: "Sakshi Patel",
    status: "Pending",
  },
  {
    id: 7,
    job_id: 3,
    seeker_name: "Mohit Raj",
    status: "Hired",
  },
];
