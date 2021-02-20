import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export const getStaticProps = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
      props: { passengers: data }
  }

}

const Home = ({ passengers }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>PassengerApp | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Our Passengers</a> 
        </h1>
        <hr/>

        {passengers.map(passenger => (
          <Link href={ '/passenger/' + passenger.id } key={ passenger.id }>
            <a className={ styles.single }>
              <h3>{ passenger.name }</h3>
            </a>
          </Link>
        ))}


      </main>

    </div>
  );
}

export default Home;