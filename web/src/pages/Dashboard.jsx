import React from "react";

const Dashboard = () => {
  // Sample data for the cards
  const cardData = [
    {
      title: "Card 1",
      rows: [
        { id: 1, name: "Item 1", value: "Value 1" },
        { id: 2, name: "Item 2", value: "Value 2" },
        { id: 3, name: "Item 3", value: "Value 3" },
        { id: 4, name: "Item 4", value: "Value 4" },
        { id: 5, name: "Item 5", value: "Value 5" },
      ],
    },
    {
      title: "Card 2",
      rows: [
        { id: 1, name: "Item 6", value: "Value 6" },
        { id: 2, name: "Item 7", value: "Value 7" },
        { id: 3, name: "Item 8", value: "Value 8" },
        { id: 4, name: "Item 9", value: "Value 9" },
        { id: 5, name: "Item 10", value: "Value 10" },
      ],
    },
    {
      title: "Card 3",
      rows: [
        { id: 1, name: "Item 11", value: "Value 11" },
        { id: 2, name: "Item 12", value: "Value 12" },
        { id: 3, name: "Item 13", value: "Value 13" },
        { id: 4, name: "Item 14", value: "Value 14" },
        { id: 5, name: "Item 15", value: "Value 15" },
      ],
    },
    {
      title: "Card 4",
      rows: [
        { id: 1, name: "Item 16", value: "Value 16" },
        { id: 2, name: "Item 17", value: "Value 17" },
        { id: 3, name: "Item 18", value: "Value 18" },
        { id: 4, name: "Item 19", value: "Value 19" },
        { id: 5, name: "Item 20", value: "Value 20" },
      ],
    },
  ];

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-lg font-bold mb-4">{card.title}</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="border-b p-2">ID</th>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {card.rows.map((row) => (
                <tr key={row.id}>
                  <td className="p-2 border-b">{row.id}</td>
                  <td className="p-2 border-b">{row.name}</td>
                  <td className="p-2 border-b">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
