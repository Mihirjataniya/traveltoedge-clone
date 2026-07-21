import tourPackage from "@/models/tourPackage"; // Mongoose Tour model
import connectToDatabase from "@/lib/db"; // Database connection
import ToursPageClient from "@/components/ToursPageClient/ToursPageClient";

export const revalidate = 900;

// Get initial tour data for SSR/ISR
export async function generateMetadata() {
  return {
    title: 'Explore Our Tours | YourTravelCompany',
    description: 'Discover amazing tour packages around the world. Find your perfect adventure today!',
  };
}

async function getInitialTours() {
  await connectToDatabase();
  
  try {
    // Initial tours fetch - Domestic by default (legacy tours without tourType count as Domestic)
    const tours = await tourPackage.find({ tourType: { $ne: "International" } })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    
    // Get all categories
    const categories = ["All"].concat(
      [...new Set((await tourPackage.distinct('category')).filter(Boolean))]
    );
    
    return {
      tours: JSON.parse(JSON.stringify(tours)),
      categories
    };
  } catch (error) {
    console.error('Error fetching initial tours:', error);
    return {
      tours: [],
      categories: ["All", "Islands", "Mountains", "Adventure", "Beach", "City", "Cultural"]
    };
  }
}

export default async function ToursPage() {
  const { tours, categories } = await getInitialTours();
  
  return <ToursPageClient initialTours={tours} categories={categories} />;
}