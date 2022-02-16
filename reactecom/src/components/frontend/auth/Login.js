import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { email, password } = state;

  const handleInput = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.get("/sanctum/csrf-cookie").then(async (response) => {
        await axios.post(`api/login`, state).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("token", res.data.token);
            if (res.data.role === "admin") {
              return navigate("/admin/dashboard");
            } else {
              return navigate("/");
            }
          } else if (res.data.status === 401) {
            alert("Invalid Credentials");
          } else {
            setState({ ...state, error_list: res.data.validation_errors });
          }
        });
      });
      // console.log(status);
      // history.push('/');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border border-primary border-4">
            <div className="card">
              <div className="=card-header">
                <h4 className="text-center">Login</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleInput}
                    />
                    <span>{state.error_list.email}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleInput}
                    />
                    <span>{state.error_list.password}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="btn btn-primary"
                  >
                    {loading ? "LOADING..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
