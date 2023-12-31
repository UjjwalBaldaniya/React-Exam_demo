import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifiedStudentDataForGiveExam } from "../Services/allApi";
import Loader from "../Components/Loader";

const verifiedStudentTableList = ["No", "Status", "Name", "Email", "Id", "Action"]

const VerifiedStudent = () => {
    const navigate = useNavigate()
    const [verifiedStudentData, setVerifiedStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        verifiedStudentDataForGiveExam()
            .then((res) => {
                setVerifiedStudentData(res.data.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    navigate('/signup')
                }
            })
    }, [navigate])

    const studentView = (id) => {
        navigate(`/teacher/verifiedStudent/${id}`)
    }

    return (
        <>
            <div className="teacher_container">
                {loading ? <Loader /> : (
                    <div className="teacher_mainbar">
                        <div className="studentData_container">
                            <h1 className="title-heading">Verified Students List</h1>
                            <table>
                                <thead>
                                    <tr>
                                        {verifiedStudentTableList.map((element, index) => (
                                            <th key={index}>{element}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {verifiedStudentData.map((element, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{element.status}</td>
                                            <td>{element.name}</td>
                                            <td>{element.email}</td>
                                            <td>{element._id}</td>
                                            <td><button className="table-btn" onClick={() => studentView(element._id)} >View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default VerifiedStudent;
