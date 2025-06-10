
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme/theme";
import { useState } from "react";
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import { Route, Routes } from "react-router-dom";
import Team from "./pages/Team";
import Contacts from "./pages/Contacts";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Toaster } from "sonner";
import Category from "./pages/ProductManagement/Categories/Category";
import Product from "./pages/ProductManagement/Products/Product";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster richColors position="bottom-right" />
        <div className="flex relative justify-center">
          {/* <TodoBoard /> */}
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/team" element={<Team />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path='/products/productCategory'element={<Category/>}/>
              <Route path="/products" element ={<Product/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
