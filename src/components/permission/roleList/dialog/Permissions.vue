<template>
	<el-form-item label="權限：">
		<el-tree
			show-checkbox
			node-key="name"
			ref="tree"
			name="permissions"
			:class="{error: errors.has('permissions')}"
			:data="permissionList"
			:props="defaultProps"
			:default-checked-keys="this.permissions"
			:default-expand-all="true"
			:check-on-click-node="true"
			@check="handleCheck"
		>
		</el-tree>
	</el-form-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import permissionList from "@/common/permissionList";

export default {
	inject: ["$validator"],

	data() {
		return {
			defaultProps: {
				label: "description",
				children: "children"
			},
			permissionList,
		};
	},

	computed: {
		...mapState({
			permissions: state => state.role.dialogForm.permissions
		}),
	},

	methods: {
		...mapMutations("role", ["setDialogFormPermissions"]),

		checkReadPermission() {
			// 當管理集合被勾選時，讀取權限也需勾選
			const halfCheckedNodes = this.$refs.tree.getHalfCheckedNodes();
			halfCheckedNodes.forEach(node => {
				const readPermission = `${node.name}-read`;
				this.$refs.tree.setChecked(readPermission, true);
			});
		},

		valid(permissions) {
			if (permissions.length === 0) {
				this.$validator.errors.add({
					field: "permissions",
					msg: "permission array empty",
				});
				return;
			}

			this.$validator.errors.remove("permissions");
		},

		handleCheck() {
			this.checkReadPermission();

			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const leafCheckedNodes = checkedNodes.filter((node) => !node.children);
			const permissions = leafCheckedNodes.map((node) => (node.name));

			this.valid(permissions);

			this.setDialogFormPermissions(permissions);
		},
	},

	watch: {
		permissions() {
			this.$refs.tree.setCheckedKeys(this.permissions);
		}
	},
};
</script>
