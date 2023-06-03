import { useAppDispatch } from "../../hooks/hooks";
import { deleteProduct } from "../ProductsList/ProductsListSlice";
import { deleteSome } from "../ProductsList/ProductsListSlice";
import { ProductRemovalModalProps } from "../../types";
import "./ProductRemovalModal.sass";

const ProductRemovalModal: React.FC<ProductRemovalModalProps> = (props) => {
    const { deleteModalVisible, setDeleteModalVisible, name, forRemovingId } =
        props;
    const dispatch = useAppDispatch();

    const onCancelClick = () => {
        setDeleteModalVisible(false);
    };

    const onConfirmClick = () => {
        dispatch(deleteProduct(forRemovingId));
        dispatch(deleteSome(forRemovingId));
        setDeleteModalVisible(false);
    };
    return (
        <div
            className="delete-modal"
            style={{ display: deleteModalVisible ? "block" : "none" }}
        >
            <h3 className="delete-modal__header">
                Do you realy want remove next item?
            </h3>
            <h5 className="delete-modal__item">{name}</h5>
            <div className="delete-modal__buttons">
                <button
                    onClick={onConfirmClick}
                    className="delete-modal__confirm"
                >
                    Confirm
                </button>
                <button
                    onClick={onCancelClick}
                    className="delete-modal__cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProductRemovalModal;
