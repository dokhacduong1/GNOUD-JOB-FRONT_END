
export const optionsChangeMultiple = [
    {
        label: "Xóa Danh Mục",
        value: "deleted",
    },
    {
        label: "Hoạt Động",
        value: "active",

    },
    {
        label: "Dừng Hoạt Động",
        value: "inactive",

    },
]

export const optionsFilterStartus = [
    {
        label: "Tất Cả",
        value: "",
    },
    {
        label: "Hoạt Động",
        value: "active",

    },
    {
        label: "Dừng Hoạt Động",
        value: "inactive",

    }
]

export const optionsSort = [
    {
        label: 'All',
        options: [
            {
                label: "Tất Cả",
                value: "",
            }

        ],
    },
    {
        label: 'Parent - Children ',
        options: [

            {
                label: "Danh Mục Cha - Con",
                value: "tree-true",
            }
        ],
    },
    {
        label: 'Position',
        options: [
            {
                label: "Vị Trí Tăng Dần",
                value: "position-asc",

            },
            {
                label: "Vị Trí Giảm Giần",
                value: "position-desc",
            },
        ],
    },
    {
        label: 'Title',
        options: [
            {
                label: "Tiêu Đề A-Z",
                value: "title-asc",

            },
            {
                label: "Tiêu Đề Z-A",
                value: "title-desc",

            }
        ],
    },

]