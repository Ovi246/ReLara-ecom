import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    error_list: [],
  });
  const {
    firstname,
    lastname,
    phonenumber,
    email,
    address,
    city,
    state,
    zipcode,
  } = data;
  var totalCartPrice = 0;
  useEffect(() => {
    axios.get(`api/cart`).then((res) => {
      if (res.data.status === 200) {
        setCart(res.data.cart);
        setLoading(false);
      } else if (res.data.status === 401) {
        Swal.fire({
          title: "Unauthorized",
          text: res.data.message,
          icon: "error",
        });
        navigate("/login");
      }
    });

    return () => {};
  }, [navigate]);

  const handleInput = (e) => {
    e.persist();
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/place-order`, data).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        navigate("thankyou");
      } else if (res.data.status === 422) {
        setData({ ...data, error_list: res.data.validation_errors });
      }
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              <h4>Basic Information</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      onChange={handleInput}
                      value={firstname}
                    />
                    <small className="text-danger">
                      {data?.error_list?.firstname}
                    </small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      onChange={handleInput}
                      value={lastname}
                    />
                    <small className="text-danger">
                      {data?.error_list?.lastname}
                    </small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phonenumber"
                      className="form-control"
                      onChange={handleInput}
                      value={phonenumber}
                    />
                    <small className="text-danger">
                      {data?.error_list?.phonenumber}
                    </small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      onChange={handleInput}
                      value={email}
                    />
                    <small className="text-danger">
                      {data?.error_list?.email}
                    </small>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label>Full Address</label>
                    <textarea
                      type="text"
                      name="address"
                      className="form-control"
                      onChange={handleInput}
                      value={address}
                    />
                    <small className="text-danger">
                      {data?.error_list?.address}
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      onChange={handleInput}
                      value={city}
                    />
                    <small className="text-danger">
                      {data?.error_list?.city}
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      onChange={handleInput}
                      value={state}
                    />
                    <small className="text-danger">
                      {data?.error_list?.state}
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipcode"
                      className="form-control"
                      onChange={handleInput}
                      value={zipcode}
                    />
                    <small className="text-danger">
                      {data?.error_list?.zipcode}
                    </small>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="50%">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.product.selling_price * item.quantity;
                return (
                  <tr key={idx}>
                    <td>{item.product.name}</td>
                    <td>{item.product.selling_price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.selling_price * item.quantity}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2" className="text-right font-weight-bold">
                  Grand Total
                </td>
                <td colSpan="2" className="text-right font-weight-bold">
                  {totalCartPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>You Need to Purchase Anything Before Checkout!</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
    </div>
  );
};

export default Checkout;
