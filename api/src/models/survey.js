const db = require("../db");
const uuid = require("uuid");
const publicIp = require("public-ip");
const sha256 = require("sha256");

module.exports = {
  create: async (survey) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO surveys (uuid, name) VALUES (?, ?)",
        [uuid.v4(), survey.name],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            survey.questions.forEach((question) => {
              db.query(
                "INSERT INTO survey_questions (surveyId, question) VALUES (?, ?)",
                [result.insertId, question],
                function (err, res) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result.insertId);
                  }
                }
              );
            });
          }
        }
      );
    });
  },
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, uuid, name, createdAt, updatedAt FROM surveys",
        async function (err, result) {
          if (err) {
            reject(err);
          } else {
            for (let i = 0; i < result.length; i++) {
              result[0].questions = await getSurveyQuestions(result[i].id);
            }
            resolve(result);
          }
        }
      );
    });
  },
  getById: async (surveyId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, uuid, name, createdAt, updatedAt FROM surveys WHERE id = ?",
        [surveyId],
        async function (err, result) {
          if (err) {
            reject(err);
          } else {
            result[0].questions = await getSurveyQuestions(result[0].id);
            result[0].submissions = await getSurveySubmissions(result[0].id);
            for (let i = 0; i < result[0].submissions.length; i++) {
              result[0].submissions[i].answers = await getSurveyAnswers(
                result[0].submissions[i].id
              );
            }
            resolve(result[0]);
          }
        }
      );
    });
  },
  getByUUID: async (surveyId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, uuid, name, createdAt, updatedAt FROM surveys WHERE uuid = ?",
        [surveyId],
        async function (err, result) {
          if (err) {
            reject(err);
          } else {
            result[0].questions = await getSurveyQuestions(result[0].id);
            resolve(result[0]);
          }
        }
      );
    });
  },
  deleteSurveyQuestion: async (surveyId, questionId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM survey_questions WHERE surveyId = ? AND id = ?",
        [surveyId, questionId],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },
  updateSurveyQuestion: async (surveyId, questionId, newQuestion) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE survey_questions SET question = ? WHERE surveyId = ? AND id = ?",
        [newQuestion, surveyId, questionId],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },
  editSurvey: async (surveyId, newSurveyName) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE surveys SET name = ? WHERE id = ?",
        [newSurveyName, surveyId],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },
  deleteSurvey: async (surveyId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM surveys WHERE id = ?",
        [surveyId],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },
  submitSurveyAnswers: async (surveyId, answers) => {
    const ipv4 = await publicIp.v4();
    const hashedIpv4 = sha256(ipv4);

    const ipExists = await userAlreadyAnsweredSurvey(hashedIpv4, surveyId);

    if (ipExists) return -1;

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO survey_submissions (surveyId, ipv4) VALUES (?, ?)",
        [surveyId, hashedIpv4],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            answers.forEach((answer) => {
              db.query(
                "INSERT INTO survey_answers (surveySubmission, questionId, answer) VALUES (?, ?, ?)",
                [result.insertId, answer.questionId, answer.answer],
                function (err, res) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(true);
                  }
                }
              );
            });
          }
        }
      );
    });
  },
};

async function getSurveyQuestions(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, question FROM survey_questions WHERE surveyId = ?",
      [id],
      function (err, questions) {
        if (err) {
          reject(err);
        } else {
          resolve(questions);
        }
      }
    );
  });
}

async function userAlreadyAnsweredSurvey(hashedIpv4, surveyId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id FROM survey_submissions WHERE ipv4 = ? AND surveyId = ?",
      [hashedIpv4, surveyId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.length > 0);
        }
      }
    );
  });
}

async function getSurveySubmissions(surveyId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id FROM survey_submissions WHERE surveyId = ?",
      [surveyId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

async function getSurveyAnswers(submissionId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT sa.id, sa.questionId, sa.answer, sq.question FROM survey_answers sa LEFT JOIN survey_questions sq ON sq.id = sa.questionId WHERE sa.surveySubmission = ?",
      [submissionId],
      function (err, answers) {
        if (err) {
          reject(err);
        } else {
          resolve(answers);
        }
      }
    );
  });
}
