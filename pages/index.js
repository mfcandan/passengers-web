import React, { useState, useEffect,  Component } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';

import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
  headers: {
    'X-auth-key': "token123"
  }
})

export const getStaticProps = async () => {
  const data = await api.get('/', {
    params: {
      _limit: 5,
      _start: 0
    }
  }).then(({ data }) => data);

  return {
      props: { pasData: data }
  }
}

const Home = ({ pasData }) => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    getUsers();
    return () => {
      console.log("cleanup useeffect")
    }
  }, []);

  const getUsers = async () => {
    try {
      let data = pasData;
      setPassengers(data);
    } catch (error) {
      console.log(error);
    }    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>PassengerApp | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Our Passengers</h1><hr/>

        {passengers.map(passenger => (
          <Link href={ '/passenger/' + passenger.id } key={ passenger.id }>
            <a className={ styles.single }>
              <h3>{ passenger.name }</h3>
            </a>
          </Link>
        ))} 
        <Button color="primary" onClick={() => setLimit(limit+2)}>Show More</Button>

      </main>
    </div>
  );
}

export default Home;