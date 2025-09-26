import Link from "next/link";
import { useRouter } from "next/router";
import { Home, List, BarChart, User, ShoppingCart } from "lucide-react";

const nav = [
  { href: "/", icon: <Home size={24} /> },
  { href: "/tasks", icon: <List size={24} /> },
  { href: "/leaders", icon: <BarChart size={24} /> },
  { href: "/profile", icon: <User size={24} /> },
  { href: "/buy", icon: <ShoppingCart size={24} /> },
];

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <nav className="fixed bottom-0 w-full bg-[#141414] flex justify-around py-3 border-t border-neutral-800">
      {nav.map(({ href, icon }) => (
        <Link key={href} href={href}>
          <div className={`${pathname === href ? "text-purple-500" : "text-white"}`}>
            {icon}
          </div>
        </Link>
      ))}
    </nav>
  );
}
