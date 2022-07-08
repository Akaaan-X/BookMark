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
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function ProductScreen() {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  // const product = products.find((p) => p._id === params.id);
  //fetch single product
  const dispatch = useDispatch();
  // const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(
    //     `/api/products/${encodeURIComponent(id)}`
    //   );
    //   setProduct(data);
    // };
    // fetchProduct();
    dispatch(listProductDetails(params.id));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
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
              <ListGroupItem>Description: {product.description}</ListGroupItem>
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
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
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
      )}
    </div>
  );
}
