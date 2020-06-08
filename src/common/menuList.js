const menuList = [
  {
    name: "PermissionManagement",
    displayName: "權限",
    icon: "el-icon-s-custom",
    children: [
      {
        name: "UserList",
        displayName: "用戶列表",
        icon: "el-icon-user-solid",
        folder: "permission",
        permission: "user-read"
      },
      {
        name: "RoleList",
        displayName: "角色列表",
        icon: "el-icon-user",
        folder: "permission",
        permission: "role-read"
      }
    ]
  },
  {
    name: "MerchandiseManagement",
    displayName: "商品",
    icon: "el-icon-s-goods",
    children: [
      {
        name: "CategoryList",
        displayName: "分類列表",
        icon: "el-icon-menu",
        folder: "merchandise",
        permission: "category-read"
      }
    ]
  }
];

export default menuList;
