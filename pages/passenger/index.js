import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'


const Ninjas = ({ ninjas }) => {
    return ( 
        <>
            <Head>
                <title>PassengerApp | Details</title>
                <meta name="keywords" content="ninjas" />
            </Head>
            <main className={styles.main}>
                <div>
                    <h1 className={styles.title}>Passenger Details:</h1>
                </div>
                <hr/>


            </main>
            <footer>
                <Link href={'/'}>
                    <a className={styles.goback}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                        <span>Back</span> 
                    </a>
                </Link>
            </footer>
        </>
    );
}
 
export default Ninjas;