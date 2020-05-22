const Dashboard = require("../models/Dashboard");

const dashboard = {
  insertDashboard: (req, res, next) => {
    const newDashboard = new Dashboard({
      dashboardColumnListInit: req.body.dashboardColumnListInit,
      dashboardColumnListShow: req.body.dashboardColumnListShow,
      dashboardPagination: req.body.dashboardPagination,
    });
    Dashboard.insertMany(newDashboard, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json("Enregistrement effectué");
  },
  findDashboard: (req, res) => {
    Dashboard.find({}, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  updateDashboard: (req, res) => {
    const dashboardPagination = req.body.dashboardPagination;
    const dashboardColumnListShow = req.body.dashboardColumnListShow;
    console.log(dashboardPagination);
    Dashboard.updateOne({ dashboardPagination: dashboardPagination }, (err) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    Dashboard.updateOne(
      { dashboardColumnListShow: dashboardColumnListShow },
      (err) => {
        if (err) {
          res.status(500).json({});
          return;
        }
      }
    );
    res.json({ message: "Données enregistrées" });
  },
};
module.exports = dashboard;
