import React, { useReducer } from 'react';
import GameComponent from './GameComponent.js';
import MazeForm from './MazeForm.js';
import styles from '../styles/Maze.module.scss';

export const AppContext = React.createContext();

const initialState = {
    inputText: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return {
                inputText: action.data
            };
        default:
            return initialState;
    }
}

const MazeComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            <div className={styles.container}>
                <AppContext.Provider value={{ state, dispatch }}>
                    <GameComponent />
                    <MazeForm />
                </AppContext.Provider>
            </div>
            <div id="overlay" className={styles.overlay}>
                <div className={styles.mainMessage}>{`Реши вярно всички задачи и преведи героя на име ${sessionStorage.getItem('name')} по пътя до света на забавленията, който го очаква от другата страна`}</div>
                <div className={styles.text}>Натиснете SPACE или кликнете някъде по екрана</div>
            </div>
        </div>
    )
}

export default MazeComponent;