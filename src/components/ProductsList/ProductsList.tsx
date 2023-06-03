import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createSelector } from "@reduxjs/toolkit";
import { fetchItems, selectAll } from "./ProductsListSlice";
import ProductRemovalModal from "../ProductRemovalModal/ProductRemovalModal";
import AddNewProductModal from "../AddNewProductModal/AddNewProductModal";
import SingleProduct from "../SingleProduct/SingleProduct";
import SortMenu from "../SortMenu/SortMenu";
import { SingleProductProps } from "../../types";

import "./ProductsList.sass";

const ProductsList: React.FC = () => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [forRemoving, setForRemoving] = useState("");
    const [forRemovingId, setForRemovingId] = useState(0);
    const dispatch = useAppDispatch();

    const newSelector = createSelector(selectAll, (products) => {
        return { products };
    });
    const itemsForRender = useAppSelector(newSelector);

    useEffect(() => {
        dispatch(fetchItems());
        // eslint-disable-next-line
    }, []);

    const renderProducts = (arr: SingleProductProps[]) => {
        return arr.map((item) => (
            <SingleProduct
                id={item.id}
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                count={item.count}
                size={item.size}
                weight={item.weight}
                comments={item.comments}
                setDeleteModalVisible={setDeleteModalVisible}
                forRemoving={forRemoving}
                setForRemoving={setForRemoving}
                setForRemovingId={setForRemovingId}
            />
        ));
    };
    const overlay = deleteModalVisible || addModalVisible;
    return (
        <div className="products-list__wrapper">
            <AddNewProductModal
                addModalVisible={addModalVisible}
                triggerModal={setAddModalVisible}
            />
            <ProductRemovalModal
                deleteModalVisible={deleteModalVisible}
                setDeleteModalVisible={setDeleteModalVisible}
                name={forRemoving}
                forRemovingId={forRemovingId}
            />
            <div
                className="overlay"
                style={{ display: overlay ? "block" : "none" }}
            ></div>
            <div className="products-list__sort">
                <h3 className="products-list__sortBy">Sort by: </h3>
                <SortMenu />
            </div>
            <div className="products-list__section">
                <div className="products-list__addItem">
                    <button
                        onClick={() => setAddModalVisible(!addModalVisible)}
                        className="products-list__addBtn"
                    >
                        Add New Item
                    </button>
                </div>
                <ul className="products-list__items">
                    {renderProducts(
                        itemsForRender.products as SingleProductProps[]
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductsList;
