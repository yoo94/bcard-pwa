import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import BusinessCard from './pages/BusinessCard';
import NotFound from './pages/NotFound';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/businesscard/:id" element={<BusinessCard />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
