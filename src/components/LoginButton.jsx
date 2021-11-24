import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import { SignIn } from "../App/Actions/userAction";
import { useDispatch } from "react-redux";
function LoginButton() {
  // window.location.reload(true);
  // window.location.reload();

  useEffect(() => {


    // return () => {
    //   document.body.classList.remove = "login_body";
    // };
  }, []);
  const dispatch = useDispatch();
  const SignInWithGoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
      const { displayName, email, photoURL } = result.user;
      dispatch(SignIn({ name: displayName, email, photo: photoURL }));
    });
  };
  return (
    <div className="LoginButton">
      <div className="g-sign-in-button" onClick={() => SignInWithGoogle()}>
        <div className="content-wrapper">
          <div className="logo-wrapper">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
            />
          </div>
          <span className="text-container">
            <span>Sign in with Google</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginButton;
