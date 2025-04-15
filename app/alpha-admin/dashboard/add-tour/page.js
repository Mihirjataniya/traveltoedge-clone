"use client";

import { useState } from "react";
import axios from "axios";

const AddTourPackage = () => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        duration: "",
        price: "",
        rating: "",
        image: "",
        category: "",
        itinerary: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image upload to Cloudinary
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview of the image
        setImagePreview(URL.createObjectURL(file));

        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_cloudinary_upload_preset"); // Add your Cloudinary upload preset

        try {
            setLoading(true);
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
                formData
            );
            const imageUrl = response.data.secure_url;

            // Set the image URL in the form data
            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));
        } catch (error) {
            console.error("Error uploading image to Cloudinary", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/alpha-admin/add-tour", formData);

            if (response.data.success) {
                alert("Tour package added successfully!");
            } else {
                alert(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Create Tour Package</h2>
    
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="title" className="block font-medium text-sm md:text-base">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="location" className="block font-medium text-sm md:text-base">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="duration" className="block font-medium text-sm md:text-base">
                    Duration 
                    <span className="text-gray-400 text-xs md:text-sm ml-1 block md:inline">
                        (Note: Format as 7D/6N or 8-10 Days etc...)
                    </span>
                </label>
                <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="price" className="block font-medium text-sm md:text-base">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="rating" className="block font-medium text-sm md:text-base">Rating</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="category" className="block font-medium text-sm md:text-base">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="itinerary" className="block font-medium text-sm md:text-base">Itinerary (File URL)</label>
                <input
                    type="text"
                    id="itinerary"
                    name="itinerary"
                    value={formData.itinerary}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
            </div>
    
            <div className="space-y-1 md:space-y-2">
                <label htmlFor="image" className="block font-medium text-sm md:text-base">Tour Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={handleImageUpload}
                    accept="image/*"
                    required
                    className="w-full p-2 border rounded text-sm md:text-base"
                />
                {imagePreview && (
                    <div className="mt-2">
                        <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="w-24 h-24 md:w-32 md:h-32 object-cover border rounded"
                        />
                    </div>
                )}
            </div>
    
            <div className="col-span-1 md:col-span-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-blue-500 text-white rounded mt-3 md:mt-4 text-sm md:text-base"
                >
                    {loading ? "Uploading..." : "Add Tour Package"}
                </button>
            </div>
        </form>
    </div>
    );
};

export default AddTourPackage;
