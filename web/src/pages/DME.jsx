import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

import DMEBudget from "./DMEBudget";
import DMECampaign from "./DMECampaign";
import DMEPerformance from "./DMEPerformance";
import DMEReward from "./DMEReward";
import DMETeam from "./DMETeam";
import DMEROAS from "./DMEROAS";
import DMEAnalysis from "./DmeAnalysis";

const DME = () => {
  const [activeCard, setActiveCard] = useState("Campaign");

  const handleCardClick = (cardName) => {
    setActiveCard((prev) => (prev === cardName ? null : cardName));
  };

  const cardStyles = (cardName) => {
    return `p-2 rounded-lg shadow-lg transition-all duration-300 transform ease-in-out cursor-pointer flex justify-between items-center ${
      activeCard === cardName
        ? "bg-yellow-50 text-blue-600 border-t-[1px] border-green-500 shadow-xl scale-105"
        : "bg-white border-t-[1px] border-green-500 text-gray-600 hover:bg-gray-100 shadow-md"
    }`;
  };

  return (
    <div className="max-w-2xl md:max-w-5xl xl:max-w-[100rem] mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gray-100 shadow-md py-5 px-6">
        {/* DME_Campaign Card */}
        <div
          className={cardStyles("Campaign")}
          onClick={() => handleCardClick("Campaign")}
        >
          <span className="text-base font-medium ">Campaign</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>
        {/* DME_Budget Card */}
        <div
          className={cardStyles("Budget")}
          onClick={() => handleCardClick("Budget")}
        >
          <span className="text-base font-medium ">Budget</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>

        {/* DME_Performance Card */}
        <div
          className={cardStyles("Performance")}
          onClick={() => handleCardClick("Performance")}
        >
          <span className="text-base font-medium ">Performance</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>

        {/* DME_RewardRules Card */}
        <div
          className={cardStyles("RewardRules")}
          onClick={() => handleCardClick("RewardRules")}
        >
          <span className="text-base font-medium ">Reward Rules</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>

        {/* DME_Team Card */}
        <div
          className={cardStyles("Team")}
          onClick={() => handleCardClick("Team")}
        >
          <span className="text-base font-medium ">Team</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>
        {/* DME_ROAS Card */}
        <div
          className={cardStyles("ROAS")}
          onClick={() => handleCardClick("ROAS")}
        >
          <span className="text-base font-medium ">ROAS</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>
        {/* DME_Analysis Card */}
        <div
          className={cardStyles("Analysis")}
          onClick={() => handleCardClick("Analysis")}
        >
          <span className="text-md font-medium">Analysis</span>
          <FaEye className="text-green-300 cursor-pointer" />
        </div>
      </div>

      <div className="my-6">
        <h1 className="text-2xl text-gray-700 font-bold pb-2 px-4">
          {" "}
          Data - {activeCard}{" "}
        </h1>
        <hr />
        {activeCard === "Campaign" && (
          <div>
            <DMECampaign />
          </div>
        )}
        {activeCard === "Budget" && (
          <div>
            <DMEBudget />
          </div>
        )}
        {activeCard === "Performance" && (
          <div>
            <DMEPerformance />
          </div>
        )}
         {activeCard === "RewardRules" && (
          <div>
            <DMEReward />
          </div>
        )}
        {activeCard === "Team" && (
          <div>
            <DMETeam />
          </div>
        )}
        {activeCard === "ROAS" && (
          <div>
            <DMEROAS />
          </div>
        )}
        {activeCard === "Analysis" && (
          <div>
            <DMEAnalysis />
          </div>
        )}
     
      </div>
    </div>
  );
};

export default DME;
