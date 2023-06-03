import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { selectById } from "../../components/ProductsList/ProductsListSlice";
import { useAppSelector } from "../../hooks/hooks";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import { Link } from "react-router-dom";
import NewCommentModal from "../../components/NewCommentModal/NewCommentModal";
import "./ProductPage.sass";
import img from "../../assets/item.png";
import EditProductModal from "../../components/EditProductModal/EditProductModal";

const ProductPage: React.FC = () => {
    let { id } = useParams();
    const product = useAppSelector((state) => selectById(state, id!));
    const [modalVisible, setModalVisible] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);

    return (
        <div className="product-page__wrapper">
            <div
                className="overlay"
                style={{
                    display:
                        modalVisible || editProductModal ? "block" : "none",
                }}
            ></div>
            <NewCommentModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                id={+id!}
            />
            <EditProductModal
                modalVisible={editProductModal}
                setModalVisible={setEditProductModal}
                product={product}
            />
            <div className="product-page__btns">
                <Link to="/">
                    <button className="product-page__btn"> Back home</button>
                </Link>
                <button
                    onClick={() => setEditProductModal(true)}
                    className="product-page__btn"
                >
                    Edit Item
                </button>
            </div>
            <div className="product-page__content">
                <h3 className="product-page__name"> {product?.name}</h3>
                <div className="product-page__img-wrapper">
                    <img src={img} alt="img" className="product-page__img" />
                </div>
                <div className="product-page__count">
                    Quantity: {product?.count}
                </div>
                <div className="product-page__size">
                    Size: {product?.size.width}x{product?.size.height}
                </div>
                <div className="product-page__weight">
                    Weight: {product?.weight}
                </div>
            </div>
            <ul className="product-page__coments">
                <div className="product-page__addComm">
                    <h5 className="product-page__com-header">Commentaries:</h5>
                    <button
                        onClick={() => setModalVisible(true)}
                        className="product-page__addBtn"
                    >
                        Add New
                    </button>
                </div>
                <CommentsSection id={+id!} comms={product?.comments || []} />
            </ul>
        </div>
    );
};

export default ProductPage;
