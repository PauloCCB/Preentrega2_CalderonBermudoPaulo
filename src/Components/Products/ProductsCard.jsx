import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";
import AddToCartButton from "../Common/AddToCartButton";
const ProductsCard = () => {
    const { productId } = useParams();
    const { data, loading } = useFireStore('products')
    console.log("Hola");
    if (loading) return <CircularProgress className='spinner-container' sx={{ color: "#4ee420" }} />
    console.log(data[productId]);
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

            <Card sx={{ width: "70%", textAlign: "center" }}>
                <img src={data[productId].images} alt={data[productId].title} style={{ width: "30%", height: "auto" }} />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {data[productId].title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${data[productId].precio}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Descripcion: {data[productId].descripcion}
                    </Typography>
                </CardContent>
                <AddToCartButton product={data[productId]}></AddToCartButton>
            </Card>
        </div >
    );
}
export default ProductsCard;