import React from 'react';
import Image from 'next/image';
import styles from '../styles/loading.module.scss';

function Loading() {
    return (
        <React.Fragment>
            <div className={styles.loadingcontainer}>
                <Image src="/chat.png" alt="loading" width={150} height={150} />
                <h1 className={styles.loading}>Loading.....</h1>
            </div>
        </React.Fragment>
    );
};

export default Loading;