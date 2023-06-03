import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import {
    addNewComment,
    postComment,
    selectById,
} from "../ProductsList/ProductsListSlice";
import { NewCommentModalProps } from "../../types";
import "./NewCommentModal.sass";

let formatedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
    hour12: false,
});

const NewCommentModal: React.FC<NewCommentModalProps> = (props) => {
    const { setModalVisible, modalVisible, id } = props;
    const [comment, setComment] = useState("");
    const dispatch = useAppDispatch();
    const commentaries = useAppSelector((state) => selectById(state, id!));
    const comments = commentaries?.comments || [];

    const onConfirmClick = () => {
        const date = new Date();
        const commentObj = {
            id: date.getTime(),
            productId: id,
            description: comment,
            date: formatedDate.format(date),
        };
        dispatch(
            addNewComment({
                productId: id,
                comment: commentObj,
            })
        );

        dispatch(
            postComment({ productId: id, comments: [commentObj, ...comments] })
        );

        setModalVisible(false);
        setComment("");
    };

    const isDisabled = comment.length < 10;
    return (
        <div
            className="commentModal__wrapper"
            style={{ display: modalVisible ? "block" : "none" }}
        >
            <h3 className="commentModal__header">
                Add new comment to {commentaries?.name}
            </h3>
            <form className="commentModal__form">
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your opinion"
                    type="text"
                    className="commentModal__input"
                />
            </form>
            <div className="commentModal__buttons">
                <button
                    disabled={isDisabled}
                    onClick={onConfirmClick}
                    className="commentModal__confirm"
                >
                    Confirm
                </button>
                <button
                    onClick={() => setModalVisible(false)}
                    className="commentModal__cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default NewCommentModal;
