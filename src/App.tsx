import './App.css'
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/notfound';
import Homepage from './pages/homepage';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
