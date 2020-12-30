import { useEffect, useState, ReactNode } from "react";
import Head from "next/head";
import AnchoredLogo from "../AnchoredLogo/AnchoredLogo";
import styles from "./Layout.module.css";
import { Brightness6Rounded } from "@material-ui/icons";

type Props = {
  children: ReactNode;
  title: string;
};

type Theme = string;

const Layout = ({ children, title = "World Ranks" }: Props) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );

    setTheme(localStorage.getItem("theme"));
  }, []);

  const switchTheme = () => {
    if (theme === "light") {
      saveTheme("dark");
    } else {
      saveTheme("light");
    }
  };

  const saveTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <AnchoredLogo />
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Footer Content</footer>
    </div>
  );
};

export default Layout;
