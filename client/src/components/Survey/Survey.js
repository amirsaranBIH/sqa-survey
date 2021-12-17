import "./Survey.css";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";

function Survey() {
  const params = useParams();
  const [survey, setSurvey] = useState(null);
  const [redirectToSurveys, setRedirectToSurveys] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/survey/getByUUID/" + params.uuid, {
        withCredentials: true,
      })
      .then((res) => {
        setSurvey(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.uuid]);

  function onSubmitHandler(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/survey/submit/" + survey.id, {
        answers: survey.questions.map((question) => {
          return {
            questionId: question.id,
            answer: question.answer,
          };
        }),
      })
      .then((res) => {
        console.log(res);
        setRedirectToSurveys(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onQuestionAnswerHandle(e, index) {
    setSurvey((prevSurvey) => {
      const newQuestions = [...prevSurvey.questions];
      newQuestions[index].answer = e.target.value;
      return {
        ...prevSurvey,
        questions: newQuestions,
      };
    });
  }

  if (!survey) return null;

  if (redirectToSurveys) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>{survey.name}</h1>
      <form onSubmit={onSubmitHandler}>
        {survey.questions.map((question, index) => (
          <div className="form-group" key={index}>
            <label htmlFor="email">{question.question}</label>
            <textarea
              className="form-control"
              onInput={(e) => {
                onQuestionAnswerHandle(e, index);
              }}
            ></textarea>
          </div>
        ))}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Survey;
