import { Modal, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const ProductInfo = ({ product, open, setOpen, children }) => {
    const { images, description, precio, isAnOffer, itHasDues, title } = product;
    console.log("Esto es product info");
    const handleClose = () => {
        setOpen(prev => !prev)
    }
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="modal-content" >
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h6" color="primary">
                        ${precio.toFixed(2)}
                    </Typography>
                    <img src={images} alt={title} className="modal-image" />
                    <div className="modal-scroll-content">
                        <Typography variant="body2" color="textSecondary">
                            {itHasDues && (
                                <>
                                    <PaymentIcon /> Hasta 3 cuotas sin interés
                                </>
                            )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {isAnOffer && (
                                <>
                                    <LocalOfferIcon /> 35% de descuento con Galicia
                                </>
                            )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {description}
                        </Typography>
                    </div>
                    {children}
                </div>
            </Modal>
        </>
    );
}

ProductInfo.propTypes = {
    children: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        itHasDues: PropTypes.bool.isRequired,
        isAnOffer: PropTypes.bool.isRequired,
    }).isRequired,
}
export default ProductInfo;