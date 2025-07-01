export interface pageUserIndex {
    users: {
        data: [];
    },
    page_info: pageInfo
    page_data: {
        roles: []
    }
}

//USER CREATE
export interface PropsFormUserCreate {
    name: string;
    email: string;
    roles: number | null;
    password: string;
    password_confirmation: string;
    _method: string;
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
    users: {
        data: userProps
    },
    page_info: pageInfo,
    page_data: {
        roles: []
    }
}



//COLUMNS DATATABLE
export interface columnsItemsUser {
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
    role: string
    password: string;
    password_confirmation: string;
    created_at: string;

}
