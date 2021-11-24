import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { db } from "./firebase";
import NotFound from "./components/NotFound";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginButton from "./components/LoginButton";
// google auth
import firebase from "./firebase";

// redux
import { SignIn } from "./App/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
function App() {
  
  const [message, setmessge] = useState();
  const [user, setuser] = useState();
  const [googleUser, setGoogleUser] = useState(null);
  const [urlId,setUrlId] = useState(null)
  const dispatch = useDispatch();
  const googleReduxUser = useSelector((state) => state.User);
  const fetchMessage = () => {
    db.collection("messages")
      .orderBy("date_time")
      .onSnapshot((snap) => {
        let messages = [];
        snap.docs.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setmessge(messages);
      });
    db.collection("users").orderBy("time").onSnapshot((snap) => {
      let users = [];
      snap.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setuser(users);
    });
  };
  useEffect(() => {
    fetchMessage();
    firebase.auth().onAuthStateChanged((GoogleUseruser) => {
      if (GoogleUseruser) {
        const { displayName, email, photoURL } = GoogleUseruser;
        dispatch(SignIn({ name: displayName, email, photo: photoURL }));
        setGoogleUser(GoogleUseruser);
        const googleUser = {
          ...googleReduxUser,
          time: new Date().valueOf()
        };
        if (googleUser?.email && user) {
          if (user.filter(u => u.email === googleUser.email).length === 0) {
            console.log('Enter into the DB');
            db.collection("users").add(googleUser);
          }
          else {
            console.log(googleUser)
          }
        }
        if(user){
          const CurrentUser = firebase.auth().currentUser;
            const checkUserUrl = user.find((el)=>{
                return el.email === email
            })
            setUrlId(checkUserUrl.id)
          }
        }
        
    });
  }, [googleUser,urlId]);
  
  {
    return (
      <div className="App">
        {googleReduxUser.name ? (
          user && urlId ? (
            <Routes>
              <Route
                path="/"
                element={<Navigate to={`/user/${urlId}`} />}
              />
              <Route
                path="/user/:userId"
                element={
                  <Layout>
                    {user && <Aside message={message} user={user} />}
                    {user && <Main messagesMain={message} />}
                  </Layout>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<div>Loading...</div>} />
            </Routes>
          )
        ) : (
          <Routes>
            <Route path="/user/:userId" element={<Navigate to={`/`} />} />
            <Route path="/" element={<LoginButton />}></Route>
          </Routes>
        )}
      </div>
    );
  }
}

export default App;