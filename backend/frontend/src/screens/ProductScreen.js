import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { listProductDetails,createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Notification from "../components/Notification";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// import products from '../products'
// import axios from 'axios'

function ProductScreen() {
  const { id } = useParams();
  const history = useNavigate();

  const [qty, setQty] = useState(1);
  /* the use state is used to initialize any data or variable that we want to use through out the component, and we set the useState to an empty array[] cause we want it to have the original value of the loaded data */
  //  const [product, setProduct] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { loading: loadingProductReview, error:errorProductReview, success: successProductReview } = productReviewCreate;

  /**use effect get triggered everytime this HomeScreen component gets loaded or when a state value gets loaded or updated, so we will be setting the useEffect to an empty array cause we only want it to trigger when the component loads and not when the state element gets updated */
  useEffect(() => {
    // async function fetchProduct() {
    //     const { data } = await axios.get(`/api/products/${id}`)
    //     setProduct(data)
    // }
    // fetchProduct()
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(
          id,{
            rating,
            comment
          }
        ))
  }
  //const product = products.find((p) => p._id == id)
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} ratings`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {/*conditional statement to check if product is in stock else display out of stock*/}
                          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {/**
                                                          * here we map through the countinstock from the backend and then display the value in our list
                                                          using an array function, i converted the countinstock into an array form e.g [0,1,2,3....]
                                                          because an array always starts from 0 we add an (+ 1) to the  x variable so as to start the list from 1
                                                          because it is an react object with requires id of each item selected. 
                                                          */}
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <div className="d-grid gap-2">
                        {/*the disabled attribute uses a conditional statement to check if the countInstock is == 0*/}
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          disabled={product.countInStock == 0}
                          type="button"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <br/>
            <Row>
                <Col md={6}>
                    <h4>Reviews</h4>
                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                    <ListGroup>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} color='#f8e25'/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h4>Write a review</h4>
                            {loadingProductReview && <Loader/>}
                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                            {errorProductReview  && <Message variant='danger'>{errorProductReview}</Message>}
                           
                            {userInfo ? (
                                  <Form onSubmit={submitHandler}>
                                      <Form.Group controlId='rating'>
                                          <Form.Label>Rating</Form.Label>
                                          <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                          >
                                            <option value = ''>Select ...</option>
                                            <option value = '1'>1 - Poor</option>
                                            <option value = '2'>2 - Fair</option>
                                            <option value = '3'>3 - Good</option>
                                            <option value = '4'>4 - Very Good</option>
                                            <option value = '5'>5 - Excellent</option>              

                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='comment'>
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control
                                          as='textarea'
                                          row='5'
                                          value={comment}
                                          onChange={(e) => setComment(e.target.value)}
                                        >

                                        </Form.Control>
                                      </Form.Group>
                                      <br/>
                                      <Button
                                        disabled={loadingProductReview}
                                        type='submit'
                                        variant = 'primary'
                                      > 
                                        Submit
                                      </Button>
                                  </Form>
                            ) : (
                                <Message variant='info'>Please <Link to='/login'>Login</Link> to write a review</Message>
                            )}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
