import tourPackage from "@/models/tourPackage"; // Mongoose Tour model
import connectToDatabase from "@/lib/db"; // Database connection
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectToDatabase();

    try {
        // Get URL and parse query parameters
        const { searchParams } = new URL(request.url);
        
        // Extract query parameters with defaults
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '6';
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const duration = searchParams.get('duration') || '';
        const isTopTour = searchParams.get('isTopTour') || '';

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Build filter object
        const filter = {};

        // Search filter (title and location)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Duration filter
        if (duration) {
            // Parse duration range
            const [min, max] = duration.split('-').map(d => parseInt(d.trim()));

            if (max) {
                // Range filter: e.g., "7-10" should match "7 days", "7-10 days", "8D9N", etc.
                const durationRegexPattern = new RegExp(
                    `^(${Array.from({ length: max - min + 1 }, (_, i) => min + i).join('|')})(\\s*days?|\\s*-|D)`
                );
                filter.duration = { $regex: durationRegexPattern, $options: 'i' };
            } else {
                // Exact duration filter: e.g., "7" should match only "7 days", "7D", etc.
                filter.duration = { $regex: new RegExp(`^${min}(\\s*days?|D)`, 'i') };
            }
        }

        // Top Tour filter
        if (isTopTour === 'true') {
            filter.isTopTour = true;
        }

        // Execute query with pagination
        const tours = await tourPackage.find(filter)
            .sort({ createdAt: -1 }) // Most recent first
            .skip(skip)
            .limit(limitNumber);

        // Get total count for pagination info
        const total = await tourPackage.countDocuments(filter);

        return NextResponse.json({
            tours,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber),
                hasMore: skip + tours.length < total
            }
        });
    } catch (error) {
        console.error('Error fetching tours:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}