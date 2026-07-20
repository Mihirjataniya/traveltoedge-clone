"use client";
import { useEffect, useRef, useState } from "react";
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
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    ImageDown,
    Link2,
    List,
    ListOrdered,
    Minus,
    MessageSquareQuote,
} from "lucide-react";

/**
 * Reusable TipTap rich-text editor.
 * Props:
 *   value        - initial HTML content (applied once the editor mounts / when it changes externally)
 *   onChange(html) - called with updated HTML on every edit
 *   placeholder  - HTML used when value is empty
 */
export default function RichTextEditor({ value = "", onChange, placeholder = "<p>Start writing...</p>" }) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    // Track whether we've applied the incoming value yet (for async-loaded content like edit page)
    const appliedRef = useRef(false);

    const editor = useEditor({
        immediatelyRender: false,
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
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: value || placeholder,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    // Apply async-loaded initial content (e.g. edit page fetches tour then passes value)
    useEffect(() => {
        if (!editor) return;
        if (appliedRef.current) return;
        if (value && value !== editor.getHTML()) {
            editor.commands.setContent(value);
            appliedRef.current = true;
        }
    }, [editor, value]);

    const uploadToCloudinary = async (file) => {
        const sigRes = await fetch("/api/alpha-admin/cloudinary/signature", { method: "POST" });
        const { signature, timestamp, cloudName, apiKey } = await sigRes.json();
        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", apiKey);
        fd.append("timestamp", timestamp);
        fd.append("signature", signature);
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: fd,
        });
        const data = await uploadRes.json();
        return data.secure_url;
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !editor) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            editor.chain().focus().setImage({ src: url }).run();
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const setLink = () => {
        const url = window.prompt("URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    };

    if (!editor) {
        return <div className="border border-gray-300 rounded-lg p-4 min-h-64 bg-gray-50" />;
    }

    const btn = (active) =>
        `px-2 py-1 rounded ${active ? "bg-blue-600 text-white" : "bg-white border border-gray-300 hover:bg-gray-100"}`;

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-2 mb-2 bg-gray-100 rounded-t-lg border border-gray-300">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Bold">
                    <strong>B</strong>
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Italic">
                    <em>I</em>
                </button>

                <div className="h-6 border-r border-gray-300 mx-1" />

                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive("heading", { level: 1 }))} title="Heading 1">H1</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="Heading 2">H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="Heading 3">H3</button>

                <div className="h-6 border-r border-gray-300 mx-1" />

                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))} title="Bullet List"><List /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))} title="Numbered List"><ListOrdered /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))} title="Blockquote"><MessageSquareQuote /></button>

                <div className="h-6 border-r border-gray-300 mx-1" />

                <button type="button" onClick={setLink} className={btn(editor.isActive("link"))} title="Add Link"><Link2 /></button>
                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Horizontal Line"><Minus /></button>

                <div className="h-6 border-r border-gray-300 mx-1" />

                <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={btn(editor.isActive({ textAlign: "left" }))} title="Align Left"><AlignLeft /></button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={btn(editor.isActive({ textAlign: "center" }))} title="Align Center"><AlignCenter /></button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={btn(editor.isActive({ textAlign: "right" }))} title="Align Right"><AlignRight /></button>

                <div className="h-6 border-r border-gray-300 mx-1" />

                <label className="flex items-center gap-1 cursor-pointer px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100">
                    <ImageDown />
                    <span>Add Image</span>
                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
                </label>
            </div>

            {/* Editor surface */}
            <div className="relative border border-gray-300 rounded-b-lg p-4 min-h-64 bg-white">
                {uploading && (
                    <div className="absolute inset-0 z-10 bg-white bg-opacity-70 flex items-center justify-center">
                        <p className="text-blue-600 font-medium">Uploading image...</p>
                    </div>
                )}
                <EditorContent editor={editor} className="tiptap prose max-w-none focus:outline-none" />
            </div>
        </div>
    );
}
