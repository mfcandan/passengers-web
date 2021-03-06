import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';

import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToggle } from 'reactstrap';
import EditModal from '../../Components/EditModal.js'
import ErrorModal from '../../Components/ErrorModal.js'
import { render } from 'react-dom';

const editIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>;

export const getStaticPaths = async () => {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger`);   
    const data = await res.data.data;
    console.log(data);
    const paths = data.map(passenger => {
        console.log("hello");
        return{
            params: { id: passenger._id.toString() }
        }
    })

    return{
        paths,
        fallback: false, 
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await axios.get(`https://api.instantwebtools.net/v1/passenger/`+ id).then(({ data }) => data);
    console.log(id)
    return {
        props: { passenger: data }
    }
}

const Details = ({ passenger }) => {
    console.log(passenger);
    const [value, setValue] = useState('');   
    const [modal, setModal] = useState(false);
    const [errorText, setErrorText] = useState('This name using from another user. Please try a different name');

    const patchUserName = async (newName) =>{
        try {
            axios.patch(`https://api.instantwebtools.net/v1/passenger/`+passenger._id,
            {
                "name": newName
            });
        } catch (error) {
            console.log(error);
            setErrorText(error);
            setModal(true);
        } 
    }

    const onChangeValueHandler = (val) => {
        setValue(val.target.value)
    }

    const onSubmitHandler = () => {
        if(value===''){    
            setErrorText("This box can not be empty");
            setModal(true);
        }else{
            patchUserName(value);
        }
    }

    return ( 
        <div>
            <Head>
                <title>PassengerApp | Details</title>
                <meta name="keywords" content="passengers" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Passenger Details:</h1><hr/>
                <div className={styles.passengerDatas}>
                    <div className={styles.inlineItem}>
                        <h5 className={styles.passengerName}> {passenger.name} </h5>
                        <EditModal value={value} onChangeValue={onChangeValueHandler} onSubmitValue={onSubmitHandler} currentName={passenger.name} buttonLabel={editIcon} />                      
                    </div>
                    <br/>
                    <p>Total Trip Counts: {passenger.trips} </p>
                    <Link href={'/'}>
                        <a className={styles.goback}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                            <span>Back to Home</span> 
                        </a>
                    </Link>
                </div>
                <ErrorModal errorMessage={errorText} show={modal}/>
            </main>   
        </div>
     );
}
 
export default Details;