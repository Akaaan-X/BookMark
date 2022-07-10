import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {
  PRODUCT_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
import axios from "axios";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      // check whether user is admin to avoid name undefined
      navigate("/login");
    } else {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch({ type: PRODUCT_RESET }); // fix loading up-to-date product details after updating
        navigate("/admin/productlist");
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setAuthor(product.author);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [product, dispatch, productId, navigate, successUpdate, userInfo]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        author,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light' type='button' to='/admin/productlist'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-4' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                id='image-file'
                label='Choose file'
                custom='true'
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group className='mt-4' controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='countInStock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='mt-4' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
