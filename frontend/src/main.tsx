import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './Navigation.tsx';
import Dashboard from './Dashboard.tsx';
import Login from "./Login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider>
      <BrowserRouter>
          <Navigation />
          <Routes>
              <Route path="/" element={
                      <App />
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
      </BrowserRouter>
  </Provider>
</StrictMode>,
)