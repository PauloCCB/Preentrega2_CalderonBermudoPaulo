import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { Link} from 'react-router-dom';
import useFireStore from '../../CustomHook/useFireStore';

const Categories = () => {
    const { data, loading } = useFireStore('categories')

    if (loading) return (<div className='spinner-container'><CircularProgress sx={{ color: "#FF627E" }} /></div>)

    return (<>
        <div className='container'>
            <Typography variant='h2' sx={{ color: "#8F8C8C" }}>Categorias</Typography>
            <div className='card'>
                {
                    data.map((category) => {
                        return (<Card key={category.id} sx={{ width: "317px", height: "299px", margin: "60px" }} component={Link} to={`/categories/${category.id}`}>
                            <CardContent>
                                <img className='img-card' src={category.image} />
                                <Typography variant="h6" color="textSecondary">{category.category}</Typography>
                            </CardContent>
                        </Card>)
                    })
                }

            </div>
        </div>

    </>);
}

export default Categories;