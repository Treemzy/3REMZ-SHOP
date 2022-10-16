import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen() {
    const { id } = useParams();
    const productId = id;
    const history = useNavigate();
    const location = useLocation();
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
  
  
    const dispatch = useDispatch();
  
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { error:errorUpdate, loading:loadingUpdate, success: successUpdate } = productUpdate;

  
    useEffect(() => {         
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history('/admin/productlist')
        }else{
          if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            } 
        }     
    }, [dispatch, product, productId, history, successUpdate]);
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
      }))
      
    };
    
    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
              headers:{
                'Content-Type': 'multipart/form-data'
              }
            }
            const {data} = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

    return (
      <div>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          GO BACK
        </Link>
        <FormContainer>
          <h1>Update Product</h1>
         
          {loadingUpdate && <Loader/>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>

              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                >
                </Form.Control>
                <Form.Control                   
                    label='Choose File'
                    onChange={uploadFileHandler}
                    type="file"
                 
                 />
                  {uploading && <Loader/>}
                
              </Form.Group>

              <Form.Group controlId="brnad">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>


             
              <br />
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    );
  }
export default ProductEditScreen
