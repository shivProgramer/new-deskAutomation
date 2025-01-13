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
    `;

const allEmployeeOffDaysDetails = `
        SELECT 
          ef.*, 
          e.name AS employee_name
        FROM 
          Employee_Offdays AS ef
        INNER JOIN 
          Employees AS e 
        ON 
          ef.desk_employee_id = e.desk_employee_id;
      `;

module.exports = { allDMETeamDetails, allEmployeeOffDaysDetails };
