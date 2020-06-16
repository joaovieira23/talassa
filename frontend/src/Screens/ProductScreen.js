import React, { useEffect, useState } from 'react';
// import { FiArrowLeft } from 'react-icons/fi';
import { detailsProduct } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

function ProductScreen(props) {
  // console.log(props.match.params.id);
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }

  return <div>
    <div className="back-to-result">
        <Link to="/">
            {/* <FiArrowLeft /> */}
            Back to result
        </Link>
    </div>
    {loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    (
        <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" ></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4 className="title-product">{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              <h3 style={{ fontSize: "25px" }}>Price: <b>${product.price}</b></h3>
            </li>
            <li>
              Description: <br/><br/>
              <div style={{ fontSize: "18px" }}>
                {product.description}
              </div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>
              Price: {product.price}
            </li>
            <li>
              Status: {product.countInStock > 0 ? "In Stock": "Unavailable"}
            </li>
            <li>
              Qty: <select className="appearance-select" value={qty} onChange={(e) => {setQty(e.target.value)}}>
                {[...Array(product.countInStock).keys()].map(x => 
                  <option style={{ fontSize:"16px" }} key={ x + 1 } value={x + 1}>{ x + 1 }</option>
                  )}
              </select>
            </li>
            <li>
              {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
            } 
            </li>
          </ul>
        </div>

      </div>
    )
  }
  </div>
}

export default ProductScreen;