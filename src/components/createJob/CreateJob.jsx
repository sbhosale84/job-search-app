import React, { useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import "./createJob.css";
function CreateJob() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { job } = state || {};

  const [formData, setFormData] = useState({
    title: job?.title || "",
    skills: job?.skills.join(", ") || "",
    vacancies: job?.vacancies || "",
    payRange: job?.payRange || "",
    location: job?.location || "",
    description: job?.description || "",
    rolesResponsibilities: job?.rolesResponsibilities.join(", ") || "",
    companyName: job?.companyInfo.name || "",
    companyWebsite: job?.companyInfo.website || "",
    companyDescription: job?.companyInfo.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      title: formData.title,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      vacancies: parseInt(formData.vacancies, 10),
      payRange: formData.payRange,
      location: formData.location,
      description: formData.description,
      rolesResponsibilities: formData.rolesResponsibilities
        .split(",")
        .map((role) => role.trim()),
      companyInfo: {
        name: formData.companyName,
        website: formData.companyWebsite,
        description: formData.companyDescription,
      },
    };
    if (job) {
      fetch(`http://localhost:4000/jobs/${job.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      })
        .then((response) => {
          if (response.ok) {
            alert("Job successfully updated!");
            navigate("/jobs");
          } else {
            alert("Failed to update job.");
          }
        })
        .catch((error) => {
          console.error("Error updating job:", error);
          alert("An error occurred while updating the job.");
        });
    } else {
      fetch("http://localhost:4000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      })
        .then((response) => {
          if (response.ok) {
            alert("Job successfully created!");
            navigate("/jobs");
          } else {
            alert("Failed to create job.");
          }
        })
        .catch((error) => {
          console.error("Error creating job:", error);
          alert("An error occurred while creating the job.");
        });
    }
  };

  return (
    <div className="create-job-container">
      <h2>{job ? "Edit Job" : "Create Job"}</h2>
      <form onSubmit={handleSubmit} className="create-job-form">
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Skills (comma separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vacancies:</label>
          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pay Range:</label>
          <input
            type="text"
            name="payRange"
            value={formData.payRange}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Roles & Responsibilities (comma separated):</label>
          <textarea
            name="rolesResponsibilities"
            value={formData.rolesResponsibilities}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Company Info</h3>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Website:</label>
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Description:</label>
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{job ? "Update job" : "Create Job"}</button>
      </form>
    </div>
  );
}

export default CreateJob;
