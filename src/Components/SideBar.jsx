import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TeacherSideBar from "./TeacherSideBar";
import StudentSideBar from "../Pages/StudentSideBar";

const SideBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('user')
        toast.info("Logout")
        navigate('/signin')
    }
    let data = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <div className="navbar">
                <div className="logo">
                    {data && data.role === "teacher" ? <Link to="/teacher/dashboard">Teacher Module</Link> : data && data.role === "student" ? <Link to="/student/dashboard">Student Module</Link> : <Link to="/signin">Exam</Link>}
                </div>
                {data ? <div className="logout">
                    <h3 className="userName">Hello {data.name}</h3>
                    <h2 onClick={handleLogout}>Log Out</h2>
                </div> : <div className="menu">
                    <ul>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/signin">Sign in</Link></li>
                    </ul>
                </div>}
            </div>
            <div className="teacher_sidebar">
                {data && data.role === "teacher" ? <TeacherSideBar /> : <StudentSideBar />}
            </div>
            <Outlet />
        </>
    )
};

export default SideBar;
