import { Routes, Route } from "react-router";
import Home from "./home/Home";
import HomeLayout from "../components/home-layout/HomeLayout";
import React, { Suspense } from "react";

// Lazy load the About component
const About = React.lazy(() => import("./about/About"));

function ApplicationRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/about"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default ApplicationRoutes;
