import React from 'react';
import styles from '../styles/main.module.scss';
import * as EmailValidator from 'email-validator';
import { auth, db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from '../components/Chat';

function MainChat() {
    const [user] = useAuthState(auth);
    const userChatReference = db.collection("chats").where("users", "array-contains", user.email);
    const [chatSnapshot] = useCollection(userChatReference);  

    // Create chat when button clicked
    const createChat = () => {
        const input = prompt("Mohon Tuliskan Alamat Email Teman Anda Yang Ingin Anda Ajak Chating");

        if (!input) {
            return null;
        };
        
        if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
            // We need to add the chat into the database "chats" collection if it's doesn't already exist and it's valid
            db.collection("chats").add({ 
                users: [user.email, input],
            });
        };
    };
    
    const chatAlreadyExist = (recipientEmail) => 
        !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0);

    return (
        <React.Fragment>
            <div className={styles.sidebar}>
                <div className={styles.headerside}>
                    <div className={styles.headerimg}>
                        <img onClick={() => auth.signOut()} className={styles.img} src={user.photoURL} alt="profile" />
                        <h3>Tekan profile anda disamping untuk logout</h3>
                    </div>
                </div>
                <div className={styles.sidebarinput}>
                    <div className={styles.inputdiv}>
                        <input className={styles.input} type="text" placeholder="Cari Kontak" />
                    </div>
                </div>
                <div className={styles.buttonsidebar}>
                    <button onClick={createChat} className={styles.button}>Tekan untuk tambah teman</button>
                </div>
                {/* Daftar Chat Profile */}
                <h1 className={styles.teman}>Teman Anda</h1>
                {chatSnapshot?.docs.map(chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div>
        </React.Fragment>
    );
};

export default MainChat;