
import styles from "./page.module.css";
import Counter from "@/features/count/Counter";

export default function Home() {
  return (
    <div className={styles.container}>
      <Counter/>
    </div>
  );
}
