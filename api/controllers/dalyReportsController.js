const express = require('express');
const DalyReports = require('../models/DalyReports');

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await DalyReports.findAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const report = await DalyReports.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the report', details: error.message });
  }
};

// Create a new report
const createReport = async (req, res) => {
  try {
    const newReport = await DalyReports.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the report', details: error.message });
  }
};




// Update a report by ID
const updateReport = async (req, res) => {
  try {
    const [updated] = await DalyReports.update(req.body, {
      where: { ID: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Report not found' });
    }
    const updatedReport = await DalyReports.findByPk(req.params.id);
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the report', details: error.message });
  }
};

const deleteReport = async (req, res) => {
    try {
      const deleted = await DalyReports.destroy({
        where: { ID: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the report', details: error.message });
    }
  };

  
module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
