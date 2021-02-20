import React, { useState, useEffect,  Component } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';

import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

const Home = () => {

  const [passengers, setPassengers] = useState([]);
  const [limit, setLimit] =  useState(2);

  useEffect(() => {
    getUsers();
    return () => {
      console.log("cleanup use effect")
    }
  }, [limit]);

  const getUsers = async () => {
    try {
      let data = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        params: { _limit: limit}
      }).then(({data}) => data);
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