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
        folder: "permission"
      },
      {
        name: "RoleList",
        displayName: "角色列表",
        icon: "el-icon-user",
        folder: "permission"
      }
    ]
  }
];

export default menuList;
