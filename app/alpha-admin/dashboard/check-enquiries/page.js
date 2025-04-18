"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Users,
    Clock,
    Search,
    Download,
    FileSpreadsheet
} from "lucide-react";
import * as XLSX from 'xlsx';

export default function FormSubmissionsPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const router = useRouter();

    useEffect(() => {
        fetchSubmissions();
    }, [currentPage, limit]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/alpha-admin/get-form-data?page=${currentPage}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setSubmissions(data.data);
                setTotalPages(data.pagination.totalPages);
            } else {
                throw new Error(data.error || "Failed to fetch submissions");
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Function to export data as CSV
    const exportToCSV = () => {
        if (!submissions.length) return;

        // Create CSV headers
        const headers = ['Name', 'Email', 'Phone', 'Destination', 'Date', 'Travelers', 'Submitted At'];

        // Format data for CSV
        const csvRows = [
            headers.join(','), // Header row
            ...submissions.map(item => [
                item.name.replace(/,/g, ' '),
                item.email,
                item.phone,
                item.destination.replace(/,/g, ' '),
                item.date,
                item.travellers,
                formatDate(item.createdAt)
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `form-submissions-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = (submissions) => {
        if (!submissions.length) return;
        const excelData = submissions.map(item => ({
            'Name': item.name,
            'Email': item.email,
            'Phone': item.phone,
            'Destination': item.destination,
            'Travel Date': item.date,
            'Travelers': item.travellers,
            'Submitted At': new Date(item.createdAt).toLocaleString('en-IN')
        }));

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Submissions');

        // Set column widths for better readability
        const columnWidths = [
            { wch: 25 }, // Name
            { wch: 30 }, // Email
            { wch: 15 }, // Phone
            { wch: 20 }, // Destination
            { wch: 15 }, // Travel Date
            { wch: 10 }, // Travelers
            { wch: 20 }  // Submitted At
        ];

        worksheet['!cols'] = columnWidths;

        const fileName = `form-submissions-${new Date().toISOString().split('T')[0]}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    };
    const PaginationControls = () => (
        <div className="flex items-center justify-between mt-6 px-2">
            <div className="text-sm text-gray-600">
                Showing {submissions.length} of {totalPages * limit > 0 ? totalPages * limit : 0} submissions
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
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page
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
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="border rounded p-1 text-sm"
                >
                    {[10, 25, 50, 100].map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    if (loading && submissions.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Inquiry Form Submissions</h1>
                <div className="flex items-center gap-5">
                    <button
                        onClick={exportToCSV}
                        disabled={submissions.length === 0}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        <Download size={16} className="mr-2" />
                        Export CSV
                    </button>
                    <button
                        onClick={() => exportToExcel(submissions)}
                        disabled={submissions.length === 0}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        <FileSpreadsheet size={16} className="mr-2" />
                        Export Excel
                    </button>
                </div>

            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>Error loading submissions: {error}</p>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {submissions.length > 0 ? (
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {submissions.map((submission) => (
                            <div key={submission._id} className="p-6 hover:bg-gray-50">
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <h3 className="text-lg font-medium text-gray-900 mr-3">{submission.name}</h3>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        Submitted On :
                                        <time dateTime={submission.createdAt}>
                                            {formatDate(submission.createdAt)}
                                        </time>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Mail size={16} className="mr-2 flex-shrink-0" />
                                        <a href={`mailto:${submission.email}`} className="hover:text-blue-600 truncate">
                                            {submission.email}
                                        </a>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500">
                                        <Phone size={16} className="mr-2 flex-shrink-0" />
                                        <a href={`tel:${submission.phone}`} className="hover:text-blue-600">
                                            {submission.phone}
                                        </a>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin size={16} className="mr-2 flex-shrink-0" />
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            {submission.destination}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar size={16} className="mr-2 flex-shrink-0" />
                                        <span>{new Date(submission.date).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users size={16} className="mr-2 flex-shrink-0" />
                                        <span>{submission.travellers} travelers</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-gray-100 rounded-full p-3 mb-4">
                            <Search size={24} className="text-gray-500" />
                        </div>
                        <p className="text-lg text-gray-600 mb-1">No submissions found</p>
                        <p className="text-sm text-gray-500">
                            {error ? "There was an error loading the data." : "There are no form submissions yet."}
                        </p>
                    </div>
                )}
            </div>

            {submissions.length > 0 && <PaginationControls />}
        </div>
    );
}