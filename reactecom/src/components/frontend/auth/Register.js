import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    error_list: [],
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password, password_confirmation } = state;

  const handleInputChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await axios.get("/sanctum/csrf-cookie").then(async (response) => {
        await axios.post(`/api/register`, state).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("token", res.data.token);
            navigate("/login");
          } else {
            setState({ ...state, error_list: res.data.validation_errors });
          }
        });
      });
      // console.log(status);
      // history.push('/');
    } catch (error) {
      console.log(error);
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
                <h4 className="text-center">Register</h4>
              </div>
              <div className="card-body">
                <div className="Signup">
                  <form>
                    <div className="form-group">
                      <label>User Name</label>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={name}
                        name="name"
                        className="form-control"
                      />
                      <span>{state.error_list.name}</span>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <span>{state.error_list.email}</span>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="text"
                        value={password}
                        name="password"
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <span>{state.error_list.password}</span>
                    <div className="form-group">
                      <label>Password-Confirm</label>
                      <input
                        type="text"
                        value={password_confirmation}
                        name="password_confirmation"
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <span>{state.error_list.password}</span>
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleSignup}
                      className="btn btn-primary"
                    >
                      {loading ? "LOADING..." : "Signup"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
