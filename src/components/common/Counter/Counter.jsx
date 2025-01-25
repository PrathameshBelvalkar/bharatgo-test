import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../../redux/reducers/cartSlice";
import "./counter.css";

const Counter = ({ itemId }) => {
    const dispatch = useDispatch();
    const item = useSelector((state) => state.cart.items.find((item) => item.id === itemId));

    const increment = () => dispatch(incrementQuantity(itemId));
    const decrement = () => dispatch(decrementQuantity(itemId));

    return (
        <div className="counter">
            <button
                className="button"
                onClick={decrement}
                disabled={item.quantity <= 1}
            >
                -
            </button>
            <span className="value">{item.quantity}</span>
            <button className="button" onClick={increment}>
                +
            </button>
        </div>
    );
};

export default Counter;