import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from "react-router-dom";
import ProductsCard from '../Products/ProductsCard';
const ProductsDetails = ({ product, children }) => {
    const { images, nombre, precio, itHasDues } = product;
    const [isSelected, setIsSelected] = useState(false);
    const handleClick = () => {
        setIsSelected((prev) => !prev)
    }
    return (
        <li className=" px-0 py-0 text-center m-0 " key={product.id}>
            <div className="" onClick={handleClick}>
                <Link to={`/products/${product.id}`}>
                    <img className="w-full h-auto block mb-3" src={images} alt={product.id} />
                </Link>
                <div>
                    <h2 className='font-futura-medium-bt text-lg font-normal leading-5 text-#29363C pt-1 mb-8 h-[3em]'>–{nombre}</h2>
                    <span className='decoration-black font-futura-medium-bt font-bold text-lg  '>S/. {precio.toFixed(2)}</span>
                    {
                        itHasDues && (
                            <Typography>
                                <PaymentIcon /> Hasta tres cuotas sin interés!
                            </Typography>
                        )
                    }
                </div>
            </div>
            {
                isSelected &&
                <ProductsCard>
                    {children}
                </ProductsCard>
            }
        </li>);
}
ProductsDetails.propTypes = {
    children: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        images: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        itHasDues: PropTypes.bool.isRequired,
        isAnOffer: PropTypes.bool.isRequired,
    }).isRequired
}

export default ProductsDetails
