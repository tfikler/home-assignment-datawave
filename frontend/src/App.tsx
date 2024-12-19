//styles
import './App.css'

//react
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
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
                  <Route path="/" element={<Countries />} />
              </Routes>
          </Layout>
      </BrowserRouter>
  )
}

export default App
