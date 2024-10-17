import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar';
import React, { Suspense, useState } from 'react';

const JobList = React.lazy(() => import("./components/JobList"));
const JobDetails = React.lazy(() => import("./components/JobDetails"));
const CreateJob = React.lazy(() => import("./components/CreateJob"));

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <NavBar onSearch={handleSearch} />
      <Suspense fallback={<div className='spinner-container'><div className='spinner'></div></div>}>
        <Routes>
          <Route path='/jobs' element={<JobList searchTerm={searchTerm} />} />
          <Route path='/jobDetails/:id' element={<JobDetails />} />
          <Route path='/createJob' element={<CreateJob />} />
        </Routes>
      </Suspense>
    </BrowserRouter>

  );
}

export default App;
