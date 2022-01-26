import React, { memo, useState, useEffect } from "react";

import { Avatar, Badge, IconButton, Tooltip } from "@material-ui/core";
import {
  Assignment,
  Home,
  Logout,
  Notifications,
  Science,
  UploadFile,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserCircle } from "../icons/user-circle";
import { useAppContext } from "../lib/contextLib";
import authService from "../_services/auth.service";

function PlanBarNavbar() {
  const { currentUser, setCurrentUser } = useAppContext();
  const { isTimeout } = useAppContext();
  //once authenticated, this enables page views for the authenticated user
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  //   const [isAuthenticated, userHasAuthenticated] = useAppContext();

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showTeacherBoard, setShowTeacherBoard] = useState(false);
  const [showStudentBoard, setShowStudentBoard] = useState(undefined);
  const [showExperimentBoard, setShowExperimentBoard] = useState(false);
  const [showTableBoard, setShowTableBoard] = useState(false);
  const [showUploadBoard, setShowUploadBoard] = useState(false);
  const [showPlanUploadBoard, setShowPlanUploadBoard] = useState(false);
  const [showSemesterBoard, setShowSemesterBoard] = useState(false);

  //define views
  useEffect(() => {
    if (isAuthenticated) {
      setShowTeacherBoard(currentUser.roles.includes("Teacher"));
      setShowStudentBoard(currentUser.roles.includes("Student"));
      setShowAdminBoard(currentUser.roles.includes("Admin"));
      setShowExperimentBoard(currentUser !== undefined);
      setShowTableBoard(
        currentUser.roles.includes("Student") ||
          currentUser.roles.includes("Teacher")
      );
      setShowUploadBoard(currentUser.roles.includes("Teacher"));
      setShowPlanUploadBoard(
        currentUser.roles.includes("Student") ||
          currentUser.roles.includes("Teacher")
      );
      setShowSemesterBoard(
        currentUser.roles.includes("Student") ||
          currentUser.roles.includes("Teacher")
      );
    }
  }, [isAuthenticated]);

  const logOut = () => {
    //removes user from local storage
    authService.logout();
    setShowTeacherBoard(false);
    setShowStudentBoard(false);
    setShowAdminBoard(false);
    setShowExperimentBoard(false);
    setShowPlanUploadBoard(false);
    setShowUploadBoard(false);
    setShowTableBoard(false);
    setShowSemesterBoard(false);

    userHasAuthenticated(false);
  };
  //isTimeOut is set by the IdleTimer in App.js
  useEffect(() => {
    if (isTimeout) {
      try {
        logOut();
      } catch (err) {
        console.error(err);
      }
    }
  }, [isTimeout]);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      {/* <Link to={"/"} className="navbar-brand">
        planBar
      </Link> */}
      <div className="navbar-nav me-auto">
        {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}
        {showUploadBoard && (
          <li className="nav-item">
            <Link to={"/upload"} className="nav-link">
              Upload
            </Link>
          </li>
        )}
        {showPlanUploadBoard && (
          <li className="nav-item">
            <Link to={"/examPlan"} className="nav-link">
              <Tooltip title={"Upload Prüfungsplan"} arrow>
                <UploadFile />
              </Tooltip>
            </Link>
          </li>
        )}
        {showTeacherBoard && (
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              <Tooltip title={"Dashboard"} arrow>
                <Home />
              </Tooltip>
            </Link>
          </li>
        )}
        {showStudentBoard && (
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              {/* https://mui.com/components/material-icons/ */}
              {/* https://mui.com/components/icons/ */}
              <Tooltip title={"Dashboard"} arrow>
                <Home />
              </Tooltip>
            </Link>
          </li>
        )}
        {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              {/* https://www.npmjs.com/package/material-icons-react for Icons */}
              {/* <MaterialIcon icon="dashbalarm_on" color="#7bb92f" /> */}
              planBar
            </Link>
          </li>
        )}
        {showTableBoard && (
          <li className="nav-item">
            <Link to={"/table"} className="nav-link">
              <Tooltip title={"Übung"} arrow>
                <Assignment />
              </Tooltip>
            </Link>
          </li>
        )}
        {showExperimentBoard && (
          <li className="nav-item">
            <Link to={"/experiment"} className="nav-link">
              <Tooltip title={"ExperimentBoard"} arrow>
                <Science />
              </Tooltip>
            </Link>
          </li>
        )}
        ‚
        {showSemesterBoard && (
          <li className="nav-item">
            <Link to={"/semester"} className="nav-link">
              Semesterplan
            </Link>
          </li>
        )}
        ‚{" "}
        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Admin
            </Link>
          </li>
        )}
        ,
      </div>
      {isAuthenticated ? (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Tooltip title="Notifications">
              <IconButton sx={{ ml: 1 }}>
                <Badge badgeContent={4} color="primary" variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
          </li>
          <li className="nav-item">
            <Link to={"/account"} className="nav-link">
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1,
                }}
                src={`data:image/jpeg;base64,${currentUser.avatar}`}
              >
                <UserCircle fontSize="small" />
              </Avatar>
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              <Tooltip title={"Logout"} arrow>
                <Logout />
              </Tooltip>
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
}

export default memo(PlanBarNavbar);
