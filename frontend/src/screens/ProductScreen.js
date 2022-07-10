import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

export default function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  // const product = products.find((p) => p._id === params.id);
  //fetch single product
  const dispatch = useDispatch();
  // const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(
    //     `/api/products/${encodeURIComponent(id)}`
    //   );
    //   setProduct(data);
    // };
    // fetchProduct();
    if (successProductReview) {
      alert("Review submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link className='btn btn-light' type='button' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='productDetail'>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <p className='productTitle'>{product.name}</p>
                  <p>by {product.author}</p>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    review={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className='addToCart'>
                <ListGroup variant='flush'>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity: </Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{ padding: 2 }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className='btn btn-primary'
                      type='button'
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='light'>No reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.split("T")[0]}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          style={{ padding: 2 }}
                        >
                          <option value=''>--Select--</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className='mt-4' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='light'>
                      Please <Link to='/login'>Sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
