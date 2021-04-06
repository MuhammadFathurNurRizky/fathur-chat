import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/login.module.scss';
import { auth, provider } from '../firebase';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <React.Fragment>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/chat.png" />
            </Head>
            <h3 className={styles.warninglogin}>Mohon maaf anda belum login mohon untuk login terlebih dahulu</h3>
            <div className={styles.container}>
                <h1 className={styles.loginword}>Login</h1>
                <Image src="/chat.png" alt="login-chat" width={100} height={100} /> <br />
                <button onClick={signIn} className={styles.loginbutton}><Image src="/google.png" alt="Google" width={18} height={18} /> Login Dengan Google</button>
            </div>
        </React.Fragment>
    );
};

export default Login;