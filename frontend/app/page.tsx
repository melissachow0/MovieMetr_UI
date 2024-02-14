import Image from "next/image";
import styles from "@/ui/home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1>Top 10 hottest Fortnite skins</h1>
      <a href="https://www.fortnite.com/?lang=en-US">fortnite</a>
    </main>
  );
}