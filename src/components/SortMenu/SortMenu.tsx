import { sortByCount, sortByAlphabet } from "../ProductsList/ProductsListSlice";
import { useAppDispatch } from "../../hooks/hooks";

import "./SortMenu.sass";

const SortMenu: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="sort-menu__wrapper">
            <button
                onClick={() => dispatch(sortByAlphabet())}
                className="sort-menu__byAlphabet"
            >
                Alphabet
            </button>
            <button
                onClick={() => dispatch(sortByCount())}
                className="sort-menu__byCount"
            >
                Count
            </button>
        </div>
    );
};

export default SortMenu;
