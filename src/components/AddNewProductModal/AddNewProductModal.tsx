import { useState } from "react";

import { useAppDispatch } from "../../hooks/hooks";
import { addNewProduct, addNew } from "../ProductsList/ProductsListSlice";
import { AddNewProductModalProps } from "../../types";
import "./AddNewProductModal.sass";

const AddNewProductModal: React.FC<AddNewProductModalProps> = ({
    addModalVisible,
    triggerModal,
}) => {
    const [name, setName] = useState("");
    const [count, setCount] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const dispatch = useAppDispatch();

    const toggleModal = () => {
        triggerModal(false);
    };

    const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const id = new Date().getTime();
        dispatch(
            addNewProduct({
                id,
                imageUrl: "str",
                name,
                count: +count,
                size: {
                    width: +width,
                    height: +height,
                },
                weight: weight,
                comments: [],
            })
        );

        dispatch(
            addNew({
                id,
                imageUrl: "str",
                name,
                count: +count,
                size: {
                    width: +width,
                    height: +height,
                },
                weight: weight,
                comments: [],
            })
        );
        setName("");
        setCount("");
        setWidth("");
        setHeight("");
        setWeight("");
        triggerModal(false);
    };
    const isDisabled =
        name.length < 5 ||
        count.length < 1 ||
        width.length < 2 ||
        height.length < 2 ||
        weight.length < 3;
    return (
        <div
            className="add-product__modal"
            style={{ display: addModalVisible ? "block" : "none" }}
        >
            <h3 className="add-product__header">Add new product</h3>
            <form className="add-product__inputs">
                <div className="add-product__input-block">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        className="add-product__input"
                        id="name"
                        type="text"
                        minLength={5}
                        placeholder="type name"
                    />
                </div>

                <div className="add-product__input-block">
                    <label htmlFor="count">Count</label>
                    <input
                        onChange={(e) => setCount(e.target.value)}
                        value={count}
                        required
                        className="add-product__input"
                        id="count"
                        type="number"
                        min={0}
                        placeholder="type count"
                    />
                </div>
                <div className="add-product__input-block">
                    <label htmlFor="width">Width</label>
                    <input
                        onChange={(e) => setWidth(e.target.value)}
                        value={width}
                        required
                        className="add-product__input"
                        id="width"
                        type="number"
                        min={0}
                        placeholder="type width"
                    />
                </div>
                <div className="add-product__input-block">
                    <label htmlFor="height">Height</label>
                    <input
                        onChange={(e) => setHeight(e.target.value)}
                        value={height}
                        required
                        className="add-product__input"
                        id="height"
                        type="number"
                        min={0}
                        placeholder="type height"
                    />
                </div>
                <div className="add-product__input-block">
                    <label htmlFor="weight">Weight</label>
                    <input
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        required
                        className="add-product__input"
                        id="weight"
                        type="text"
                        minLength={3}
                        placeholder="type weight"
                    />
                </div>
                <div className="add-product__buttons-group">
                    <button
                        disabled={isDisabled}
                        onClick={(e) => onSubmitClick(e)}
                        className="add-product__submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <button onClick={toggleModal} className="add-product__cancel">
                Cancel
            </button>
        </div>
    );
};

export default AddNewProductModal;
