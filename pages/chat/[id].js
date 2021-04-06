import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/index.module.scss';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import Message from '../../components/Message';
import TimeAgo from 'timeago-react';

export async function getServerSideProps(context) {
    const reference = db.collection("chats").doc(context.query.id);

    // Prep The messages on the server
    const messagesResponse = await reference.collection("messages").orderBy("timestamp", 'asc').get();

    const messages = messagesResponse.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    // Preps the chats
    const chatResponse = await reference.get();
    const chat = {
        id: chatResponse.id,
        ...chatResponse.data()
    };

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    };
};

function Chat({ chat, messages }) {    
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));

    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message key={message.id} user={message.data().user} message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }} />
            ));
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ));
        }
    };

    const ScrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        
        // Update the last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        ScrollToBottom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <React.Fragment>
            <Head>
                <title>{getRecipientEmail(chat.users, user)}</title>
                <link rel="icon" href="/chat.png" />
            </Head>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.chatcontainer}>
                    <div className={styles.headerchat}>
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
                        {recipientEmail ? (
                        <div className={styles.time}>
                            <p className={styles.messagetime}>Telah Aktif: {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : "Tidak Diketahui"}</p>
                        </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className={styles.chat}>
                        <div className={styles.chatperson} ref={endOfMessagesRef}>
                            <div className={styles.realchat}>{showMessages()}</div>
                        </div>
                    </div>
                    <div className={styles.containerinput}>
                        <input value={input} onChange={e => setInput(e.target.value)} className={styles.input} type="text" placeholder="Ketikan Pesan Anda" />
                        <button className={styles.buttonmessage}type="submit" onClick={sendMessage}>KIRIM</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;