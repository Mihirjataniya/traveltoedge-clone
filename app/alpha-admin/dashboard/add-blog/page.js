"use client"
import { useState, useRef, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import axios from "axios";
import { AlignCenter, AlignLeft, AlignRight, ImageDown, Link2, List, ListOrdered, MessageSquareQuote, Underline } from "lucide-react";

const BLOG_CATEGORIES = [
    "Food",
    "Wildlife",
    "Islands",
    "History",
    "Mountains",
    "Adventure",
    "Beach"
];

const AddBlogPost = () => {
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        readTime: "",
        category: "",
        location: "",
        author: "",
        image: ""
    });
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [mainImageFile, setMainImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const fileInputRef = useRef(null);
    const mainImageInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Image,
            Link.configure({ openOnClick: false }),
            Blockquote,
            HorizontalRule,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: "<p>Start writing your blog post...</p>",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleMainImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setMainImagePreview(e.target.result);
        };

        const imageUrl = await uploadToCloudinary(file)
        setForm((prev) => ({
            ...prev,
            image: imageUrl
        }));

        reader.readAsDataURL(file);
        setMainImageFile(file);
    };

    const uploadToCloudinary = async (file, folder = "blog-images") => {
        try {
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
              return url
        } catch (error) {
            console.log(error)
            alert("error uplaoding an image")
        }
    };

    const handleImageUploadToEditor = async (e) => {
        const file = e.target.files[0];
        if (!file || !editor) return;

        setUploading(true);
        try {
            const imageUrl = await uploadToCloudinary(file, "blog-content-images");
            editor.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const setLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            // Upload main image first
            if (!mainImageFile) {
                alert("Please upload a main image for the blog");
                setSubmitLoading(false);
                return;
            }

    

            const payload = {
                ...form,
                content: editor.getHTML(),
            };

            const res = await axios.post("/api/alpha-admin/add-blog", payload);
            if (res.data.success) {
                alert("Blog published successfully!");
                // Reset form
                setForm({ title: "", excerpt: "", readTime: "", category: "", location: "", author: "", image: "" });
                setMainImagePreview(null);
                setMainImageFile(null);
                editor.commands.setContent("<p>Start writing your blog post...</p>");
            } else {
                alert("Failed to create blog");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting blog");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 bg-white shadow-lg rounded-lg my-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Blog Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            placeholder="Brief summary of your blog post"
                            required
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select Category</option>
                            {BLOG_CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="e.g., Bali, Indonesia"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Author name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Read Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                        <input
                            name="readTime"
                            value={form.readTime}
                            onChange={handleChange}
                            placeholder="e.g., 5 min read"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Main Image Upload */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Blog Image</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                            {mainImagePreview ? (
                                <div className="relative w-full">
                                    <img
                                        src={mainImagePreview}
                                        alt="Blog preview"
                                        className="h-64 w-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMainImagePreview(null);
                                            setMainImageFile(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center" onClick={() => mainImageInputRef.current.click()}>

                                    <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleMainImageUpload}
                                ref={mainImageInputRef}
                            />
                        </div>
                    </div>
                </div>

                {/* Rich Text Editor Section */}
                <div className="mt-8">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Blog Content</label>

                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 p-2 mb-2 bg-gray-100 rounded-t-lg border border-gray-300">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Bold"
                        >
                            <strong>B</strong>
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Italic"
                        >
                            <em>I</em>
                        </button>

                        <div className="h-6 border-r border-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Heading 1"
                        >
                            H1
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Heading 2"
                        >
                            H2
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Heading 3"
                        >
                            H3
                        </button>

                        <div className="h-6 border-r border-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Bullet List"
                        >
                            <List />
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Numbered List"
                        >
                            <ListOrdered />
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Blockquote"
                        >
                            <MessageSquareQuote />
                        </button>

                        <div className="h-6 border-r border-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={setLink}
                            className={`px-2 py-1 rounded ${editor?.isActive('link') ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Add Link"
                        >
                            <Link2 />
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            className="px-2 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100"
                            title="Horizontal Line"
                        >
                            <Underline />
                        </button>

                        <div className="h-6 border-r border-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Align Left"
                        >
                            <AlignLeft />
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Align Center"
                        >
                            <AlignCenter />
                        </button>

                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
                            title="Align Right"
                        >
                            <AlignRight />
                        </button>

                        <div className="h-6 border-r border-gray-300 mx-1"></div>

                        <label className="flex items-center cursor-pointer px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100">
                            <ImageDown />
                            <span>Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                ref={fileInputRef}
                                onChange={handleImageUploadToEditor}
                            />
                        </label>
                    </div>

                    {/* Editor Content */}
                    <div className={`border border-gray-300 rounded-b-lg p-4 min-h-64 bg-white ${uploading ? 'relative' : ''}`}>
                        {uploading && (
                            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="mt-2 text-blue-600 font-medium">Uploading image...</p>
                                </div>
                            </div>
                        )}
                        <EditorContent editor={editor} className="tiptap prose max-w-none focus:outline-none" />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <div className="tiptap prose max-w-none preview-content" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}></div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        type="button"
                        onClick={() => {
                            setForm({ title: "", excerpt: "", readTime: "", category: "", location: "", author: "", image: "" });
                            setMainImagePreview(null);
                            setMainImageFile(null);
                            editor.commands.setContent("<p>Start writing your blog post...</p>");
                        }}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        Clear Form
                    </button>
                    <button
                        type="submit"
                        disabled={submitLoading}
                        className={`px-6 py-3 rounded-lg text-white font-medium ${submitLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {submitLoading ? (
                            <div className="flex items-center">

                                Publishing...
                            </div>
                        ) : (
                            "Publish Blog Post"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlogPost;