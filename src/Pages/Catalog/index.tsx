import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Components/Layout";
import SearchBar from "./SearchBar";

import "./Catalog.css";
import CourseCard from "./CourseCard";

export interface Course {
  id: number;
  name: string;
  title: string;
  classification_name: string;
  list_price: string;
  duration: string;
  delivery_types: { name: string; note: string }[];
  languages: { name: string; note: string }[];
}

interface ApiResponse {
  status: string;
  count: number;
  results: Course[];
}

export default function Catalog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://partner.skyline-ats.com/CustomerPortal/api/index.php?key=${process.env.REACT_APP_API_KEY}&endpoint=courses`,
        );
        if (response.data.status === "SUCCESS") {
          const uniqueCourses = response.data.results.filter(
            (course, index, self) => index === self.findIndex((t) => t.id === course.id),
          );
          setCourses(uniqueCourses);
          setDisplayedCourses(uniqueCourses);
          setLoading(false);
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        setError("An error occurred while fetching courses");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("Search term changed: ", searchTerm);
    if (searchTerm) {
      const filteredCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.classification_name.toLowerCase().includes(searchTerm),
      );
      console.log("Filtered courses: ", filteredCourses);
      setDisplayedCourses(filteredCourses);
    } else {
      setDisplayedCourses(courses);
    }
  }, [searchTerm, courses]);

  return (
    <Layout>
      <div className="catalog-container">
        <h1 className="catalog-header">Course Catalog</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {error && <p className="error-text">{error}</p>}

        {displayedCourses && displayedCourses.length > 0 ? (
          <ul className="course-list">
            {displayedCourses.map((course) => (
              <CourseCard course={course} />
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
