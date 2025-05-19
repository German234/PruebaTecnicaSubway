"use client";

import { CreateListForm } from "@/app/components/Forms/CreateListForm";

export default function CreateListPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <CreateListForm />
      </div>
    </div>
  );
}