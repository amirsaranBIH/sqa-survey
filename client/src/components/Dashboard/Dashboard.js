import { useRef, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {
  const nameInputRef = useRef("");

  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [createdSurveyId, setCreatedSurveyId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/survey/getAll", { withCredentials: true })
      .then((res) => {
        setSurveys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addQuestionHandler() {
    setQuestions((prevQuestions) => [...prevQuestions, questionText]);
    setQuestionText("");
  }

  function questionTextInputHandler(e) {
    setQuestionText(e.target.value);
  }

  function onQuestionDeleteHandler(index) {
    if (!window.confirm("Are you sure?")) return;
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question, qIndex) => qIndex !== index)
    );
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (!nameInputRef.current.value) {
      alert("Please enter a name for the survey");
      return;
    }

    if (questions.length < 1) {
      alert("Please add at least one question");
      return;
    }

    axios
      .post(
        "http://localhost:3001/api/survey/create",
        {
          name: nameInputRef.current.value,
          questions: questions,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setCreatedSurveyId(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (createdSurveyId) {
    return <Navigate to={`/admin/survey/details/${createdSurveyId}`} />;
  }

  return (
    <div>
      <div className="survey-list">
        <h2>Survey List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => {
              return (
                <tr key={index}>
                  <td>{survey.name}</td>
                  <td>{new Date(survey.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/survey/details/${survey.id}`}>
                      <button className="btn btn-small">More</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="create-survey">
        <h2>Create New Survey</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              ref={nameInputRef}
            />
          </div>
          <div className="questions">
            <h4>New Survey Questions</h4>
            <div className="question-list">
              {questions.map((question, index) => (
                <div className="question" key={index}>
                  <div className="question-text">
                    <p>{question}</p>
                  </div>
                  <div className="question-actions">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        onQuestionDeleteHandler(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label htmlFor="name">Question text</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={questionText}
                onInput={questionTextInputHandler}
              />
            </div>
            <button
              type="button"
              className="btn btn-small"
              onClick={addQuestionHandler}
            >
              Add Question
            </button>
          </div>
          <button type="submit" className="btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
