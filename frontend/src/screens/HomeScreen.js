import React, { useEffect } from "react";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import { Paginate } from "../components/Paginate";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className='homeScreen'>
      <h1>Latest Books</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
}
