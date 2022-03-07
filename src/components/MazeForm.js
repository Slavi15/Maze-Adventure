import React, { useContext } from 'react';
import { AppContext } from './MazeComponent.js';
import { Formik, Form, useField } from 'formik';
import styles from '../styles/MazeForm.module.scss';

const TextInput = ({ label, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const [field, meta] = useField(props);
    return (
        <>
            <input className={styles.inputField} {...field} {...props} />
        </>
    );
};

const MazeForm = () => {
    const {state, dispatch} = useContext(AppContext);
    const changeInputValue = (newValue) => {
        dispatch({ 
            type: 'UPDATE_INPUT', 
            data: newValue 
        });
    };
    
    return (
        <Formik
            initialValues={{
                text: ''
            }}
            onSubmit={async (values) => {
                state.inputText = values.text;
                changeInputValue(values.text);
                // console.log(values);
            }}>
            {({ isSubmitting }) => (
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

                    <div id="error" className={styles.error}></div>
                </Form>
            )}
        </Formik>
    )
}

export default MazeForm;