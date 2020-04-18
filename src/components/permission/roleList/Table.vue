<template>
	<el-table
		:data="roles"
		border
		style="width: 100%"
		v-loading="isListLoading"
	>
		<el-table-column
			prop="id"
			label="編號"
			width="70"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="name"
			label="角色名稱"
			width="250"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="description"
			label="描述"
			min-width="250"
			align="center"
		>
		</el-table-column>
		<el-table-column
			label="建立時間"
			width="180"
			align="center"
		>
			<template slot-scope="scope">
				{{scope.row.createdTime | moment("YYYY-MM-DD HH:mm:ss")}}
			</template>
		</el-table-column>
		<el-table-column
			v-if="hasUpdatePermission || hasDeletePermission"
			label="操作"
			width="120"
			align="center"
		>
			<template slot-scope="scope">
				<el-button
					v-if="hasUpdatePermission"
					size="mini"
					type="text"
					@click="handleUpdate(scope.row)"
				>
					編輯
				</el-button>
				<el-button
					v-if="hasDeletePermission"
					size="mini"
					type="text"
					@click="deleteRole(scope.row)"
				>
					刪除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			hasUpdatePermission: false,
			hasDeletePermission: false,
		};
	},

	computed: {
		...mapState("role", ["roles", "isListLoading"])
	},

	methods: {
		...mapActions("role", [
			"deleteRole",
		]),

		handleUpdate(row) {
			this.$store.commit("role/setDialogVisible", true);
			this.$store.commit("role/setDialogForm", { ...row });
		},
	},

	async created() {
		this.$store.dispatch("role/fetchRoles");
		this.hasUpdatePermission = await this.$store.dispatch("auth/hasPermission", "role-update");
		this.hasDeletePermission = await this.$store.dispatch("auth/hasPermission", "role-delete");
	}
};
</script>
