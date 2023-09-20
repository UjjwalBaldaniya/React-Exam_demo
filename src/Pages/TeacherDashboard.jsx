import React, { useEffect, useState } from "react";
import '../Styles/teacherDeshboard.css'
import TeacherSideBar from "../Components/TeacherSideBar";
import { deleteExamApi, viewExam } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const viewExmaTableList = [
    {
        name: "No"
    },
    {
        name: "Subject Name"
    },
    {
        name: "Notes"
    },
    {
        name: "Email id"
    },
    {
        name: "Actions"
    },
]

const TeacherDashboard = () => {
    const navigate = useNavigate()
    const [viewExamData, setViewExamData] = useState([]);

    useEffect(() => {
        viewExam()
            .then((res) => {
                console.log(res.data.data)
                setViewExamData(res.data.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    const deleteExam = (id) => {
        console.log(id);
        deleteExamApi(id)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteExam(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const editExam = (id, subjectName, notes) => {
        console.log(id, subjectName, notes);
        navigate(`/createExam`, { state: { subjectName: subjectName, notes: notes, id: id, toggle: false } })
    }

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Teacher Dashboard</h1>
                    <table>
                        <thead>
                            <tr>
                                {viewExmaTableList.map((element, index) => (
                                    <th key={index}>{element.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {viewExamData.map((element, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.subjectName}</td>
                                    <td>{element.notes}</td>
                                    <td>{element.email}</td>
                                    <td><button onClick={() => editExam(element._id, element.subjectName, element.notes)}>Edit Exam</button> <button onClick={() => confirmDelete(element._id)}>Delete Exam</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default TeacherDashboard;