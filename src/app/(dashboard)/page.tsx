import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import styles from "./page.module.css";
import LoginRequiredHandler from "@/components/LoginRequiredHandler/LoginRequiredHandler";
import LoginRequiredModal from "@/components/modals/login-required-modal/LoginRequiredModal";
import Modal from "@/components/ui/modal/Modal";

export default function Home() {
  return (
    <main className={styles.container}>
      <LoginRequiredHandler/>
        <Modal name="login-required">
        <LoginRequiredModal />
        </Modal>
      <Hero />
      <Features />
    </main>
  );
}
