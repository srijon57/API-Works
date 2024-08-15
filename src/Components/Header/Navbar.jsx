import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import menuIcon from '@iconify/icons-line-md/menu';
import menuToCloseTransitionIcon from '@iconify/icons-line-md/menu-to-close-transition';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Weather", href: "/weather" },
        { name: "AI chat", href: "/aichat" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav">
            <Link to="/" className="nav-logo">LOGO</Link>
            <div className="menu-icon" onClick={toggleMenu}>
                <Icon icon={isOpen ? menuToCloseTransitionIcon : menuIcon} style={{ color: '#fff', fontSize: '2rem' }} />
            </div>
            <ul className={`nav-ul ${isOpen ? 'open' : ''}`}>
                {navItems.map((item, idx) => (
                    <li key={idx} className="nav-item">
                        <Link to={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
