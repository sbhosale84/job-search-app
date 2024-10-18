import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./joblist.css";

function JobList({ searchTerm }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const loginObj = JSON.parse(loggedInUser);
      console.log(loginObj.role);
      if (loginObj.role === "admin") {
        setIsEdit(true);
      }
    }
  }, [isEdit]);

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
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const goToDetails = (id) => {
    navigate(`/jobDetails/${id}`);
  };

  const handleEdit = (job) => {
    navigate("/createJob", { state: { job } });
  };

  return (
    <div className="job-list-container">
      <h2 className="heading">List of jobs</h2>
      {filteredJobs.length > 0 ? (
        <ul className="job-list">
          {filteredJobs.map((job) => (
            <li key={job.id} className="job-card">
              <div className="job-info">
                <div className="info-edit">
                  <h3>{job?.title}</h3>
                  {isEdit && (
                    <div>
                      <button onClick={() => handleEdit(job)}>Edit</button>
                    </div>
                  )}
                </div>
                <h4>{job?.companyInfo.name}</h4>
                <p>{job?.description && job?.description}</p>
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
