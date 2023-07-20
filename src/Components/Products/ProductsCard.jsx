import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useMockData from "../../CustomHook/useMockData";
import products from '../../mocks/products.json';
const ProductsCard = () => {

    const { data, loading } = useMockData(products)
    if (loading) return <CircularProgress color="secondary" />
    console.log(data);
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <Card sx={{ width: "70%", textAlign: "center" }}>
                <img src={data.images} alt={data.title} style={{ width: "30%", height: "auto" }} />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${data.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {data.description}
                    </Typography>
                </CardContent>
            </Card>
        </div >
    );
    }
export default ProductsCard;