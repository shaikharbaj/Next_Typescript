import React from 'react'
import Loader from '../Loader/Loader'
import styles from './loading.module.css'
const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <Loader/>
        </div>
    )
}

export default Loading