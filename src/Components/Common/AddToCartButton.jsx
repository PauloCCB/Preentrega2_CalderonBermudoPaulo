import { useContext } from "react";
import { Button } from "@mui/material";
import { CartContext } from "../Context/CartContext";
import PropTypes from 'prop-types';

const AddToCartButton = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    

    return (
        <Button
            className="button-add-to-cart"
            variant="contained"
            onClick={() => addToCart(product)}
        >
            Agregar al carrito
        </Button>
    );
};

AddToCartButton.propTypes = {
    product: PropTypes.shape({}).isRequired
}

export default AddToCartButton;