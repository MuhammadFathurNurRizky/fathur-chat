import React from 'react';
import Image from 'next/image';
import styles from '../styles/loading.module.scss';
import Head from 'next/head';

function Loading() {
    return (
        <React.Fragment>
            <Head>
                <title>Loading....</title>
                <link rel="icon" href="/chat.png" />
            </Head>
            <div className={styles.loadingcontainer}>
                <Image src="/chat.png" alt="loading" width={150} height={150} />
                <h1 className={styles.loading}>Loading.....</h1>
            </div>
        </React.Fragment>
    );
};

export default Loading;