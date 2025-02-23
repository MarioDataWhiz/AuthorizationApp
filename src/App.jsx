import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import EmployeeManagement from './pages/EmployeeManagement';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import './App.css';

const App = () => {
    const currentYear = new Date().getFullYear();

    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employee-management" element={<EmployeeManagement />} />
                    </Routes>
                    <Footer year={currentYear} />
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
