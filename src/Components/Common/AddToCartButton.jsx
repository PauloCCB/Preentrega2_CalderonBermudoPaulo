import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import PropTypes from 'prop-types';

const AddToCartButton = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <a
            className="w-3/5 tracking-wide m-0 cursor-pointer mt-[1em] flex h-[3em] mx-auto font-futura-medium-bt bg-black text-white text-xs rounded-xl items-center justify-center " variant="contained"
            onClick={() => addToCart(product)}
        >
            Agregar al carrito
        </a>
    );
};

AddToCartButton.propTypes = {
    product: PropTypes.shape({}).isRequired
}

export default AddToCartButton;