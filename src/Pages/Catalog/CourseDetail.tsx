import { Course } from ".";
import Layout from "../../Components/Layout";

export default function CourseDetail({ course }: { course: Course }) {
  return (
    <Layout>
      <div className="course-detail-container">
        <h1 className="course-title">{course.title}</h1>
        <p>
          <strong>Category:</strong> {course.classification_name}
        </p>
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
        <p>
          <strong>Price:</strong> ${course.list_price}
        </p>

        <div className="course-detail-section">
          <h3>Delivery Types:</h3>
          <ul>
            {course.delivery_types.map((type, index) => (
              <li key={index}>
                {type.name} - {type.note}
              </li>
            ))}
          </ul>
        </div>

        {course.languages && (
          <div className="course-detail-section">
            <h3>Languages:</h3>
            <ul>
              {course.languages.map((language, index) => (
                <li key={index}>{language.name}</li>
              ))}
            </ul>
          </div>
        )}

        {course.description && (
          <div className="course-detail-section">
            <h3>Description:</h3>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(course.description) }} />
          </div>
        )}

        {course.objective && (
          <div className="course-detail-section">
            <h3>Objectives:</h3>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(course.objective) }} />
          </div>
        )}

        {course.prerequisites && (
          <div className="course-detail-section">
            <h3>Prerequisites:</h3>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(course.prerequisites) }} />
          </div>
        )}

        {course.who_should_attend && (
          <div className="course-detail-section">
            <h3>Who Should Attend:</h3>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(course.who_should_attend) }} />
          </div>
        )}

        {course.outline && (
          <div className="course-detail-section">
            <h3>Course Outline:</h3>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(course.outline) }} />
          </div>
        )}
      </div>
    </Layout>
  );
}

function decodeHtml(html: string) {
  const unescapedHtml = html.replace(/\\&quot;/g, '"').replace(/\\/g, "");
  const txt = document.createElement("textarea");
  txt.innerHTML = unescapedHtml;
  return txt.value;
}
