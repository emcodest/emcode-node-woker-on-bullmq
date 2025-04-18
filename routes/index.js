const express = require('express');
const router = express.Router();
const lib = require("../lib/Res")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Emcode Node Worker Bullmq Processor', result: false, value: false });
});
// add job
router.post('/add-job', async (req, res, next) => {
  const { job_name, body_json } = req.body
  let mres = {}
  if (!job_name) {
    mres = lib.Error("Job name is required")
  } else if (!body_json) {
    mres = lib.Error("body_json is required")
  } else {
    try {
      const job = JSON.parse(body_json)
      mres = lib.Success("Job added", job)
    } catch (ex) {
      mres = lib.Error(`error occured: ${ex}`)
    }

  }

  res.render('index', { title: 'Emcode Node Worker Bullmq Processor', ...mres })

});

module.exports = router;
