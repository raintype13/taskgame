import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Добавлен элемент для "Buy Points", но без отдельной страницы в навигации.
// В дизайне он находится в профиле, поэтому в навигации его нет.
// Если нужно, чтобы он был в навигации, можно просто раскомментировать.
const navItems = [
  { href: '/', icon: '/home.png', alt: 'Home' },
  { href: '/tasks', icon: '/tasks.png', alt: 'Tasks' },
  { href: '/leaders', icon: '/leaders.png', alt: 'Leaders' },
  { href: '/profile', icon: '/profile.png', alt: 'Profile' },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      {navItems.map(item => (
        <Link href={item.href} key={item.href} legacyBehavior>
          <a className={router.pathname === item.href ? 'nav-active' : ''}>
            <Image src={item.icon} alt={item.alt} width={32} height={32} />
          </a>
        </Link>
      ))}
    </nav>
  );
}