import React from 'react';
import styles from '../styles/sidebar.module.scss';
import { auth, db } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from '../components/Chat';
import { useRouter } from 'next/router';

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatReference = db.collection("chats").where("users", "array-contains", user.email);
    const [chatSnapshot] = useCollection(userChatReference);
    const router = useRouter();

    const backhome = () => {
        router.push("/");
    }

    return (
        <React.Fragment>
            <div className={styles.sidebar}>
                <div className={styles.headerside}>
                    <div className={styles.headerimg}>
                        <img onClick={() => auth.signOut()} className={styles.img} src={user.photoURL} alt="profile" />
                        <p>Tekan avatar anda untuk logout</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.burger} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                </div>
                <div className={styles.backhome}>
                    <button onClick={backhome} className={styles.backbutton}>Kembali ke halaman utama</button>
                </div>
                {/* Daftar Chat Profile */}
                {chatSnapshot?.docs.map(chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Sidebar;