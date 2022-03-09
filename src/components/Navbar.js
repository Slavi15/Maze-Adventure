import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
    const navSlide = () => {
        const nav = document.getElementById('navLinks');
        if (window.innerWidth < 700) {
            nav.style.width = '275px';
        } else {
            nav.style.width = '325px';
        }
    };

    const closeNav = () => {
        const nav = document.getElementById('navLinks');
        nav.style.width = '0';
    };

    return (
        <div className={styles.navbar}>
            <Link className={styles.a} to="/">
                <div className={styles.logo}>[Място за лого]</div>
            </Link>
            <div>
                <FontAwesomeIcon onClick={navSlide} className={styles.icon} icon="bars" />
                <div className={styles.navLinks} id="navLinks">
                    <FontAwesomeIcon onClick={closeNav} className={styles.timesIcon} icon="times" />
                    <div className={styles.link}>Проект от Слави Резашки</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;