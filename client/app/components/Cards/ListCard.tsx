"use client";

import { List } from "@/app/types/list";

interface CardProps {
  list: List;
  onClick: () => void;
}

export default function ListCard({ list, onClick }: CardProps) {
  const date = new Date(list.createdAt);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-gray-800  truncate">{list.name}</h2>
      </div>
      <div className="p-6 bg-gray-50 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Fecha</span>
          <span className="text-sm text-gray-700">
            {formattedDate} · {formattedTime}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium text-gray-500">
            Sumatoria total:
          </span>
          <span className="text-lg font-semibold text-gray-900">
            ${parseFloat(list.total_sold).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
