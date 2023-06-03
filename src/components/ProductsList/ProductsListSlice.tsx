import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { SingleProductInterface, commentInterface } from "../../types";
import { RootState } from "../../store/store";

const itemsAdapter = createEntityAdapter<SingleProductInterface>();
const initialState = itemsAdapter.getInitialState({});

export const fetchItems = createAsyncThunk(
    "pruducts/fetchPruducts",
    async (): Promise<SingleProductInterface[]> => {
        const response = await fetch("http://localhost:3001/products");
        return await response.json();
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId: number) => {
        const response = await fetch(
            `http://localhost:3001/products/${productId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete product");
        }
    }
);

export const addNewProduct = createAsyncThunk(
    "products/addNewProduct",
    async (newProduct: SingleProductInterface) => {
        const response = await fetch("http://localhost:3001/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        return await response.json();
    }
);

export const postComment = createAsyncThunk(
    "comments/addNewComment",
    async ({
        productId,
        comments,
    }: {
        productId: number;
        comments: commentInterface[];
    }) => {
        const response = await fetch(
            `http://localhost:3001/products/${productId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comments }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add new comment");
        }
    }
);

export const removeCommentFromDb = createAsyncThunk(
    "comments/addNewComment",
    async ({
        productId,
        comments,
    }: {
        productId: number;
        comments: commentInterface[] | [];
    }) => {
        const response = await fetch(
            `http://localhost:3001/products/${productId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comments }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to remove comment");
        }
    }
);

export const editProduct = createAsyncThunk(
    "comments/addNewComment",
    async ({
        productId,
        editedItem,
    }: {
        productId: number;
        editedItem: SingleProductInterface;
    }) => {
        const response = await fetch(
            `http://localhost:3001/products/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedItem),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to edit product");
        }
    }
);

const itemsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addNew: (state, action: { payload: SingleProductInterface }) => {
            itemsAdapter.addOne(state, action.payload);
        },
        deleteSome: (state, action: { payload: number | string }) => {
            itemsAdapter.removeOne(state, action.payload);
        },
        sortByCount: (state) => {
            const allItems = itemsAdapter.getSelectors().selectAll(state);
            const sortedItems = [...allItems].sort((a, b) => b.count - a.count);
            itemsAdapter.setAll(state, sortedItems);
        },
        sortByAlphabet: (state) => {
            const allItems = itemsAdapter.getSelectors().selectAll(state);
            const sortedItems = [...allItems].sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            itemsAdapter.setAll(state, sortedItems);
        },
        addNewComment: (
            state,
            action: {
                payload: { productId: number; comment: commentInterface };
            }
        ) => {
            const { productId, comment } = action.payload;
            const product = state.entities[productId];
            if (product) {
                itemsAdapter.updateOne(state, {
                    id: productId,
                    changes: {
                        comments: [...product.comments, comment],
                    },
                });
            }
        },
        deleteComment: (
            state,
            action: {
                payload: {
                    productId: number;
                    comment: commentInterface[] | [];
                };
            }
        ) => {
            const { productId, comment } = action.payload;
            itemsAdapter.updateOne(state, {
                id: productId,
                changes: {
                    comments: [...comment],
                },
            });
        },
        editSingleProduct: (
            state,
            action: {
                payload: {
                    productId: number;
                    editedItem: Partial<SingleProductInterface>;
                };
            }
        ) => {
            const { productId, editedItem } = action.payload;
            itemsAdapter.updateOne(state, {
                id: productId,
                changes: {
                    name: editedItem.name,
                    count: editedItem.count,
                    size: {
                        width: editedItem.size!.width,
                        height: editedItem.size!.height,
                    },
                    weight: editedItem.weight,
                },
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            itemsAdapter.setAll(
                state,
                action.payload.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
            );
        });
    },
});

const { actions, reducer } = itemsSlice;

export default reducer;
export const { selectAll, selectById } = itemsAdapter.getSelectors<RootState>(
    (state) => state.products
);

export const {
    addNew,
    sortByCount,
    sortByAlphabet,
    deleteSome,
    addNewComment,
    deleteComment,
    editSingleProduct,
} = actions;
