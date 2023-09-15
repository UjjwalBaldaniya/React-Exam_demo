import React, { useState } from "react";
import TeacherSideBar from "../Components/TeacherSideBar";
import '../Styles/createExam.css'
import { createExamPost } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateExamForm from "../Components/CreateExamForm";

const CreateExam = () => {
    const navigate = useNavigate()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [examState, setExamState] = useState({
        subjectName: "",
        notes: "",
    })
    const [questions, setQuestions] = useState(Array.from({ length: 15 }, () => ({
        question: "",
        answer: "",
        options: ["", "", "", ""],
    })));

    const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(15).fill(""));

    const handleExamStateChange = (e) => {
        const { name, value } = e.target
        setExamState({
            ...examState,
            [name]: value
        })
    }

    const handleActiveQuestionChange = (e) => {
        const allQuestions = [...questions];
        allQuestions[activeQuestion].question = e.target.value;
        setQuestions(allQuestions);
    };

    const handleRadioBtnChange = (e) => {
        const updatedRadioBtnQuestions = [...questions];
        updatedRadioBtnQuestions[activeQuestion].answer = e.target.value;
        setQuestions(updatedRadioBtnQuestions);

        //for answer update
        const selectedAnswersField = [...selectRadioBtnAnswer];
        selectedAnswersField[activeQuestion] = e.target.value;
        setSelectRadioBtnAnswer(selectedAnswersField);
    };

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1)
        }
    }

    const handleNext = () => {
        if (activeQuestion < 14) {
            setActiveQuestion(activeQuestion + 1)
        }
    }

    const examFormData = {
        subjectName: examState.subjectName,
        questions: questions,
        notes: [examState.notes]
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createExamPost(examFormData)
            .then((res) => {
                console.log(res);
                if (res.data.statusCode === 500) {
                    toast.error(res.data.message)
                } else {
                    toast.success(res.data.message)
                    navigate('/teacherDeshboard')
                }
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.details.body[0]?.message)
            })
    }

    const examInputList = [
        {
            label: "Subject Name :- ",
            type: "text",
            name: "subjectName",
            placeholder: "enter subject name",
            value: examState.subjectName,
            onChange: handleExamStateChange,
            disabled: activeQuestion !== 0,
        },
        {
            label: "Question :- ",
            type: "text",
            placeholder: "enter your question",
            value: questions[activeQuestion]?.question,
            onChange: handleActiveQuestionChange,
        },
        {
            label: "Answers :- ",
            type: "radio",
            options: questions[activeQuestion]?.options,
            onChange: handleRadioBtnChange,
            answer: questions[activeQuestion]?.answer,
        },
        {
            label: "Answer :- ",
            type: "text",
            placeholder: "answer",
            value: selectRadioBtnAnswer[activeQuestion],
            readOnly: true,
        },
        {
            label: "Notes :- ",
            type: "text",
            name: "notes",
            placeholder: "notes",
            onChange: handleExamStateChange,
            value: examState.notes,
            disabled: activeQuestion !== 0,
        },
    ];

    const buttonList = [
        {
            name: "Previous",
            disabled: activeQuestion === 0,
            onClick: handlePrevious,
        },
        {
            name: "Submit",
            disabled: activeQuestion !== 14,
            onClick: handleSubmit,
        },
        {
            name: "Next",
            disabled: activeQuestion === 14,
            onClick: handleNext,
        },
    ]

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Create Exam</h1>
                    <div className="exam_container">
                        <h3>Question {activeQuestion + 1}</h3>
                        <div>
                            <form>
                                <CreateExamForm examInputList={examInputList} activeQuestion={activeQuestion} questions={questions} setQuestions={setQuestions} />
                            </form>
                        </div>
                        <div>
                            {buttonList.map((element, index) => (
                                <button key={index} {...element}>{element.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;