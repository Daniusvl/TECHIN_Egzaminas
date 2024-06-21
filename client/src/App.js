import { useCallback, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { AuthProvider } from "./shared/hooks/useAuth";

import "./css/styles.css";
import { PrivateRoute } from "./shared/components/PrivateRoute";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <AuthProvider>
                <div className="main">

                    <BrowserRouter>
                          <div>
                        <header>
                            header
                         </header>
                          </div>        

                            <main className="main-content">

                                <Routes>
                                    <Route path="/" element={
                                      <PrivateRoute roles={["USER", "ADMIN"]}>
                                        <HomePage />
                                      </PrivateRoute>
                                    }/>
                                    <Route path="/login" element={
                                      <LoginPage />
                                    }/>
                                    <Route path="/register" element={
                                      <RegisterPage />
                                    }/>
                                    <Route path="/dashboard" element={
                                      <></>
                                    }/>
                                    <Route path="/admin-dashboard" element={
                                      <></>
                                    }/>
                                </Routes>
                                </main>

                          <div>
                        <footer>
                            footer
                        </footer>
                          </div>  
                    </BrowserRouter>

                </div>
            </AuthProvider>
  );
}

export default App;
