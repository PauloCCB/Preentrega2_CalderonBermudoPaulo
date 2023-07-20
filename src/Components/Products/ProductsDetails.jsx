import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Grid, ImageList, Typography, ImageListItem } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from "react-router-dom";
const ProductsDetails = ({ product }) => {
    const { id, images, nombre, precio, itHasDues, isAnOffer } = product;

    return (<Grid item sx={12} sm={6} md={4} lg={3}>
        <Card className="card-products-container">
            <ImageList>
                <ImageListItem component={Link} to={`/products/${product.id}`}>
                    <img className="card-media" src={images} />
                </ImageListItem>

            </ImageList>

            <CardContent>
                <Typography>{nombre}</Typography>
                <Typography>{precio.toFixed(2)}</Typography>
                {
                    itHasDues && (
                        <Typography>
                            <PaymentIcon /> Hasta tres cuotas sin interés!
                        </Typography>
                    )
                }
            </CardContent>
        </Card>

    </Grid>);
}
ProductsDetails.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        itHasDues: PropTypes.bool.isRequired,
        isAnOffer: PropTypes.bool.isRequired,
    }).isRequired

}

export default ProductsDetails
