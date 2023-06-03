type StateUpdateFunction<T> = (newState: T) => void;

export interface commentInterface {
    id: number;
    productId: number;
    description: string;
    date: string;
}

export interface SingleProductInterface {
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size: {
        width: number;
        height: number;
    };
    weight: string;
    comments: commentInterface[];
}

export interface SingleProductProps {
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size: {
        width: number;
        height: number;
    };
    weight: string;
    comments: commentInterface[] | [];
    setDeleteModalVisible: StateUpdateFunction<boolean>;
    forRemoving: string;
    setForRemoving: StateUpdateFunction<string>;
    setForRemovingId: StateUpdateFunction<number>;
}

export interface SortMenuProps {
    sortByAlphabet: () => void;
    sortByCount: () => void;
}

export interface AddNewProductModalProps {
    addModalVisible: boolean;
    triggerModal: StateUpdateFunction<boolean>;
}

export interface ProductRemovalModalProps {
    deleteModalVisible: boolean;
    setDeleteModalVisible: StateUpdateFunction<boolean>;
    name: string;
    forRemovingId: number;
}

export interface CommentsSectionProps {
    comms: commentInterface[];
    id: number;
}

export interface NewCommentModalProps {
    setModalVisible: StateUpdateFunction<boolean>;
    modalVisible: boolean;
    id: number;
}

export interface EditProductModalProps {
    modalVisible: boolean;
    setModalVisible: StateUpdateFunction<boolean>;
    product: SingleProductInterface | undefined;
}
