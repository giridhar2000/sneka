import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Table from './Components/Table/Table';
import MonthlyTable from './Components/MonthlyTable/MonthlyTable';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/emps' element={<Table />} />
          <Route path='/month' element={<MonthlyTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
