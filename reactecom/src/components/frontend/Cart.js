import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
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

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios.put(`api/cart-updateQuantity/${cart_id}/${scope}`).then((res) => {});
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";

    axios.delete(`api/delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          title: "Item Deleted",
          text: res.data.message,
          icon: "success",
        });
        thisClicked.closest("tr").remove();
        totalCartPrice = 0;
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Item Not Found",
          text: res.data.message,
          icon: "error",
        });
        thisClicked.innerText = "Remove";
      }
    });
  };

  if (loading) {
    return (
      <div class="d-flex justify-content-center mt-3">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.product.selling_price * item.quantity;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`http://localhost:8000/${item.product.image}`}
                        alt={item.product.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price}
                    </td>
                    <td width="15%">
                      <div className="input-group">
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price * item.quantity}
                    </td>
                    <td width="10%">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={(e) => deleteCartItem(e, item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>
                SubTotal:
                <span className="float-right">{totalCartPrice}</span>
              </h4>
              <h4>
                GrandTotal:
                <span className="float-right">{totalCartPrice}</span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    cart_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty!</h4>
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
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
