import React, { useState, useEffect,  Component } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

const Home = () => {
  const [passengers, setPassengers] = useState([]);
  const [pageId, setPageId] = useState(1);

  useEffect(() => {
    getStaticProps();
    return () => {
      console.log("cleanup useeffect")
    }
  }, []);

  const getStaticProps = async () => {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=0&size=10`);
    setPassengers(res.data.data);
  }

  const getUserWithPage = async () =>{
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageId}&size=10`);
    setPassengers(passengers =>[
      ...passengers,...res.data.data
    ]);
    setPageId(pageId+1)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>PassengerApp | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Our Passengers</h1><hr/>

        {passengers.map((passobj) => (
          <Link href={ '/passenger/' + passobj._id } key={ passobj._id }>
            <a className={ styles.single }>
              <h3 key={passobj._id}>{ passobj.name }</h3>
            </a>
          </Link>
        ))} 

        <Button color="primary" onClick={ () => getUserWithPage() }>Show More</Button>
      </main>
    </div>
  );
}

export default Home;