import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import styles from '../styles/message.module.scss';
import moment from 'moment';

function Message({ user, message }) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? <div className={styles.text}>{message.message}</div> : <div className={styles.textreciever}>{message.message}</div>

    return (
        <React.Fragment>
            <div className={styles.wrap}>
                {TypeOfMessage}
                <span className={styles.time}>{message.timestamp ? moment(message.timestamp).format("dddd-MMMM-YYYY, HH:mm") : "..."} WIB</span>
            </div>
        </React.Fragment>
    );
};

export default Message;