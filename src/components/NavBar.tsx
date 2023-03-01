"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const disabled = pathname === "/";
  return (
    <div className="bg-purple-500">
      <div className="flex justify-between container mx-auto py-5 items-center">
        <div>
          <Link
            href="/"
            className="shadow py-2 px-4 bg-white/10 rounded-md text-white"
          >
            Moralis Web3 {pathname}
          </Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-5 uppercase text-white">
            {navLinks.map(({ name, href }) => (
              <Link href={href} key={name}>
                <li
                  className={clsx(
                    "py-2 px-4",
                    pathname === href && "bg-white/10 rounded-md"
                  )}
                >
                  {name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
