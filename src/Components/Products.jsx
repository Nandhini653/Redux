import React, { useState, useEffect, useRef } from 'react';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true); // Use useRef to track component mounted state

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      if (componentMounted.current) {
        const products = await response.json();
        console.log('Products:', products); 
        setData(products);
        setFilter(products);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const Loading = () => {
    return <>Loading....</>;
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className='btn btn-outline-dark me-2'>All</button>
          <button className='btn btn-outline-dark me-2'>Men's Clothing</button>
          <button className='btn btn-outline-dark me-2'>Women's Clothing</button>
          <button className='btn btn-outline-dark me-2'>Jewelery</button>
          <button className='btn btn-outline-dark me-2'>Electronic</button>
        </div>
        {filter.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
