import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./SurveyDetails.css";

function SurveyDetails() {
  const params = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/survey/get/" + params.id, {
        withCredentials: true,
      })
      .then((res) => {
        setSurvey(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  function onQuestionDeleteHandler(surveyId, questionId) {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete(
        `http://localhost:3001/api/survey/${surveyId}/question/${questionId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setSurvey((prevSurvey) => {
          return {
            ...prevSurvey,
            questions: prevSurvey.questions.filter(
              (question) => question.id !== questionId
            ),
          };
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onQuestionEditToggleHandler(index) {
    setSurvey((prevSurvey) => {
      return {
        ...prevSurvey,
        questions: prevSurvey.questions.map((question, qIndex) => {
          if (qIndex === index) {
            return {
              ...question,
              isEditing: !question.isEditing,
            };
          }
          return question;
        }),
      };
    });
  }

  function onQuestionChangeHandler(index, e) {
    setSurvey((prevSurvey) => {
      return {
        ...prevSurvey,
        questions: prevSurvey.questions.map((question, qIndex) => {
          if (qIndex === index) {
            return {
              ...question,
              question: e.target.value,
            };
          }
          return question;
        }),
      };
    });
  }

  function onQuestionEditHandler(index) {
    axios
      .put(
        `http://localhost:3001/api/survey/${survey.id}/question/${survey.questions[index].id}`,
        { newQuestion: survey.questions[index].question },
        { withCredentials: true }
      )
      .then((res) => {
        onQuestionEditToggleHandler(index);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSurveyEditHandler() {
    axios
      .put(
        `http://localhost:3001/api/survey/${survey.id}`,
        {
          name: survey.name,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  function onSurveyNameChangeHandler(e) {
    setSurvey((prevSurvey) => {
      return {
        ...prevSurvey,
        name: e.target.value,
      };
    });
  }

  function onSurveyDeleteHandler(surveyId) {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete(`http://localhost:3001/api/survey/${surveyId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleShowQuestions() {
    setSurvey((prevSurvey) => {
      return {
        ...prevSurvey,
        showQuestions: !prevSurvey.showQuestions,
      };
    });
  }

  if (!survey) return null;

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={survey.name}
          onInput={onSurveyNameChangeHandler}
        />
      </div>
      <small>{new Date(survey.createdAt).toLocaleString()}</small>
      <p onClick={toggleShowQuestions} className="cursor-pointer">
        Questions {survey.showQuestions ? "▲" : "▼"}
      </p>
      <ul>
        {!survey.showQuestions &&
          survey.questions.map((question, qIndex) => {
            return (
              <li key={qIndex}>
                {question.isEditing ? (
                  <input
                    type="text"
                    value={question.question}
                    onInput={(e) => {
                      onQuestionChangeHandler(qIndex, e);
                    }}
                  />
                ) : (
                  <p>{question.question}</p>
                )}
                <div className="question-buttons">
                  {question.isEditing ? (
                    <button
                      className="btn btn-small"
                      onClick={() => onQuestionEditHandler(qIndex)}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      className="btn btn-small"
                      onClick={() => onQuestionEditToggleHandler(qIndex)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-small btn-delete"
                    onClick={() =>
                      onQuestionDeleteHandler(survey.id, question.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      {survey.submissions.length > 0 && (
        <div className="submissions">
          <h3>Submissions</h3>
          <table className="table">
            <thead>
              <tr>
                {survey.submissions[0].answers.map((answer, aIndex) => {
                  return (
                    <th key={aIndex} title={answer.question}>
                      {answer.question}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {survey.submissions.map((submission, sIndex) => {
                return submission.answers.map((answer, aIndex) => {
                  return (
                    <td key={aIndex} title={answer.answer}>
                      {answer.answer}
                    </td>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <button className="btn" onClick={() => onSurveyEditHandler()}>
          Edit Survey
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onSurveyDeleteHandler(survey.id)}
        >
          Delete Survey
        </button>
      </div>
    </div>
  );
}

export default SurveyDetails;
