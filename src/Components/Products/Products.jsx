import { CircularProgress, Grid, Typography } from "@mui/material";
import ProductDetails from "./ProductsDetails";
import useFireStore from '../../CustomHook/useFireStore';
import AddToCartButton from "../Common/AddToCartButton";

const Products = () => {
    const { data, loading } = useFireStore('products');

    if (loading) {
        return (<div className='spinner-container'><CircularProgress sx={{ color: "#4ee420" }} /></div>)
    }
    return (<div className="container">
        <Typography variant='h4' sx={{ color: "#8F8C8C" }}>Productos</Typography>
        <Grid container spacing={3}>
            {
                data.map((product) => {
                    return (<ProductDetails key={product.id} product={product}>
                        <AddToCartButton product={product} />
                    </ProductDetails>)
                })
            }
        </Grid>
    </div>

    );
}

export default Products;