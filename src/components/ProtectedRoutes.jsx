import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../Config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ component }) => {
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
               
                setLoading(false)
            } else {
                navigate('/')
            }
        });

    }, [])

   
    const navigate = useNavigate()
    return (
        loading ? <h1>Loading...</h1> :  component
    )
}

export default ProtectedRoutes