import { Link } from 'react-router-dom';
import styles from '../styles/Landing.module.scss';

const Landing = () => {
    return (
        <div className={styles.container}>
            <section className={styles.textContent}>
                <div className={styles.text}>Умножавай вярно и открий пътя към увеселителния парк!</div>
                <Link to="/heroes">
                    <button className={styles.button}>Избери герой!</button>
                </Link>
            </section>
        </div>
    )
}

export default Landing;