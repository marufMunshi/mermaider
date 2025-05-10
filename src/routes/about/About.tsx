import styles from "./About.module.scss";

function About() {
  return (
    <div className={styles["about-wrapper"]}>
      <p className={styles["paragraph"]}>This is the about section</p>
    </div>
  );
}

export default About;
