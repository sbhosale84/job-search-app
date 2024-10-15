import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import NavBar from './components/NavBar';
import CreateJob from './components/CreateJob';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <NavBar onSearch={handleSearch} />
      <Routes>
        <Route path='/jobs' element={<JobList searchTerm={searchTerm} />} />
        <Route path='/jobDetails/:id' element={<JobDetails />} />
        <Route path='/createJob' element={<CreateJob />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
