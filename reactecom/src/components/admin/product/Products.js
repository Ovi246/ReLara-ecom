import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products`).then((response) => {
      if (response.data.status === 200) {
        setProducts(response.data.products);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          title: "Deleted",
          text: res.data.message,
          icon: "success",
        });
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Couldn't Delete",
          text: res.data.message,
          icon: "error",
        });
        thisClicked.innerText = "Delete";
      }
    });
  };

  var products_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    if (products) {
      products_HTMLTABLE = products.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.category.name}</td>
            <td className="font-weight-bold">{item.name}</td>
            <td>{item.selling_price}</td>
            <td>
              <img
                src={`http://localhost:8000/${item.image}`}
                width="50px"
                alt="pic"
              />
            </td>
            <td>
              <Link
                to={`edit-product/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                onClick={(e) => deleteCategory(e, item.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return <h4>No Products to Show!</h4>;
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>
          Product List
          <Link
            to={"add-product"}
            className="btn btn-primary btn-sm float-right text-white"
          >
            Add Product{" "}
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Product Name</th>
              <th>Selling Price</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{products_HTMLTABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
