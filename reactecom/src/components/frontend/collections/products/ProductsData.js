import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsData = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const slug = useParams();

  useEffect(() => {
    axios.get(`api/fetchProducts/${slug.slug}`).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.products_data.products);
        setCategory(res.data.products_data.category);
        setLoading(false);
      } else if (res.data.status === 400) {
        Swal.fire({
          title: "Not Available",
          text: res.data.message,
          icon: "error",
        });
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Not Found",
          text: res.data.message,
          icon: "error",
        });
      }
    });

    return () => {};
  }, [slug]);

  if (loading) {
    return (
      <div class="d-flex justify-content-center mt-3">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    var productsList = "";
    productsList = products.map((item) => {
      return (
        <div className="col-md-4 p-3" key={item.id}>
          <div className="card">
            <Link to="">
              <img
                src={`http://localhost:8000/${item.image}`}
                className="w-100"
                alt={item.name}
              />
            </Link>
            <div className="card-body">
              <Link to={`${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category / {category.slug}</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{productsList}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsData;
