import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { editSingleProduct } from "../ProductsList/ProductsListSlice";
import "./EditProductModal.sass";
import { EditProductModalProps } from "../../types";
import { editProduct } from "../ProductsList/ProductsListSlice";
const EditProductModal: React.FC<EditProductModalProps> = (props) => {
    const { modalVisible, setModalVisible, product } = props;
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [count, setCount] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        setName(product?.name!);
        setCount(`${product?.count}`);
        setWidth(`${product?.size.width}`);
        setHeight(`${product?.size.height}`);
        setWeight(product?.weight!);
        // eslint-disable-next-line
    }, []);

    const onSubmitClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        dispatch(
            editSingleProduct({
                productId: product?.id!,
                editedItem: {
                    name,
                    count: +count,
                    size: {
                        width: +width,
                        height: +height,
                    },
                    weight: weight,
                },
            })
        );
        dispatch(
            editProduct({
                productId: product?.id!,
                editedItem: {
                    id: product?.id!,
                    imageUrl: product?.imageUrl!,
                    name,
                    count: +count,
                    size: {
                        width: +width,
                        height: +height,
                    },
                    weight: weight,
                    comments: [...product?.comments!],
                },
            })
        );
        setModalVisible(false);
    };

    const isDisabled =
        name.length < 5 ||
        count.length < 1 ||
        width.length < 2 ||
        height.length < 2 ||
        weight.length < 3;
    return (
        <div
            className="edit-modal__wrapper"
            style={{ display: modalVisible ? "block" : "none" }}
        >
            <h3 className="edit-modal__header">Edit {product?.name}</h3>
            <form className="edit-modal__inputs">
                <div className="edit-modal__input-block">
                    <label htmlFor="name">New name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="edit-modal__input"
                        id="name"
                        type="text"
                        minLength={5}
                        placeholder="type name"
                    />
                </div>

                <div className="edit-modal__input-block">
                    <label htmlFor="count">New count</label>
                    <input
                        required
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        className="edit-modal__input"
                        id="count"
                        type="number"
                        min={0}
                        placeholder="type count"
                    />
                </div>
                <div className="edit-modal__input-block">
                    <label htmlFor="width">New width</label>
                    <input
                        required
                        value={width}
                        onChange={(e) => setWeight(e.target.value)}
                        className="edit-modal__input"
                        id="width"
                        type="number"
                        min={0}
                        placeholder="type width"
                    />
                </div>
                <div className="edit-modal__input-block">
                    <label htmlFor="height">New height</label>
                    <input
                        required
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="edit-modal__input"
                        id="height"
                        type="number"
                        min={0}
                        placeholder="type height"
                    />
                </div>
                <div className="edit-modal__input-block">
                    <label htmlFor="weight">New weight</label>
                    <input
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="edit-modal__input"
                        id="weight"
                        type="text"
                        minLength={3}
                        placeholder="type weight"
                    />
                </div>
                <div className="edit-modal__buttons-group">
                    <button
                        disabled={isDisabled}
                        onClick={(e) => onSubmitClick(e)}
                        className="add-product__submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <button
                onClick={() => setModalVisible(false)}
                className="edit-modal__cancel"
            >
                Cancel
            </button>
        </div>
    );
};

export default EditProductModal;
