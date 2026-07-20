"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/ui/RichTextEditor";
const AddTourPackage = () => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        duration: "",
        price: "",
        rating: "",
        image: "",
        coverImage: "",
        category: "",
        itinerary: "",
        content: "",
        isTopTour: false,
    });

    const router = useRouter()
    const [imagePreview, setImagePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coverLoading, setCoverLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const TOUR_CATEGORIES = ["Islands", "Mountains", "Adventure", "Beach", "City", 'Cultural']

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);


        const sigRes = await fetch("/api/alpha-admin/cloudinary/signature", {
            method: "POST",
        });

        const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await uploadRes.json();
        const url = data.secure_url;
        setFormData((prev) => ({
            ...prev,
            image: url,
        }));
        setImagePreview(url);
        setLoading(false);
    };

    const handleCoverUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCoverLoading(true);

        const sigRes = await fetch("/api/alpha-admin/cloudinary/signature", {
            method: "POST",
        });

        const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", apiKey);
        fd.append("timestamp", timestamp);
        fd.append("signature", signature);

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
                method: "POST",
                body: fd,
            }
        );

        const data = await uploadRes.json();
        setFormData((prev) => ({
            ...prev,
            coverImage: data.secure_url,
        }));
        setCoverPreview(data.secure_url);
        setCoverLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/alpha-admin/add-tour", formData);

            if (response.data.success) {
                alert("Tour package added successfully!");
                router.push('/alpha-admin/dashboard/edit-tour')
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
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                        <option value="">Select Category</option>
                        {TOUR_CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
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
                        onChange={handleUpload}
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

                <div className="space-y-1 md:space-y-2">
                    <label htmlFor="coverImage" className="block font-medium text-sm md:text-base">
                        Cover Image
                        <span className="text-gray-400 text-xs md:text-sm ml-1 block md:inline">
                            (16:9 aspect ratio required. Shown as the banner on the detail page. Falls back to Tour Image if left empty.)
                        </span>
                    </label>
                    <input
                        type="file"
                        id="coverImage"
                        onChange={handleCoverUpload}
                        accept="image/*"
                        className="w-full p-2 border rounded text-sm md:text-base"
                    />
                    {coverLoading && <p className="text-xs text-blue-600">Uploading cover...</p>}
                    {coverPreview && (
                        <div className="mt-2 w-full max-w-xs aspect-video">
                            <img
                                src={coverPreview}
                                alt="Cover Preview"
                                className="w-full h-full object-cover border rounded"
                            />
                        </div>
                    )}
                </div>
                <div className="space-y-1 md:space-y-2">
                    <label htmlFor="isTopTour" className="block font-medium text-sm md:text-base">
                        <input
                            type="checkbox"
                            id="isTopTour"
                            name="isTopTour"
                            checked={formData.isTopTour}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, isTopTour: e.target.checked }))
                            }
                            className="mr-2"
                        />
                        Mark as Top Tour (Show on Homepage)
                    </label>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1 md:space-y-2">
                    <label className="block font-medium text-sm md:text-base">
                        Tour Content
                        <span className="text-gray-400 text-xs md:text-sm ml-1 block md:inline">
                            (Rich detail page. If filled, "View Details" opens this page instead of the PDF.)
                        </span>
                    </label>
                    <RichTextEditor
                        value={formData.content}
                        onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                        placeholder="<p>Write the tour details here...</p>"
                    />
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
