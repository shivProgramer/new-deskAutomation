import React, { useState } from "react";
import Tree from "react-d3-tree";
import { FaUser } from "react-icons/fa";

const UserTree = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const treeData = [
    {
      name: "User 1",
      email: "user1@example.com",
      attributes: { ID: "111" },
      children: [
        {
          name: "User 2",
          email: "user2@example.com",
          attributes: { ID: "112" },
          children: [
            { name: "User 3", email: "user3@example.com", attributes: { ID: "113" } },
            { name: "User 4", email: "user4@example.com", attributes: { ID: "114" } },
          ],
        },
        {
          name: "User 5",
          email: "user5@example.com",
          attributes: { ID: "115" },
          children: [
            {
              name: "User 6",
              email: "user6@example.com",
              attributes: { ID: "116" },
              children: [
                { name: "User 7", email: "user7@example.com", attributes: { ID: "117" } },
                { name: "User 8", email: "user8@example.com", attributes: { ID: "118" } },
              ],
            },
          ],
        },
      ],
    },
  ];

  const renderNodeWithCustomStyle = ({ nodeDatum }) => {
    const isHovered = hoveredNode === nodeDatum.name;

    return (
      <g
        onMouseEnter={() => setHoveredNode(nodeDatum.name)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {/* Node box */}
        <rect
          x={-45}
          y={-20}
          width={90}
          height={40}
          fill={isHovered ? "#e0f7fa" : "#f0f0f0"}
          stroke={isHovered ? "#00796b" : "#4CAF50"}
          strokeWidth={2}
          rx={8}
          ry={8}
        />

        {/* User Icon and Name */}
        <text
          fill="#4CAF50"
          fontSize="12"
          x={-35}
          y={-5}
          alignmentBaseline="middle"
          className="text-sm font-normal text-gray-500"
        >
          <tspan dx={0} dy={0}>
            <FaUser style={{ marginRight: "5px" }} /> {nodeDatum.name}
          </tspan>
        </text>

        {/* Tooltip box with details */}
        {isHovered && (
          <g className="z-50">
            {/* Smaller box for details */}
            <rect
              x={100}
              y={-30}
              width={140} // Adjusted width for smaller box
              height={50} // Adjusted height for smaller box
              fill="#ffffff"
              stroke="#00796b"
              strokeWidth={2}
              rx={8}
              ry={8}
            />
            {/* Text inside the box */}
            <text
              fill="gray"
              fontSize="12"
              x={110}
              y={-10}
              alignmentBaseline="middle"
              className="text-sm font-normal text-gray-500"
            >
              {`Name: ${nodeDatum.name}`}
            </text>
            <text
              fill="gray"
              fontSize="12"
              x={110}
              y={10}
              alignmentBaseline="middle"
              className="text-sm font-normal text-gray-500"
            >
              {`Email: ${nodeDatum.email}`}
            </text>
            <text
              fill="gray"
              fontSize="12"
              x={110}
              y={30}
              alignmentBaseline="middle"
              className="text-sm font-normal text-gray-500"
            >
              {`ID: ${nodeDatum.attributes.ID}`}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="h-screen w-full p-4 rounded-md border border-gray-300 overflow-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">User Referral Tree</h1>

      <div className="tree-container" style={{ width: "100%", height: "90%" }}>
        <Tree
          data={treeData}
          translate={{ x: 300, y: 100 }}
          orientation="vertical"
          renderCustomNodeElement={(rd3tProps) => renderNodeWithCustomStyle(rd3tProps)}
          collapsible={false}
          pathFunc="elbow"
        />
      </div>
    </div>
  );
};

export default UserTree;





