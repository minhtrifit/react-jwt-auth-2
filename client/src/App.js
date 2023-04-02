import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };

      const rs = await axios.post("http://localhost:5500/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (rs.data.message === "success") {
        // console.log(rs.data);

        // Set state
        setUser(rs.data.account);
        setAuth(true);

        // Reset input
        setUsername("");
        setPassword("");

        // Save token
        localStorage.setItem("token", rs.data.token);

        var time = new Date();
        time.setTime(time.getTime() + 60 * 1000); // 1 min

        document.cookie = `token=${rs.data.token};expires=${time}`;

        // Redirect event
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      const rs = await axios.post("http://localhost:5500/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (rs.data.message === "Log out successfully") {
        navigate("/");
        localStorage.removeItem("token");
        setAuth(false);
        setUser("");
        // console.log(rs.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    const checktoken = localStorage.getItem("token");
    if (checktoken !== null) {
      setToken(checktoken);
    }
  };

  const getVerify = async () => {
    try {
      const checkToken = localStorage.getItem("token");

      // var tempCookie = document.cookie;
      // const cookieList = tempCookie.split(";");
      // const check = cookieList.filter((item) => {
      //   return item.includes("token");
      // });
      // const checkCookie = check[0].split("=")[1];
      // console.log(checkCookie);

      if (checkToken !== null) {
        const data = {
          token: checkToken,
        };

        const rs = await axios.post("http://localhost:5500/verify", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log(rs.data.message);

        // If token === true
        if (rs.data.message === "Authorized") {
          // console.log(rs.data.user);
          setAuth(true);
          setUser(rs.data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVerify();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              auth={auth}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              auth={auth}
              user={user}
              handleLogOut={handleLogOut}
              token={token}
              getToken={getToken}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
