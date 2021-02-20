import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    const paths = data.map(passenger => {
        return{
            params: { id: passenger.id.toString() }
        }
    })

    return{
        paths,
        fallback: false, 
    }

}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    const data = await res.json();

    return {
        props: { passenger: data }
    }
} 

const Details = ({ passenger }) => {
    return ( 
        <div>
            <Head>
                <title>PassengerApp | Details</title>
                <meta name="keywords" content="passengers" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Passenger Details:</h1>
                <hr/>
                <div>
                    <br/><br/><br/>
                    <h2> {passenger.name} </h2>
                    <p> {passenger.email} </p>
                    <p> {passenger.phone} </p>
                    <p> {passenger.website} </p>
                    <p> {passenger.address.city} </p>
                </div>
            </main>
            <footer>
                <Link href={'/'}>
                    <a className={styles.goback}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                        <span>Back</span> 
                    </a>
                </Link>
            </footer>
        </div>

        
     );
}
 
export default Details;