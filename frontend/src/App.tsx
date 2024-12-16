import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Countries from "./pages/Countries/Countries.tsx";
import Layout from "./Layout.tsx";

function App() {

  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/about" element={<div>About Page</div>} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
