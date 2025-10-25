import { Button } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import BrowseJobs from './components/Browsejobs/browse_jobs'
import JobSeekerDashboard from './pages/Dashboards/jobseeker'
import EmployerDashboard from './pages/Dashboards/Employee'
import JobDetails from './pages/Dashboards/job_details'

import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App
