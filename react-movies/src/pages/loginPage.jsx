import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const formStyle = {
    maxWidth: "360px",
    margin: "70px auto",
    padding: "25px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
  };

  const inputStyle = {
    width: "90%",
    marginBottom: "10px",
    padding: "8px",
  };

  const login = () => {
    context.authenticate(userName, password);
  };

  const location = useLocation();
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  return (
    <div style={formStyle}>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      <input id="username" style={inputStyle} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input id="password" style={inputStyle} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <button onClick={login}>Log in</button>
      <p>Not Registered?
        <Link to="/signup">Sign Up!</Link></p>
    </div>
  );
};

export default LoginPage;
