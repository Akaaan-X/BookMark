import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

export default function Product({ product }) {
  return (
    // set each card have the same size
    <Card className='productCard my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "#343a40" }}
        >
          <Card.Title className='cardTitle' as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Card.Text as='p' className='author'>
            by {product.author}
          </Card.Text>
          <Rating
            value={product.rating}
            review={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3' className='price'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
