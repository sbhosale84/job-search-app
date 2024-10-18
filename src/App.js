import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/navBar/NavBar';
import React, { Suspense, useContext, useState } from 'react';
import LoginComponent from './components/login/LoginComponent';
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from './assests/AuthContext';
const JobList = React.lazy(() => import("./components/jobList/JobList"));
const JobDetails = React.lazy(() => import("./components/jobDetails/JobDetails"));
const CreateJob = React.lazy(() => import("./components/createJob/CreateJob"));

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar onSearch={handleSearch} />
        <Suspense fallback={<div className='spinner-container'><div className='spinner'></div></div>}>
          <Routes>
            <Route path='/' element={<LoginComponent />} />
            <Route path='/jobs' element={
              <PrivateRoute>
                <JobList searchTerm={searchTerm} />
              </PrivateRoute>
            } />
            <Route path='/jobDetails/:id' element={
              <PrivateRoute>
                <JobDetails />
              </PrivateRoute>
            } />
            <Route path='/createJob' element={
              <PrivateRoute>
                <CreateJob />
              </PrivateRoute>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>


  );
}

export default App;
