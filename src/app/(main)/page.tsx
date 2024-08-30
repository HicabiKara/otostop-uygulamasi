import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />
      <Features />
    </main>
  );
}
