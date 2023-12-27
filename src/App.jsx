import { HashRouter, Routes, Route } from "react-router-dom"
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";

/** #### GLOBAL COMPONENTS #### */
import AppSidebar from "./scenes/global/Sidebar"

/** #### APP PAGES #### */
import Home from "./scenes/home-dashboard"
import CompoundingInterestApp from "./scenes/compounding-interest"
import AmortizationApp from "./scenes/amortization-table"

export const App = () => {
  const [theme, colorMode] = useMode();

  return  (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AppSidebar /> 
          <main className="content">
          <HashRouter basename="/"> 
          <Routes> 
              <Route path="/" element={<Home/>}/>
              <Route path="/amortization" element={<AmortizationApp />}/>
              <Route path="/compound-interest" element={<CompoundingInterestApp />}/>
            </Routes>
          </HashRouter>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
