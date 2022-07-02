import { Route, Routes } from 'react-router';
import './App.css';
import Barcode from './components/barcode';
import Departments from './components/departments';
import Loader from './components/loader';

function App() {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Loader/>} />
        <Route path="/departments" element={<Departments/>} />
        <Route path="/barcode/:url" element={<Barcode/>} />
        {/* <Loader/> */}
        {/* <Departments/> */}
        {/* <Barcode/> */}
      </Routes>
    </div>
  );
}

export default App;
