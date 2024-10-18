import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './jobDetails.css'; 

function JobDetails() {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Job not found. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <div className="job-details-container">
      {error ? (
        <p>{error}</p>
      ) : job ? (
        <div>
          <h2>{job.title}</h2>
          <h1>{job.companyInfo.name}</h1>
          <p className="details-item">Description: {job?.description}</p>
          <p className="details-item">Skills: {job?.skills.join(", ")}</p>
          <p className="details-item">Location: {job?.location}</p>
          <p className="details-item">Vacancies: {job?.vacancies}</p>
          <p className="details-item">Pay Range: {job?.payRange}</p>
          <h3>Roles and Responsibilities:</h3>
          <ul>
            {job.rolesResponsibilities.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
          <button className="apply-button">Apply Now</button>
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}

export default JobDetails;
