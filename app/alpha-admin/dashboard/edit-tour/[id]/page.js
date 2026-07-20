"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
    Save,
    Upload,
    Loader2,
    AlertCircle,
    ArrowLeft,
    Star,
    DollarSign,
    MapPin,
    Clock,
    Tag,
    FileText,
    Award
} from "lucide-react";

export default function EditTourForm({ params }) {
    const tourId = params.id;
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        duration: "",
        price: 0,
        rating: 0,
        image: "",
        category: "",
        itinerary: "",
        isTopTour: false
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");
    const [coverUploading, setCoverUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const TOUR_CATEGORIES = ["Islands", "Mountains", "Adventure", "Beach", "City", 'Cultural']
    // Fetch tour data
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await fetch(`/api/alpha-admin/edit-tour/${tourId}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setFormData(data.data);
                    setImagePreview(data.data.image);
                    setCoverPreview(data.data.coverImage || "");
                } else {
                    throw new Error(data.error || "Failed to fetch tour");
                }
            } catch (err) {
                setError("Failed to load tour data. Please try again.");
                console.error("Error fetching tour:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [tourId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked :
                type === "number" ? parseFloat(value) :
                    value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        const resUrl = await uploadImageToCloudinary(file)
        setFormData((data) => ({
            ...data,
            image: resUrl
        }))
        setImageFile(file);
    };

    const handleCoverChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCoverUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setFormData((data) => ({ ...data, coverImage: url }));
            setCoverPreview(url);
        } catch (err) {
            console.error("Error uploading cover:", err);
            setError("Cover image upload failed. Please try again.");
        } finally {
            setCoverUploading(false);
            setUploadProgress(0);
        }
    };

    const uploadImageToCloudinary = async (file) => {
        try {
            setUploadProgress(10);

            // Get signature for secure upload
            const sigRes = await fetch("/api/alpha-admin/cloudinary/signature", {
                method: "POST",
            });

            if (!sigRes.ok) throw new Error("Failed to get upload signature");

            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();
            setUploadProgress(30);

            // Prepare form data for Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);

            // Upload to Cloudinary
            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadRes.ok) throw new Error("Image upload failed");

            setUploadProgress(90);
            const data = await uploadRes.json();
            setUploadProgress(100);

            return data.secure_url;
        } catch (err) {
            console.error("Error uploading image:", err);
            throw new Error("Image upload failed. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            setSuccess(false);
            const response = await fetch(`/api/alpha-admin/edit-tour/${tourId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update tour");
            }

            setSuccess(true);

            // Reset form
            setFormData(data.data);
            setImageFile(null);
            setUploadProgress(0);

            // Show success message briefly before redirecting
            setTimeout(() => {
                router.push("/alpha-admin/dashboard/edit-tour");
            }, 2000);

        } catch (err) {
            setError(err.message);
            console.error("Error updating tour:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2">Loading tour data...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button
                onClick={() => router.push("/admin/tours")}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft size={18} className="mr-1" />
                Back to Tours
            </button>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Tour Package</h1>

                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        Tour updated successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Two-column layout for larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className="space-y-6">
                            {/* Tour Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tour Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <MapPin size={16} className="mr-1" />
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Clock size={16} className="mr-1" />
                                    Duration *
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 3 days, 2 nights"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <DollarSign size={16} className="mr-1" />
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Star size={16} className="mr-1" />
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tour Image *
                                </label>
                                <div className="mt-1 flex flex-col items-center">
                                    {imagePreview && (
                                        <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
                                            <Image
                                                src={imagePreview}
                                                alt="Tour preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                        <Upload className="mr-2 h-5 w-5 text-gray-400" />
                                        <span>{imageFile ? imageFile.name : "Change image"}</span>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="w-full mt-2">
                                            <div className="bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Tag size={16} className="mr-1" />
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                >
                                    <option value="">Select Category</option>
                                    {TOUR_CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Top Tour Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isTopTour"
                                    name="isTopTour"
                                    checked={formData.isTopTour || false}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isTopTour" className="ml-2 block text-sm text-gray-700 flex items-center">
                                    <Award size={16} className="mr-1 text-yellow-500" />
                                    Featured as Top Tour
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Full width fields */}
                    <div>
                        <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FileText size={16} className="mr-1" />
                            Itinerary
                        </label>
                        <textarea
                            id="itinerary"
                            name="itinerary"
                            value={formData.itinerary || ""}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Day 1: Arrival and welcome dinner...&#10;Day 2: Guided tour of main attractions...&#10;Day 3: Free day for exploration..."
                        ></textarea>
                    </div>

                    {/* Cover Image (16:9) */}
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image
                            <span className="text-gray-400 text-xs ml-2 font-normal">
                                (16:9 aspect ratio required. Banner on the detail page. Falls back to Tour Image if empty.)
                            </span>
                        </label>
                        {coverPreview && (
                            <div className="relative w-full max-w-md aspect-video mb-3 rounded-md overflow-hidden">
                                <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                            </div>
                        )}
                        <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                            <Upload className="mr-2 h-5 w-5 text-gray-400" />
                            <span>{coverUploading ? "Uploading..." : coverPreview ? "Change cover image" : "Upload cover image"}</span>
                            <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                className="sr-only"
                            />
                        </label>
                    </div>

                    {/* Tour Content (rich text) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FileText size={16} className="mr-1" />
                            Tour Content
                            <span className="text-gray-400 text-xs ml-2 font-normal">
                                (If filled, "View Details" opens the detail page instead of the PDF.)
                            </span>
                        </label>
                        <RichTextEditor
                            value={formData.content || ""}
                            onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                            placeholder="<p>Write the tour details here...</p>"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center min-w-[120px]"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-5 w-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}