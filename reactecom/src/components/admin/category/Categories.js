import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      if (response.data.status === 200) {
        setCategories(response.data.categories);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-category/${id}`).then((res) => {
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

  var categories_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    categories_HTMLTABLE = categories.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td className="font-weight-bold">{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`edit-category/${item.id}`}
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
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>
          Category List
          <Link
            to={"add-category"}
            className="btn btn-primary btn-sm float-right text-white"
          >
            Add Category{" "}
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{categories_HTMLTABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
