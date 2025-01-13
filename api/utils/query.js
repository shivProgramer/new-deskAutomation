 const allDMETeamDetails = `
      SELECT 
        dt.*, 
        dc.CampaignName, 
        e.name AS EmployeeName
      FROM 
        DME_Campaign as dc
      INNER JOIN 
        DME_Team as dt ON dc.CampaignID = dt.CampaignID
      INNER JOIN 
        Employees as e ON dt.EmployeeID = e.desk_employee_id
    `

    module.exports = {allDMETeamDetails}