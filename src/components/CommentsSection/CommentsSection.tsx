import {
    deleteComment,
    removeCommentFromDb,
} from "../ProductsList/ProductsListSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { CommentsSectionProps } from "../../types";
import trash from "../../assets/trash.png";
import "./CommentsSection.sass";

const CommentsSection: React.FC<CommentsSectionProps> = ({ comms, id }) => {
    const dispatch = useAppDispatch();

    const onTrashClick = (id: number, parentId: number) => {
        const filtered = comms.filter((comm) => comm.id !== id);

        dispatch(deleteComment({ productId: parentId, comment: filtered }));
        dispatch(
            removeCommentFromDb({ productId: parentId, comments: filtered })
        );
    };

    const el = comms.map((comm) => {
        return (
            <li key={comm.id} className="comments__li-wrapper">
                <div className="comments__date">{comm.date}</div>
                <div className="comments__descr">{comm.description}</div>
                <button
                    onClick={() => onTrashClick(comm.id, comm.productId)}
                    className="comments__delete"
                >
                    <img src={trash} alt="trach" />
                </button>
            </li>
        );
    });

    return <div className="comments__wrapper">{el}</div>;
};

export default CommentsSection;
