const router = require("express").Router();
const surveyModel = require("../models/survey");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/create", isAuthenticated, (req, res) => {
  surveyModel
    .create(req.body)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.delete(
  "/:surveyId/question/:questionId",
  isAuthenticated,
  (req, res) => {
    surveyModel
      .deleteSurveyQuestion(req.params.surveyId, req.params.questionId)
      .then((result) => {
        res.json({ status: "success", data: result });
      })
      .catch((err) => {
        res.status(500).json({ status: "failed", message: err });
      });
  }
);

router.put("/:surveyId/question/:questionId", isAuthenticated, (req, res) => {
  surveyModel
    .updateSurveyQuestion(
      req.params.surveyId,
      req.params.questionId,
      req.body.newQuestion
    )
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.get("/get/:id", isAuthenticated, (req, res) => {
  surveyModel
    .getById(req.params.id)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.put("/:id", isAuthenticated, (req, res) => {
  surveyModel
    .editSurvey(req.params.id, req.body.name)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.delete("/:id", isAuthenticated, (req, res) => {
  surveyModel
    .deleteSurvey(req.params.id)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.get("/getAll", (req, res) => {
  surveyModel
    .getAll()
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.get("/getByUUID/:uuid", (req, res) => {
  surveyModel
    .getByUUID(req.params.uuid)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

router.post("/submit/:id", (req, res) => {
  surveyModel
    .submitSurveyAnswers(req.params.id, req.body.answers)
    .then((result) => {
      res.json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed", message: err });
    });
});

module.exports = router;
