import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesData = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`api/allcategories`).then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.categories);
        setLoading(false);
      }
    });

    return () => {};
  }, []);

  if (loading) {
    return (
      <div class="d-flex justify-content-center mt-3">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    var categoryList = "";
    categoryList = categories.map((item) => {
      return (
        <div className="col-md-4 p-3" key={item.id}>
          <div className="card">
            <div className="card-body">
              <Link to={`/collections/${item.slug}`}>
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
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{categoryList}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;
