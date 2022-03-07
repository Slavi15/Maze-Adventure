import React, { useEffect, useState } from 'react';
import { Formik, Form, useField } from 'formik';
import styles from '../styles/Maze.module.scss';
import img from '../assets/arrows.png';
// let easystarjs = require('easystarjs');
// let easystar = new easystarjs.js();

const TextInput = ({ label, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const [field, meta] = useField(props);
    return (
        <>
            <input className={styles.inputField} id="inputForm" {...field} {...props} />
        </>
    );
};

const MazeTestInOne = () => {
    const [value, setValue] = useState('');
    const [results, setResults] = useState(0);

    let levels = [];
    levels[0] = {
        map: [
            [0, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [1, 1, 1, 0, 0, 0]
        ],
        player: {
            x: 0,
            y: 0
        },
        goal: {
            x: 5,
            y: 5
        },
        theme: 'default'
    };

    useEffect(() => {
        document.getElementById('overlay').style.display = 'block';
    }, []);

    useEffect(() => {
        // const pathButton = document.getElementById('pathButton');

        function Game(id, level) {
            this.el = document.getElementById(id);

            this.tileTypes = ['floor', 'wall'];
            this.tileDimensions = 75;

            this.map = level.map;
            this.theme = level.theme;

            this.player = { ...level.player };
            this.goal = { ...level.goal };

            this.player.el = null;

            this.active = true;
        };

        Game.prototype.checkActive = function () {
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 32) {
                    document.getElementById('overlay').style.display = 'none';
                    this.active = false;
                };
            });
        };

        Game.prototype.populateMap = function () {
            this.el.className = 'gameContainer ' + this.theme;

            let tiles = document.getElementById('tiles');

            for (let y = 0; y < this.map.length; ++y) {
                for (let x = 0; x < this.map[y].length; ++x) {
                    let tileCode = this.map[y][x];
                    let tileType = this.tileTypes[tileCode];

                    let tile = this.createElem(x, y, tileType);
                    tiles.appendChild(tile);
                }
            }
        };

        Game.prototype.createElem = function (x, y, type) {
            let elem = document.createElement('div');
            elem.className = type;

            elem.style.width = this.tileDimensions + 'px';
            elem.style.height = this.tileDimensions + 'px';

            elem.style.left = (x * this.tileDimensions) + 'px';
            elem.style.top = (y * this.tileDimensions) + 'px';

            return elem;
        };

        Game.prototype.sizeUp = function () {
            let map = this.el.querySelector('#gameMap');

            map.style.height = (this.map.length * this.tileDimensions) + 'px';
            map.style.height = (this.map[0].length * this.tileDimensions) + 'px';
        };

        Game.prototype.placeSprite = function (type) {
            let x = this[type].x;
            let y = this[type].y;

            let sprite = this.createElem(x, y, type);
            sprite.id = type;

            sprite.style.borderRadius = this.tileDimensions + 'px';
            if (sprite.id === 'player') {
                sprite.innerHTML = sessionStorage.getItem('emoji');
                sprite.style.fontSize = '52.5px';
            }

            let layer = this.el.querySelector('#sprites');
            layer.appendChild(sprite);

            return sprite;
        };

        Game.prototype.updateVertical = function () {
            this.player.el.style.top = (this.player.y * this.tileDimensions) + 'px';
        };

        Game.prototype.updateHorizontal = function () {
            this.player.el.style.left = (this.player.x * this.tileDimensions) + 'px';
        };

        Game.prototype.moveUp = function () {
            if (this.player.y === 0) {
                return;
            };

            let nextTile = this.map[this.player.y - 1][this.player.x];
            if (nextTile === 1) {
                return;
            };

            this.player.y -= 1;
            this.updateVertical();
        };

        Game.prototype.moveRight = function () {
            if (this.player.x === this.map[this.player.y].length - 1) {
                return;
            };

            let nextTile = this.map[this.player.y][this.player.x + 1];

            if (nextTile === 1) {
                return;
            };

            this.player.x += 1;
            this.updateHorizontal();
        };

        Game.prototype.moveDown = function () {
            if (this.player.y === this.map.length - 1) {
                return;
            };

            let nextTile = this.map[this.player.y + 1][this.player.x];
            if (nextTile === 1) {
                return;
            }

            this.player.y += 1;
            this.updateVertical();
        };

        Game.prototype.moveLeft = function () {
            if (this.player.x === 0) {
                return;
            };

            let nextTile = this.map[this.player.y][this.player.x - 1];
            if (nextTile === 1) {
                return;
            };

            this.player.x -= 1;
            this.updateHorizontal();
        };

        Game.prototype.movePlayer = function (event) {
            event.preventDefault();

            if (event.keyCode === 37) {
                this.moveLeft();
            } else if (event.keyCode === 38) {
                this.moveUp();
            } else if (event.keyCode === 39) {
                this.moveRight();
            } else if (event.keyCode === 40) {
                this.moveDown();
            }
        };

        Game.prototype.generateTask = function () {
            if (value === results) {
                console.log('Correct!');
            }

            const numberOne = document.getElementById('numberOne');
            const numberTwo = document.getElementById('numberTwo');

            let randomNumberOne = Math.floor(Math.random() * 10) + 1;
            let randomNumberTwo = Math.floor(Math.random() * 10) + 1;

            numberOne.innerHTML = `${randomNumberOne}`;
            numberTwo.innerHTML = `${randomNumberTwo}`;

            let result = `${randomNumberOne * randomNumberTwo}`;
            setResults(result);
        };

        Game.prototype.keyboardListener = function () {
            document.addEventListener('keydown', (event) => {
                if (this.active === false && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
                    this.movePlayer(event);
                };
                this.checkGoal();
            });
        };

        Game.prototype.checkGoal = function () {
            if (this.player.x === this.goal.x && this.player.y === this.goal.y) {
                console.log('Good Job!');
                sessionStorage.clear();
                window.location.href = 'http://localhost:3000/heroes';
            };
        };

        // Game.prototype.mazePath = function () {
        //     easystar.setGrid(this.map);
        //     easystar.setAcceptableTiles([0]);
        //     easystar.findPath(0, 0, 5, 5, function (path) {
        //         console.log(path);
        //     });
        //     easystar.setIterationsPerCalculation(1000);
        //     easystar.calculate();
        // };

        let mazeGame = new Game('gameContainer', levels[0]);
        mazeGame.populateMap();
        mazeGame.sizeUp();
        let playerSprite = mazeGame.placeSprite('player');
        mazeGame.player.el = playerSprite;
        mazeGame.placeSprite('goal');
        // mazeGame.mazePath();
        mazeGame.keyboardListener();
        mazeGame.generateTask();
        mazeGame.checkActive();

        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Formik
            initialValues={{
                text: ''
            }}
            onSubmit={async (values) => {
                setValue(values.text);
                console.log(values);
            }}>
            {({ isSubmitting }) => (
                <>
                    <div className={styles.container}>
                        <div className={styles.innerContainer}>
                            <div id="gameContainer" className="gameContainer">
                                <div id="mapControls" className={styles.mapControls}>
                                    <div id="gameMap" className={styles.gameMap}>
                                        <div id="tiles" className={styles.tilesLayer}></div>
                                        <div id="sprites" className={styles.spritesLayer}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Form className={styles.mathsContainer}>
                            <div className={styles.exercises}>Задачи за решаване</div>

                            <div className={styles.mathsTasks}>
                                <div className={styles.box}>
                                    <div id="numberOne" className={styles.numberOne}></div>
                                </div>
                                <div>x</div>
                                <div className={styles.box}>
                                    <div id="numberTwo" className={styles.numberTwo}></div>
                                </div>
                                <div>=</div>
                                <TextInput
                                    name="text"
                                    type="text" />
                            </div>

                            <button type='submit'
                                disabled={isSubmitting}
                                className={styles.button}
                                id="formButton">
                                Провери!
                            </button>
                        </Form>
                    </div>
                    <div id="overlay" className={styles.overlay}>
                        <div className={styles.mainMessage}>{`Реши вярно всички задачи и преведи героя на име ${sessionStorage.getItem('name')} по пътя до света на забавленията, който го очаква от другата страна`}</div>
                        <div className={styles.buttonsText}>Героят се управлява с тези бутони</div>
                        <img className={styles.keyButtons} src={img} alt="keyboard buttons" />
                        <div className={styles.text}>Натисни SPACE, за да продължиш</div>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default MazeTestInOne;