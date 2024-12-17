import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Countries from "./pages/Countries/Countries.tsx";
import Layout from "./Layout.tsx";
import WorldMap from "./pages/WorldMap/WorldMap.tsx";

function App() {

  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/worldmap" element={<WorldMap />} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
