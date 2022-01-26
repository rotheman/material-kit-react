import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";


// import Login from "../_pages/loginPage";
// import StudentBoard from "../_pages/StudentDashboard";
// import ExperimentBoard from "../_pages/ExperimentPage";
// import TeacherBoard from "../_pages/TeacherDashboard";
// import SemesterBoard from "../_pages/SemesterPage";
// import TableBoard from "../UserBoards/TableBoard";
// import NotFound from "../_pages/NotFound";
// import UploadPlan from "../_pages/UploadPlanPage";
// import Profile from "../_pages/profilePage";
// import UserBoard from "../UserBoards/UserBoard";
// import UploadBoard from "../_pages/UploadPage";
// import AdminBoard from "../_pages/AdminPage";
import PrivateRoute from "./PrivateRoute";
import { useAppContext } from "src/lib/contextLib";
import Login from "src/pages/login";

function PlanBarRoutes() {
  const { semesterData, holidays } = useAppContext();

  return (
    <Routes>
      {/* <Route exact path={["/", "/home"]} component={Home} /> */}
      <Route path={""} element={<Login />} />
      <Route path={"/"} element={<Login />} />
      <Route path={"/login"} element={<Login />} />
      {/* <Route path="/upload" element={<UploadBoard />} /> */}
      
    </Routes>
  );
}

export default memo(PlanBarRoutes);
