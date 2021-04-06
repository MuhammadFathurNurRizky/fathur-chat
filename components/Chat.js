import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import styles from '../styles/chat.module.scss';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useRouter } from 'next/router';

function Chat({ id, users }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user)));

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    return (
        <React.Fragment>
            <div onClick={enterChat} className={styles.wrapkontak}>
                <div className={styles.kontak}>
                    {recipient ? (
                        <img className={styles.imgauthkontak} src={recipient?.photoURL} alt="profile" />
                    ) : (
                        <img className={styles.imgkontak} src="/avatar.png" alt="profile" />
                    )}
                </div>
                <div className={styles.profile}>
                    <h3 className={styles.profilename}>{recipientEmail}</h3>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;