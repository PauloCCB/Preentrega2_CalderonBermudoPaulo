import { useParams } from "react-router-dom";
import {  CircularProgress, Grid, Typography } from "@mui/material";
import ProductsDetails from "../Products/ProductsDetails";
import useFireStore from "../../CustomHook/useFireStore";
import AddToCartButton from "../Common/AddToCartButton";

const CategoryProductList = () => {
    const { categoryId } = useParams();
    const { data, loading } = useFireStore('categories');
    if (loading) return (<div className='spinner-container'><CircularProgress sx={{ color: "#FF627E" }} /></div>)

    const category = data.filter(category => category.id === parseInt(categoryId))

    if (!category) return (<div className="error-container"><Typography variant="h6" sx={{ color: "#8F8C8C" }}> Categoría no encontrada </Typography></div>)
    return (<>
        <div className="container">
            <Grid container spacing={3}>
                {category.map((category) => {
                    return category.products.map((product) => {
                        return <ProductsDetails key={product.id} product={product}>
                            <AddToCartButton product={product} />
                        </ProductsDetails>


                    })
                })
                }
            </Grid>

        </div>

    </>);
}

export default CategoryProductList;