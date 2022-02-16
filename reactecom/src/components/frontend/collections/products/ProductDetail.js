import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`api/view-product/${params.category}/${params.product}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProduct(res.data.product);

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
  }, [params]);

  const handleDecrement = () => {
    if (quantity < 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddToCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      quantity: quantity,
    };

    axios.post(`api/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        Swal.fire({
          title: "Added to Cart",
          text: res.data.message,
          icon: "success",
        });
      } else if (res.data.status === 409) {
        Swal.fire({
          title: "Already Added to Cart",
          text: res.data.message,
          icon: "error",
        });
      } else if (res.data.status === 401) {
        Swal.fire({
          title: "Unauthorized",
          text: res.data.message,
          icon: "error",
        });
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Product Not Available",
          text: res.data.message,
          icon: "error",
        });
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
  } else {
    var availStock = "";
    if (product.quantity > 0) {
      availStock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  className="input-group-text"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <div className="form-control text-center">{quantity}</div>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={submitAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      availStock = (
        <div>
          <label className="btn-sm btn-danger px-4 mt-2">Out of Stock</label>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>
            Category / {product.category.name} / {product.name}
          </h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-right">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-100"
              />
            </div>
            <div className="col-md-8">
              <h4>
                {product.name}
                <span className="float-right badge btn-sm btn-danger badge-pil ">
                  {product.brand}
                </span>
              </h4>
              <p>{product.description}</p>
              <h4 className="mb-1">
                Rs : {product.selling_price}
                <s className="ml-2 ms-2">Rs : {product.original_price}</s>
              </h4>
              <div>
                {availStock}
                <button type="button" className="btn btn-danger mt-3">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
