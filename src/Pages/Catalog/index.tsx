import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CourseDetail from "./CourseDetail";
import BrowseCatalog from "./BrowseCatalog";

import "./Catalog.css";

export interface Course {
  id: number;
  name: string;
  title: string;
  classification_id: number;
  classification_name: string;
  list_price: string;
  discounted_list_price: number;
  duration: string;
  digital_kit: number;
  delivery_types: { name: string; note: string }[];
  languages: { name: string; note: string }[];
  description: string; // contains HTML string
  objective: string; // contains HTML string
  prerequisites: string; // contains HTML string
  who_should_attend: string; // contains HTML string
  outline: string; // contains HTML string
}

interface ApiResponse {
  status: string;
  count: number;
  results: Course[];
}

export default function Catalog() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const courseParam = params.get("course");

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
          setIsLoading(false);
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
    if (searchTerm) {
      const filteredCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.classification_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setDisplayedCourses(filteredCourses);
    } else {
      setDisplayedCourses(courses);
    }
  }, [searchTerm, courses]);

  const selectedCourse = courseParam ? courses.find((course) => course.name === courseParam) : null;

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} />;
  }

  return (
    <BrowseCatalog
      loading={isLoading}
      displayedCourses={displayedCourses}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      error={error}
    />
  );
}
