import { SingleProductProps } from "../../types";
import "./SingleProduct.sass";
import { Link } from "react-router-dom";
import img from "../../assets/item.png";

const SingleProduct: React.FC<SingleProductProps> = (props) => {
    const {
        name,
        count,
        size,
        id,
        weight,
        setDeleteModalVisible,
        setForRemoving,
        setForRemovingId,
    } = props;

    const onDeleteClick = () => {
        setDeleteModalVisible(true);
        setForRemoving(name);
        setForRemovingId(id);
    };

    return (
        <li className="single-product__wrapper">
            <Link to={`/product/${id}`}>
                <img src={img} alt="img" className="single-product__img" />
                <div className="single-product__name">{name}</div>
            </Link>
            <div className="single-product__count">Quantity: {count}</div>
            <div className="single-product__size">
                Size: {size.width}x{size.height}
            </div>
            <div className="single-product__weight">Weight: {weight}</div>
            <button onClick={onDeleteClick} className="single-product__remove">
                Delete product
            </button>
        </li>
    );
};

export default SingleProduct;
