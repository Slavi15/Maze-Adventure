import ConfettiExplosion from 'react-confetti-explosion';
import styles from '../styles/Finish.module.scss';
import img from '../assets/park.jpg';

const FinishScreen = () => {
    function handleClick() {
        sessionStorage.clear();
        window.location.href = 'https://slavi15.github.io/Maze-Adventurer/heroes';
    };

    return (
        <div className={styles.finishContainer}>
            {window.innerWidth <= 600 ?
                <>
                    <ConfettiExplosion
                        particleCount={100}
                        particleSize={10}
                        duration={3000}
                        colors={[
                            '#fdffb6',
                            '#ffd6a5',
                            '#ffadad',
                            '#caffbf',
                            '#9bf6ff',
                            '#a0c4ff',
                            '#ffc6ff'
                        ]}
                        floorHeight={850}
                        floorWidth={250}
                        className={styles.confetti} />
                </> :
                <>
                    <ConfettiExplosion
                        particleCount={100}
                        particleSize={10}
                        duration={3000}
                        colors={[
                            '#fdffb6',
                            '#ffd6a5',
                            '#ffadad',
                            '#caffbf',
                            '#9bf6ff',
                            '#a0c4ff',
                            '#ffc6ff'
                        ]}
                        floorHeight={1500}
                        floorWidth={700}
                        className={styles.confetti} />
                </>
            }
            <img className={styles.img} src={img} alt="amusement park" />
            <div className={styles.text}>Поздравления!<br />Твоят герой {sessionStorage.getItem('emoji')} на име {sessionStorage.getItem('name')} стигна до увеселителния парк!</div>
            <button className={styles.button} onClick={handleClick}>Започни нова игра!</button>
        </div>
    )
}

export default FinishScreen;