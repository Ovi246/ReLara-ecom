import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`/api/orders`).then((response) => {
      if (response.data.status === 200) {
        setOrders(response.data.orders);
      }
      setLoading(false);
    });
  }, []);

  var orders_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    if (orders) {
      orders_HTMLTABLE = orders.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.tracking_no}</td>
            <td className="font-weight-bold">{item.phonenumber}</td>
            <td>{item.email}</td>

            <td>
              <Link
                to={`view-product/${item.id}`}
                className="btn btn-success btn-sm"
              >
                View
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return <h4>No Orders to Show!</h4>;
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>Orders List</h4>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Order-ID</th>
              <th>Tracking No.</th>
              <th>Phone No.</th>
              <th>Email</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>{orders_HTMLTABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
