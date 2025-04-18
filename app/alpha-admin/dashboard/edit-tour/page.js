"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash, 
  Star, 
  Map, 
  Calendar, 
  Tag, 
  Award,
  X,
  AlertTriangle
} from "lucide-react";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTours();
  }, [currentPage, limit]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/alpha-admin/get-tour?page=${currentPage}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTours(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        throw new Error(data.error || "Failed to fetch tours");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tours:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditTour = (tourId) => {
    router.push(`/alpha-admin/dashboard/edit-tour/${tourId}`);
  };

  const openDeleteModal = (tour) => {
    setTourToDelete(tour);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTourToDelete(null);
  };

  const handleDeleteTour = async () => {
    if (!tourToDelete) return;
    
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`/api/alpha-admin/edit-tour/${tourToDelete._id}`);
      
      if (response.data.success) {
        // Remove the deleted tour from the state
        setTours(tours.filter(tour => tour._id !== tourToDelete._id));
        
        // If we deleted the last item on a page, go to previous page (except for page 1)
        if (tours.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          // Otherwise just refresh the current page
          fetchTours();
        }
        
        closeDeleteModal();
      } else {
        throw new Error(response.data.error || "Failed to delete tour");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error deleting tour:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="text-sm text-gray-600">
        Showing {tours.length} of {totalPages * limit} tours
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => (
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1)
            ))
            .map((page, index, array) => (
              <div key={page} className="flex items-center">
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === page 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              </div>
            ))}
        </div>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => {
    if (!isDeleteModalOpen || !tourToDelete) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Confirm Delete</h3>
            <button 
              onClick={closeDeleteModal} 
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center text-center mb-4 text-red-500">
              <AlertTriangle size={48} />
            </div>
            <p className="text-center mb-2">Are you sure you want to delete this tour?</p>
            <p className="text-center font-medium">{tourToDelete.title}</p>
            <p className="text-sm text-center text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              disabled={deleteLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTour}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash size={16} className="mr-2" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading && tours.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>Error loading tours: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tour Packages</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tours.length > 0 ? (
              tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 relative rounded overflow-hidden">
                      <Image 
                        src={tour.image} 
                        alt={tour.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {tour.isTopTour && (
                        <Award size={16} className="text-yellow-500 mr-1" />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {tour.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                      <Map size={16} className="mr-1" />
                      {tour.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      {tour.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                    ₹{tour.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      {tour.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                    {tour.category && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag size={16} className="mr-1" />
                        {tour.category}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTour(tour._id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Edit size={18} />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(tour)}
                        className="text-red-600 hover:text-red-700 flex items-center"
                      >
                        <Trash size={18} />
                        <span className="hidden text-red-500 sm:inline ml-1">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No tours found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {tours.length > 0 && <PaginationControls />}
      </div>
      
      <DeleteConfirmationModal />
    </div>
  );
}