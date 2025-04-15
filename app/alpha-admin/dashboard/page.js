"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const router = useRouter();

  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center my-10">
      <div
        className="w-64 h-64 p-6 bg-blue-500 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
        onClick={() => handleCardClick("/alpha-admin/dashboard/add-tour")}
      >
        <h3 className="text-2xl font-bold text-white">Create Tour Package</h3>
        <p className="text-white">Add a new tour package to your offerings</p>
      </div>

      {/* Card for Edit Tour Package */}
      <div
        className="w-64 h-64 p-6 bg-green-500 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
        onClick={() => handleCardClick("/alpha-admin/dashboard/edit-tour")}
      >
        <h3 className="text-2xl font-bold text-white">Edit Tour Package</h3>
        <p className="text-white">Edit an existing tour package</p>
      </div>

      {/* Card for Create Blog */}
      <div
        className="w-64 h-64 p-6 bg-yellow-500 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
        onClick={() => handleCardClick("/alpha-admin/dashboard/add-blog")}
      >
        <h3 className="text-2xl font-bold text-white">Create Blog</h3>
        <p className="text-white">Write and publish a new blog</p>
      </div>

      {/* Card for Edit Blog */}
      <div
        className="w-64 h-64 p-6 bg-red-500 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
        onClick={() => handleCardClick("/alpha-admin/dashboard/edit-blog")}
      >
        <h3 className="text-2xl font-bold text-white">Edit Blog</h3>
        <p className="text-white">Edit an existing blog post</p>
      </div>

      {/* Card for Check Tour Enquiries */}
      <div
        className="w-64 h-64 p-6 bg-purple-500 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
        onClick={() => handleCardClick("/alpha-admin/dashboard/check-enquiries")}
      >
        <h3 className="text-2xl font-bold text-white">Check Tour Enquiries</h3>
        <p className="text-white">Review the enquiries submitted by users</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
