import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

const EditCategory = () => {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const categoryId = useParams();
  const [state, setState] = useState({
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    status: "",
    error_list: [],
  });
  const {
    slug,
    name,
    description,
    meta_title,
    meta_keywords,
    meta_description,
    status,
  } = state;

  useEffect(() => {
    axios.get(`api/edit-category/${categoryId.id}`).then((res) => {
      if (res.data.status === 200) {
        setState(res.data.category);
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "404 Not Found",
          text: res.data.message,
          icon: "error",
        });
      }
      setLoading(false);
    });

    // history.push('/');

    return () => {};
  }, [categoryId]);

  const handleInput = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCheckboxInput = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      await axios.get("/sanctum/csrf-cookie").then(async (response) => {
        await axios
          .put(`/api/update-category/${categoryId.id}`, state)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                title: "Updated",
                text: res.data.message,
                icon: "success",
              });
            } else if (res.data.status === 422) {
              setState({
                ...state,
                error_list: res.data.validation_errors,
              });
            } else if (res.data.status === 404) {
              Swal.fire({
                title: "404 Not Found",
                text: res.data.message,
                icon: "error",
              });
            }
          });
      });
      // console.log(status);
      // history.push('/');
    } catch (error) {
    } finally {
      setButtonLoading(false);
    }
  };

  var display_error = [];
  if (state.error_list) {
    display_error = [
      state.error_list.slug,
      state.error_list.name,
      state.error_list.meta_title,
    ];
  }

  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Category
            <Link
              to="/admin/categories"
              className="btn btn-primary btn-sm float-right"
            >
              BACK
            </Link>
          </h4>
          {display_error.map((err, idx) => {
            return (
              <p className="mb-1 text-danger" key={idx}>
                {err}
              </p>
            );
          })}
        </div>
        <div className="card-body">
          <form>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="seo-tags-tab"
                  data-toggle="tab"
                  href="#seo-tags"
                  role="tab"
                  aria-controls="seo-tags"
                  aria-selected="false"
                >
                  Seo-Tags
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3 mt-3">
                  <label>Slug</label>
                  <input
                    className="form-control"
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={slug}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={name}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="description"
                    onChange={handleInput}
                    value={description}
                  />
                </div>
                <div className="form-group mb-3 form-check-inline">
                  <label className="form-check-label">Status</label>
                  <input
                    className="form-check-input ml-1"
                    type="checkbox"
                    name="status"
                    defaultChecked={status === 1 ? true : false}
                    value={status}
                    onChange={handleCheckboxInput}
                  />{" "}
                  <span>Check if u wanna List Item!</span>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="seo-tags"
                role="tabpanel"
                aria-labelledby="seo-tags-tab"
              >
                <div className="form-group mb-3 mt-3">
                  <label>Meta-Title</label>
                  <input
                    className="form-control"
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={meta_title}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta-Keywords</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="meta_keywords"
                    onChange={handleInput}
                    value={meta_keywords}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta-Description</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="meta_description"
                    onChange={handleInput}
                    value={meta_description}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 float-right"
              onClick={handleSubmit}
            >
              {buttonLoading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default EditCategory;
