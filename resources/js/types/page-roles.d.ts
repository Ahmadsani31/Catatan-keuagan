export interface pageIndex {
    roles: {
        data: [];
    },
    page_info: pageInfo
}

//USER CREATE
export interface pageCreate {
    permissions: {
        data: dataProps[];
    },
    page_info: pageInfo
}

export interface PropsFormCreate {
    name: string;
    permission: number[];
};

//USER EDIT
export interface PropsFormUserEdit {
    id: number;
    name: string;
    email: string;
    roles: string;
    _method: string;
};

export interface pageUserEdit {
    users: userProps,
    page_info: pageInfo,
    page_data: {
        roles: []
    }
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
}

type dataProps = {
    id: number;
    name: string;
}
