import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios'

import products from "../products";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  /* the use state is used to initialize any data or variable that we want to use through out the component, and we set the useState to an empty array[] cause we want it to have the original value of the loaded data */

  //this was commented out because it will be replace with redux productAction method
  // we import useDispatch to trigger the method from productAction and the useSelector to select a part of our state to be updated in the stor
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const history = useNavigate();
  const location = useLocation();

  //we select the state that we want to use from our store which is the productList by using the useSelector
  // and then we load the attribute of that state: error is for encoutered error, loading: is for the loading state, then products: retrieved product.

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search
  console.log(keyword)

  /**use effect get triggered everytime this HomeScreen component gets loaded or when a state value gets loaded or updated, so we will be setting the useEffect to an empty array cause we only want it to trigger when the component loads and not when the state element gets updated */
  useEffect(() => {
    //this was commented out because it will be replace with redux productAction method

    // async function fetchProducts() {
    //     const { data } = await axios.get('/api/products/')
    //     setProducts(data)
    // }
    // fetchProducts()
    dispatch(listProducts(keyword));
  }, [ dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel/>}
      
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
        
      )}
    </div>
  );
}

export default HomeScreen;
