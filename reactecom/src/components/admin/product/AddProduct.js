import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    status: "",
    brand: "",
    image: "",
    selling_price: "",
    original_price: "",
    featured: "",
    quantity: "",
    popular: "",
    category_id: "",
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
    brand,

    selling_price,
    original_price,
    featured,
    quantity,
    popular,
    category_id,
  } = state;

  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      if (response.data.status === 200) {
        setCategories(response.data.categories);
      }
    });

    return () => {};
  }, []);

  const handleInput = (e) => {
    e.persist();
    let { name, value, checked, files } = e.target;
    setState({ ...state, [name]: value || checked || files });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", picture.image);
    data.append("slug", slug);
    data.append("name", name);
    data.append("description", description);
    data.append("meta_title", meta_title);
    data.append("meta_keywords", meta_keywords);
    data.append("meta_description", meta_description);
    data.append("brand", brand);
    data.append("selling_price", selling_price);
    data.append("original_price", original_price);
    data.append("quantity", quantity);
    data.append("category_id", category_id);
    data.append("status", status);
    data.append("featured", featured);
    data.append("popular", popular);
    setLoading(true);
    try {
      await axios.get("/sanctum/csrf-cookie").then(async (response) => {
        await axios.post(`/api/add-product`, data).then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              title: "Added",
              text: res.data.message,
              icon: "success",
            });
            document.getElementById("categoryform").reset();
          } else if (res.data.status === 422) {
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

  var display_error = [];
  if (state.error_list) {
    display_error = [
      state.error_list.slug,
      state.error_list.name,
      state.error_list.meta_title,
    ];
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4>
          Add Product
          <Link
            to="/admin/products"
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
        <form encType="multipart/form-data">
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
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="other-details-tab"
                data-toggle="tab"
                href="#other-details"
                role="tab"
                aria-controls="other-details"
                aria-selected="false"
              >
                Other-Details
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
                <label>Select Category</label>
                <select
                  name="category_id"
                  value={category_id}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option>Select Category</option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
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
            <div
              class="tab-pane fade"
              id="other-details"
              role="tabpanel"
              aria-labelledby="other-details-tab"
            >
              <div className="row">
                <div className="col-md-4 form-group mb-3 mt-3 ">
                  <label>Selling-Price</label>
                  <input
                    className="form-control"
                    type="text"
                    name="selling_price"
                    onChange={handleInput}
                    value={selling_price}
                  />
                </div>
                <div className="col-md-4 form-group mb-3 mt-3">
                  <label>Original-Price</label>
                  <input
                    className="form-control"
                    type="text"
                    name="original_price"
                    onChange={handleInput}
                    value={original_price}
                  />
                </div>
                <div className="col-md-4 form-group mb-3 mt-3">
                  <label>Quantity</label>
                  <input
                    className="form-control"
                    type="text"
                    name="quantity"
                    onChange={handleInput}
                    value={quantity}
                  />
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Brand</label>
                  <input
                    className="form-control"
                    type="text"
                    name="brand"
                    onChange={handleInput}
                    value={brand}
                  />
                </div>
                <div className="col-md-8 form-group mb-3">
                  <label>Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={handleImage}
                  />
                </div>
              </div>

              <fieldset class="form-group row">
                <legend class="col-form-label col-sm-2 float-sm-left pt-0">
                  Options
                </legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="status"
                      onChange={handleInput}
                      value={status}
                    />{" "}
                    <label class="form-check-label">
                      Status (Check if u wanna List Item!)
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="featured"
                      onChange={handleInput}
                      value={featured}
                    />{" "}
                    <label class="form-check-label">
                      Featured (Check if u wanna Pin Item!)
                    </label>
                  </div>
                  <div class="form-check disabled">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="popular"
                      onChange={handleInput}
                      value={popular}
                    />{" "}
                    <label class="form-check-label">
                      Popular (Check if u add Item to Popular List!)
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary px-4 float-right"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
