export interface pageIndex {
    roles: {
        data: [];
    };
    page_info: pageInfo;
}

//USER CREATE
export interface pageCreate {
    permissions: {
        data: dataProps[];
    };
    page_info: pageInfo;
    page_data: {
        categoryType: [];
    };
}

export interface propsForm {
    id?: number;
    name: string;
    type: string;
    _method: string;
}

//USER EDIT
export interface pageEdit {
    category: {
        data: dataProps;
    };
    page_info: pageInfo;
    page_data: {
        categoryType: [];
    };
}

export interface useFormEdit {
    id: number;
    name: string;
    permission: string[];
}

//COLUMNS DATATABLE
export interface columnsItems {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

// TYPE
type pageInfo = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};

type dataProps = {
    id: number;
    name: string;
    type: string;
};
