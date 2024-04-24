import {
  assignArr,
  delCart,
  addTotal,
  delTotal,
  addItems,
  delItems,
} from "../store/slices/cart";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const items = useSelector((state) => state.cart.cart_items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  function addToCart(product) {
    const newarr = [...items];
    const exist = newarr.find((x) => x.id === product.id);
    let i = newarr.indexOf(exist);
    if (exist) {
      newarr[i] = {
        ...product,
        qty: exist.qty + 1,
        price: exist.price + exist.initial_price,
      };
      dispatch(addTotal(exist.initial_price));
      dispatch(addItems());
      dispatch(assignArr(newarr));
    }
  }
  function delFromCart(product) {
    const newarr = [...items];
    const exist = newarr.find((x) => x.id === product.id);
    let i = newarr.indexOf(exist);
    if (exist.qty === 1) {
      console.log(exist.qty);
      dispatch(delCart(exist));
      dispatch(delItems(exist.qty));
      dispatch(delTotal(exist.price));
    } else {
      newarr[i] = {
        ...product,
        qty: exist.qty - 1,
        price: exist.price - product.initial_price,
      };
      dispatch(delTotal(exist.initial_price));
      dispatch(delItems(1));
      dispatch(assignArr(newarr));
    }
  }
  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            {items.map((product) => {
              return (
                <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-cente ">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={product.thumbnail}
                          className="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{product.title}</p>
                        <p>
                          <span className="text-muted">price: </span>
                          {product.initial_price}
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <div className="d-flex my-3 align-items-center">
                          <button
                            onClick={() => delFromCart(product)}
                            className="btn btn-danger"
                          >
                            -
                          </button>
                          <p className="mb-0 mx-4"> {product.qty} </p>
                          <button
                            onClick={() => addToCart(product)}
                            className="btn btn-success"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">${product.price}</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <i
                          onClick={() => {
                            dispatch(delCart(product));
                            dispatch(delTotal(product.price));
                            dispatch(delItems(product.qty));
                          }}
                          className="fas fa-trash fa-lg text-danger"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-3" style={{ fontSize: "2rem", display: "hidden" }}>
          Total: ${total}
        </div>
      </div>
    </section>
  );
}

export default Cart;
