import { useState, useEffect } from "react";
import "./products.css";
import { axiosInstance } from "../apis/config";
import { addCart, addTotal } from "../store/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./ProductsList.css";
import StarRating from "./StarRating";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.cart_items);

  const dispatch = useDispatch();

  function addToCart(product) {
    const newarr = [...items];
    const exist = newarr.find((x) => x.id === product.id);
    if (exist === undefined) {
      dispatch(addCart({ ...product, qty: 1, initial_price: product.price }));
      dispatch(addTotal(product.price));
    }
  }

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //search
  // const filteredProducts = products.filter((product) => {
  //   if (query === "") {
  //     return true;
  //   } else if (
  //     product.title &&
  //     product.title.toLowerCase().includes(query.toLowerCase())
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  const filteredProducts = products.filter(product => {
    const categoryFilter =
      selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();

    const titleFilter =
      query === '' || product.title.toLowerCase().includes(query.toLowerCase());
    return categoryFilter && titleFilter;
  });

  //pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataPerPage = filteredProducts.slice(startIndex, endIndex);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <p style={{ marginTop: "10px" }}>
        <b>Welcome To Our Store, Start browsing...</b>
      </p>
      <div className="row container">
        <input type="text" placeholder="Search and Explore.." className="col-10"
          style={{ borderRadius: '10px', padding: '3px', border: '1px solid #eee' }} onChange={event => setQuery(event.target.value)} />

      </div>

      <p className='cat' style={{ paddingLeft: '10px',fontSize:'20px' }}> <b>Categories</b> </p>
      <div className=" d-none d-md-block">
        <button className={` ${selectedCategory === "All" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px', width:'150px',marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("All")}>All</button>
        <button className={` ${selectedCategory === "Laptops" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("Laptops")}>Laptops</button>
        <button className={` ${selectedCategory === "fragrances" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("fragrances")}>Fragrances</button>
        <button className={` ${selectedCategory === "groceries" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("groceries")}>Groceries</button>
        <button className={` ${selectedCategory === "skincare" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("skincare")}>SkinCare</button>
        <button className={` ${selectedCategory === "smartphones" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("smartphones")}>smartphones</button>
        <button className={` ${selectedCategory === "home-decoration" ? 'activee' : ''}`} style={{
          border: '1px solid', borderRadius: '15px',width:'150px', marginRight: '2px',marginTop:'5px', fontWeight: "bold"
        }}
          onClick={() => handleCategoryChange("home-decoration")}>home-decoration</button>
      </div>
      <div className="d-block d-md-none">
        <Dropdown onSelect={(category) => handleCategoryChange(category)}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {['All', 'Laptops', 'Fragrances', 'Groceries', 'SkinCare', 'smartphones', 'home-decoration'].map(
              (category) => (
                <Dropdown.Item key={category} eventKey={category}>
                  {category}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        {dataPerPage.map((product, id) => (
          <div className="col" key={product.id}>
            <div className="card mycard">
              <img
                src={`https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`}
                className="card-img-top"
                alt="{product.title}"
                style={{ height: "200px", width: "100%" }}
              />
              <div className="card-body">
                <p className="stock d-flex align-items-center justify-content-center " >
                  {product.stock > 0 ? (
                    
                    <span style={{ backgroundColor: "green" ,height:'100' }}>In Stock</span>
                  ) : (
                    <span style={{ backgroundColor: "red" }}>Out of Stock</span>
                  )}
                </p>
                <p className="card-title">
                  <b>{product.title}</b>
                </p>
                <p className="card-text">Price: {product.price}$</p>
                <div className="my-3"><b ><StarRating rating={product.rating} /></b>


                </div>

                <button
                  onClick={() => navigate(`/ProductDetails/${product.id}`)}
                  className="mydetails my-2"
                >
                  ProductDetails
                </button>
                <button onClick={() => addToCart(product)} className="mycart my-2">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredProducts.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="pagination-item"
          linkClass="pagination-link"
          activeLinkClass="pagination-link active"
        />
      </div>
    </div>

  );
}

export default ProductsList;
