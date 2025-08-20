  'use client'
  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/navigation';
  import { Trash2, Edit, X } from 'lucide-react';

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, blogTitle }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Confirm Delete</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete the blog 
              <span className="font-medium"> "{blogTitle}"</span>? 
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default function BlogListingTable() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const router = useRouter();
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    useEffect(() => {
      fetchBlogs();
    }, [currentPage]);

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/alpha-admin/get-blog?page=${currentPage}`);
        const result = await response.json();
        
        if (result.success) {
          setBlogs(result.data);
          setTotalPages(result.pagination?.totalPages || 1);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const openDeleteModal = (blog) => {
      setBlogToDelete(blog);
      setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
      setIsModalOpen(false);
      setBlogToDelete(null);
    };

    const confirmDelete = async () => {
      if (!blogToDelete) return;
      
      try {
        const response = await fetch(`/api/alpha-admin/edit-blog?id=${blogToDelete._id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        
        if (result.success) {
          // Remove the deleted blog from state
          setBlogs(blogs.filter(blog => blog._id !== blogToDelete._id));
          closeDeleteModal();
          
          // Show success notification - could be replaced with a toast notification
          const notification = document.createElement('div');
          notification.className = 'fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md';
          notification.innerHTML = 'Blog deleted successfully';
          document.body.appendChild(notification);
          setTimeout(() => document.body.removeChild(notification), 3000);
        } else {
          alert(result.error || "Failed to delete blog");
        }
      } catch (err) {
        alert("Error connecting to server");
        console.error(err);
      } finally {
        closeDeleteModal();
      }
    };

    const handleEdit = (id) => {
      router.push(`/alpha-admin/dashboard/edit-blog/${id}`);
    };

    // Helper function to truncate title
    const truncateTitle = (title, maxLength = 15) => {
      if (!title) return '';
      return title.length <= maxLength ? title : title.substring(0, maxLength) + '...';
    };

    // Function to get category badge color
    const getCategoryColor = (category) => {
      const colors = {
        "Food": "bg-orange-100 text-orange-800",
        "Wildlife": "bg-green-100 text-green-800",
        "Islands": "bg-blue-100 text-blue-800",
        "History": "bg-amber-100 text-amber-800",
        "Mountains": "bg-indigo-100 text-indigo-800",
        "Adventure": "bg-red-100 text-red-800",
        "Beach": "bg-cyan-100 text-cyan-800"
      };
      return colors[category] || "bg-gray-100 text-gray-800";
    };

    // Format date to readable string
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    if (loading) {
      return <div className="text-center p-8">Loading blogs...</div>;
    }

    if (error) {
      return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    return (
      <div className="overflow-x-auto w-full p-4">
        <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
        
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal 
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          blogTitle={blogToDelete?.title ? truncateTitle(blogToDelete.title) : ''}
        />
        
        {blogs.length === 0 ? (
          <p className="text-center py-8">No blogs found</p>
        ) : (
          <div className="w-full max-w-7xl overflow-x-hidden">
            <table className="min-w-full  bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {truncateTitle(blog.title)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(blog.category)}`}>
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(blog.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {truncateTitle(blog.location, 15)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.readTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(blog._id)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button 
                          onClick={() => openDeleteModal(blog)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }