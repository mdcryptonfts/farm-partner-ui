import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Body, MainWrapper } from "./Styles";
import { useStateContext } from "./contexts/ContextProvider";
import { Footer } from "./components";
import { sessionKit } from "./data/wharfkit";
import { GlobalStyle } from "./Styles";
import Navbar2024 from "./components/Navbar2024";
import RedirectDiscord from "./components/Discord";

const FarmPage = lazy(() => import("./pages/FarmPage"));
const Farms = lazy(() => import("./pages/Farms"));
const LandingPage = lazy(() => import("./pages/Landing"));
const LoadingPage = lazy(() => import("./pages/Loading"));
const ManageFarmPage = lazy(() => import("./pages/ManageFarmPage"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  const { setWharfSession, setIsLoggedIn } = useStateContext();

  let session;

  async function restoreSession() {
    session = await sessionKit.restore();
    setWharfSession(session);
  }

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <MainWrapper>
          <div className={`min-h-screen w-full flex-2`}>
            <Navbar2024 />
            <Body>
              <div>
                <Suspense fallback={<LoadingPage />}>
                  <Routes>
                    {/* Home */}

                    <Route path="/" element={<LandingPage />} />
                    <Route path="/farms" element={<Farms />} />
                    <Route path="/farms/:FarmName" element={<FarmPage />} />
                    <Route path="/manage-farm/:FarmName" element={<ManageFarmPage />} />

                    <Route path="/discord" element={<RedirectDiscord />} />

                    {/* 404 NOT FOUND CATCHALL */}

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </Body>
            <Footer />
          </div>
        </MainWrapper>
      </BrowserRouter>
    </div>
  );
};

export default App;
