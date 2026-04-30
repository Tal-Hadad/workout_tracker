"use client";

import styles from "@/app/components/footer/Footer.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/profile", icon: "account_circle" },
  { href: "/", icon: "add_2" },
  { href: "/exercises", icon: "exercise" },
  { href: "/history", icon: "history" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <nav className={styles.footer}>
      <ul className={styles.footerList}>
        {navItems.map(({ href, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.link}${pathname === href ? ` ${styles.active}` : ""}`}
              as="icon"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
