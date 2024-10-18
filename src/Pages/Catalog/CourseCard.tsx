import { useNavigate } from "react-router-dom";
import { Course } from ".";

export default function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/catalog?course=${course.name}`);
  };

  return (
    <li
      key={`${course.id}-card`}
      className="course-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h2 className="course-title">{course.title}</h2>
      <p>Category: {course.classification_name}</p>
      <p>Duration: {course.duration}</p>
      <p>Price: ${course.list_price}</p>
    </li>
  );
}
