import { Course } from ".";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <li key={`${course.id}-card`} className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p>Category: {course.classification_name}</p>
      <p>Duration: {course.duration}</p>
      <p>Price: ${course.list_price}</p>
      {/* <p>Delivery Types:</p>
      {course.delivery_types && (
        <ul>
          {course.delivery_types.map((type, index) => (
            <li key={`${course.id}-delivery-type-${type.name}}`}>
              {type.name} - {type.note}
            </li>
          ))}
        </ul>
      )}
      <p>Languages:</p>
      {course.languages && (
        <ul>
          {course.languages.map((language, index) => (
            <li key={`${course.id}-language-${language.name}`}>{language.name}</li>
          ))}
        </ul>
      )} */}
    </li>
  );
}
