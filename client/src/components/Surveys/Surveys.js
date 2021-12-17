import "./Surveys.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Surveys() {
  const [surveys, setSurveys] = useState([]);

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

  return (
    <div>
      <h1>Surveys</h1>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.uuid}`}>{survey.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Surveys;
