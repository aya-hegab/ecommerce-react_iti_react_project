import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardGroup } from "react-bootstrap";
import { axiosInstance } from "../apis/config";
import "./ProductDetailsCss.css";
import StarRating from "./StarRating";
import { addTotal, addCart } from "../store/slices/cart";
import { useDispatch, useSelector } from "react-redux";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const items = useSelector((state) => state.cart.cart_items);
  //   const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);

  const [selectedImage, setSelectedImage] = useState("");

  function addToCart(product) {
    const newarr = [...items];
    const exist = newarr.find((x) => x.id === product.id);
    if (exist === undefined) {
      dispatch(
        addCart({
          ...product,
          qty: counter,
          initial_price: product.price,
          price: product.price * counter,
        })
      );
      dispatch(addTotal(product.price * counter));
    }
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  const calculateMonthlyPayment = (
    price,
    discountPercentage,
    financingMonths
  ) => {
    const discountedPrice = price - (price * discountPercentage) / 100;
    const monthlyPayment = discountedPrice / financingMonths;
    return monthlyPayment.toFixed(2);
  };

  useEffect(() => {
    axiosInstance
      .get(`/products/${params.id}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="contanier all">
        <div className="row mt-5">
          <div className="d-flex flex-lg-row flex-md-column  flex-sm-column flex-row  ">
            <div className=" col-lg-6  col-md-12 col-sm-12  ">
              <div className="proThumbnail ">
                {" "}
                <img className="proImg" src={selectedImage} alt="" />
              </div>

              {product.images.length > 1 ? (
                <CardGroup className="mt-2">
                  {product.images.map((imageUrl, index) => (
                    <Card
                      key={index}
                      className="proImages me-1 ms-1"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <Card.Img
                        className="proImg"
                        variant="top"
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                      />
                    </Card>
                  ))}
                </CardGroup>
              ) : (
                <p></p>
              )}
            </div>
            <div className="offset-lg-1  offset-md-0  offset-sm-0   offset-1 col-lg-4 col-md-12 col-sm-12 title">
              <div className=" d-flex flex-column">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>
                  {" "}
                  <StarRating rating={product.rating} />
                </p>
                <hr className="mt-lg-3 "></hr>
                <h2>
                  {" "}
                  {formatPrice(product.price)} or $
                  {calculateMonthlyPayment(
                    product.price,
                    product.discountPercentage,
                    6
                  )}
                  /month
                </h2>
                <p>suggested payments with 6 months spetial financing</p>
                <hr className="mt-lg-3 "></hr>

                <button className="stock">
                  {" "}
                  {product.stock !== 0}In stock
                </button>
                <p>More Information</p>
                <div>
                  <button className="category"> {product.category}</button>
                  <button className="category"> {product.brand}</button>
                </div>
              </div>
              <hr className="mt-3 "></hr>

              <div className="d-flex flex-row">
                {" "}
                {product.stock !== 0 ? (
                  <>
                    {" "}
                    <div className="category ps-4">
                      {" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          counter > 1 && setCounter(counter - 1);
                        }}
                      >
                        -
                      </span>
                      {"  "}
                      {counter}
                      {"  "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCounter(counter + 1);
                        }}
                      >
                        +
                      </span>
                    </div>
                    <p>
                      Only <span className="left">{product.stock}</span> left!
                      Don't miss it
                    </p>{" "}
                  </>
                ) : (
                  <p>Out of Stock</p>
                )}
              </div>

              <div>
                <button onClick={() => addToCart(product)} className="mt-1 add">
                  Add to cart
                </button>
              </div>
              <hr className="mt-3 "></hr>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
