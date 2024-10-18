import { Course } from ".";
import Layout from "../../Components/Layout";
import CourseCard from "./CourseCard";
import SearchBar from "./SearchBar";

interface BrowseCatalogProps {
  loading: boolean;
  displayedCourses: Course[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
}

export default function BrowseCatalog({
  loading,
  displayedCourses,
  searchTerm,
  setSearchTerm,
  error,
}: BrowseCatalogProps) {
  return (
    <Layout>
      <div className="catalog-container">
        <h1 className="catalog-header">Course Catalog</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {error && <p className="error-text">{error}</p>}

        {displayedCourses && displayedCourses.length > 0 ? (
          <ul className="course-list">
            {displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </ul>
        ) : !error && loading ? (
          <p className="loading-text">Loading courses...</p>
        ) : (
          <p className="loading-text">No courses found</p>
        )}
      </div>
    </Layout>
  );
}
