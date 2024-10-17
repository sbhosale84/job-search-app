import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./joblist.css";

function JobList({ searchTerm }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((error) => console.error(error));
  }, []);
 

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);


  const goToDetails = (id) => {
    navigate(`/jobDetails/${id}`);
  };

  return (
    <div className="job-list-container">
      <h2>Jobs</h2>
      {filteredJobs.length > 0 ? (
        <ul className="job-list">
          {filteredJobs.map((job) => (
            <li key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <h4>{job.companyInfo.name}</h4>
                <p>{job.description}</p>
              </div>
              <div className="job-actions">
                <button onClick={() => goToDetails(job.id)}>
                  View Details
                </button>
                <button className="apply-button">Apply</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}

export default JobList;
