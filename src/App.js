import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { db } from "./firebase";
import NotFound from "./components/NotFound";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import LoginButton from "./components/LoginButton";
// google auth
import firebase from "./firebase";
import { signInWithGoogle } from "./firebase";

// redux
import { SignIn } from "./App/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { render } from "sass";
import { Logout } from "@mui/icons-material";
function App() {
  const navigate = useNavigate();
  const [message, setmessge] = useState();
  const [user, setuser] = useState();
  const [googleUser, setGoogleUser] = useState(null);
  const dispatch = useDispatch();
  const googleReduxUser = useSelector((state) => state.User);
  const { userId } = useParams();
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
    db.collection("users").onSnapshot((snap) => {
      let users = [];
      snap.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setuser(users);
    });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((GoogleUseruser) => {
      if (GoogleUseruser) {
        const { displayName, email, photoURL } = GoogleUseruser;
        dispatch(SignIn({ name: displayName, email, photo: photoURL }));
        setGoogleUser(GoogleUseruser);
        const googleUser = {
          ...googleReduxUser,
        };
        console.log("Entetr loop");
        if (googleUser.email && user) {
          function check(arr, name) {
            const { length } = arr;
            const found = arr.some(val => val.email === name);
            const result = (found) ? true : false;
            return result;
          } // This function will return true or false if value matche

          if (!check(user, googleUser.email)) {         // if email abc@gmail.com will be in our database it will 
            console.log(`one record inserted : ${googleUser.email}`);
            db.collection("users").add(googleUser);
          } else {
            console.error("This email already exists");
          }
        }

      }
    });
    fetchMessage();
  }, [googleUser]);
  {
    return (
      <div className="App">
        {googleReduxUser.name ? (
          user ? (
            <Routes>
              <Route
                path="/"
                element={<Navigate to={`/user/${user[0].id}`} />}
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
