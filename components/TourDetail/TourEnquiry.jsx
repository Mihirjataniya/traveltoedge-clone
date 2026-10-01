'use client';
import { useState } from 'react';
import axios from 'axios';
import { Send, X, Loader2, CheckCircle2 } from 'lucide-react';

// "Enquire Now" button + modal. Only needs the tour title for the enquiry record.
export default function TourEnquiry({ tourTitle }) {
    const [showEnquiry, setShowEnquiry] = useState(false);
    const tour = { title: tourTitle };

    return (
        <>
            <button
                onClick={() => setShowEnquiry(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#03435e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#02364b]"
            >
                <Send className="h-4 w-4" />
                Enquire Now
            </button>
            {showEnquiry && <EnquiryModal tour={tour} onClose={() => setShowEnquiry(false)} />}
        </>
    );
}

function EnquiryModal({ tour, onClose }) {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await axios.post('/api/form', {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                destination: tour.title,
                // Model requires these; not asked in the minimal tour enquiry form.
                date: 'Not specified',
                travellers: 'Not specified',
            });
            if (res.data.success) {
                setDone(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Enquiry submit error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#03435e]">Enquire About This Tour</h3>
                        <p className="mt-1 text-sm text-gray-500">{tour.title}</p>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {done ? (
                    <div className="py-8 text-center">
                        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
                        <p className="mt-4 text-lg font-semibold text-[#03435e]">Enquiry sent!</p>
                        <p className="mt-1 text-sm text-gray-500">Our team will reach out to you shortly.</p>
                        <button
                            onClick={onClose}
                            className="mt-6 rounded-lg bg-[#03435e] px-6 py-2 font-medium text-white hover:bg-[#02364b]"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="e.g. +91 98765 43210"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#03435e] px-4 py-3 font-medium text-white transition-colors hover:bg-[#02364b] disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Submit Enquiry
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
