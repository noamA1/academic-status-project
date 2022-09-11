import css from "./Card.module.css";

const Card = (props) => {
  const courseInfo = props.courseInfo;

  return (
    <div className={css.card}>
      <div className={css.card_header}>
        <button onClick={props.onClose} className={css.close}>
          &#9747;
        </button>
        <h5 className={css.card_title}>{courseInfo.name}</h5>
      </div>
      <div className={css.card_content}>
        <ul>
          <li key='year'>
            <p className={css.card_text}>
              שנה: <span>{courseInfo.year}</span>{" "}
            </p>
          </li>
          <li key='semester'>
            <p className={css.card_text}>
              סמסטר: <span>{courseInfo.semester}</span>{" "}
            </p>
          </li>
          <li key='credits'>
            <p className={css.card_text}>
              נוקודות זכות: <span>{courseInfo.credits}</span>{" "}
            </p>
          </li>
          <li key='lecture'>
            <p className={css.card_text}>
              שעות הרצאה: <span>{courseInfo.lectureHours}</span>{" "}
            </p>
          </li>
          <li key='practice'>
            <p className={css.card_text}>
              שעות תרגול: <span>{courseInfo.practiceHours}</span>{" "}
            </p>
          </li>
          <li key='laboratory'>
            <p className={css.card_text}>
              שעות מעבדה: <span> {courseInfo.laboratoryHours}</span>{" "}
            </p>
          </li>
          <li key='pre-courses'>
            <p className={css.card_text}>קורסי קדם: </p>
            <ul>
              {courseInfo.preCourses.map((element) => {
                return (
                  <li key={`name-${element.code}`}>
                    <p className={css.card_text}>
                      שם קורס: <span>{element.name}</span>{" "}
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
