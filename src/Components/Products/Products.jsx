import useMockData from '../../CustomHook/useMockData'
import { CircularProgress, Grid, Typography } from "@mui/material";
import products from '../../mocks/products.json'
import ProductDetails from "./ProductsDetails";

const Products = () => {
    const {data,loading}=useMockData(products);
    if(loading){
        return(<div className='spinner-container'><CircularProgress sx={{ color: "#4ee420" }}/></div>)
    }
    return (<div className="container">
    <Typography variant='h4' sx={{ color: "#8F8C8C" }}>Productos</Typography>
    <Grid container spacing={3}>
        {
            data.map((product) => {
                return <ProductDetails key={product.id} product={product} />
            })
        }
    </Grid>
</div>
        
    );
}

export default Products;