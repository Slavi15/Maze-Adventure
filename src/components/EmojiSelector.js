import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import styles from '../styles/EmojiSelector.module.scss';

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input className={styles.input} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

const EmojiSelector = () => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Героят няма име!')
            })}
            onSubmit={async (values) => {
                sessionStorage.setItem('name', values.name);
                sessionStorage.setItem('emoji', chosenEmoji.emoji);
                // console.log(values);
            }}>
                {({ isSubmitting }) => (
                    <Form className={styles.container}>
                        <TextInput 
                            name="name"
                            type="text"
                            placeholder="Въведи име" />

                        {chosenEmoji ? (
                            <span className={styles.emojiText}>Твоят герой: {chosenEmoji.emoji}</span>
                        ) : (
                            <span className={styles.emojiText}>Избери герой!</span>
                        )}

                        <Picker onEmojiClick={onEmojiClick}
                            native={true}
                            skinTone={SKIN_TONE_NEUTRAL}
                            disableSearchBar={true}
                            className={styles.emojiPicker}
                            groupVisibility={{
                                recently_used: false,
                                symbols: false,
                                flags: false,
                                food_drink: false,
                                travel_places: false,
                                activities: false,
                                objects: false
                            }}
                            groupNames={{
                                smileys_people: 'Човечета и емотикони',
                                animals_nature: 'Животни и природа'
                            }} />

                        
                        <button type='submit'
                            disabled={isSubmitting} 
                            className={styles.button}
                            onClick={() => { window.location.href = "http://localhost:3000/game" }}>
                                Започни игра!
                        </button>
                    </Form>    
                )}
        </Formik>
    )
}

export default EmojiSelector