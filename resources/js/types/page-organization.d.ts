export interface pageIndex {
    organizations: {
        data: [];
    },
    page_info: pageInfo
}

//USER CREATE
export interface PropsFormCreate {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    _method: string;
};

//USER EDIT
export interface PropsFormEdit {
    id: number;
    name: string;
    email: string;

    _method: string;
};

export interface pageEdit {
    users: userProps,
    page_info: pageInfo
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

type userProps = {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    created_at: string;

}
