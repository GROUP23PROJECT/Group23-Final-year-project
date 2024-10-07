import { createContext, useContext, useEffect, useState } from "react"

import { getAuth, createUserWithEmailAndPassword, 
    onAuthStateChanged, signOut, signInWithEmailAndPassword, 
    sendEmailVerification } from "firebase/auth";


import { useNavigate } from 'react-router-dom';


import { auth } from "../config/FirebaseConfig";





const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)


    function createUser(email, password) {
        
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // console.log(user)
            navigate("/")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert("Check your email and password")
            // ..
          });
        
    }

    

    function login(email, password) {
        
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate("/")
            // console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert("Invalid Email or Password")
            // ..
          });
        
    }



    function logout() {
        signOut(auth)
        navigate("/register")
    }

    useEffect(() => {
      
        onAuthStateChanged(auth, (user) => {
            
                setCurrentUser(user)
                setLoading(false)
          });
    
      return 
    }, [])

    
    // function sendVerificationEmail () {
    //     sendEmailVerification(currentUser)
    //     .then(() => {
    //         // Email verification sent!
    //         let msg = 'An email verification link has been sent to ' + currentUser.email;
    //         document.querySelector('.success').innerHTML=msg;
    //       }).catch(error => console.log(`Message ${error}`) );
    // }


    
    const value ={
        currentUser,
        createUser,
        login,
        // sendVerificationEmail,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {/* { children} */}
        </AuthContext.Provider>
    )
}

