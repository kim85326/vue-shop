<template>
	<el-table
		:data="users"
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
			prop="username"
			label="帳號"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="name"
			label="姓名"
			width="130"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="email"
			label="信箱"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="createdTime"
			label="建立時間"
			width="180"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="latestLoginTime"
			label="最後登入"
			width="180"
			align="center"
		>
		</el-table-column>
		<el-table-column
			label="是否啟用"
			width="120"
			align="center"
		>
			<template slot-scope="scope">
				<el-switch
					:disabled="scope.row.username === currentUser.username"
					:value="scope.row.isEnabled"
					@change="toggleEnabled(scope.row)"
				>
				</el-switch>
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
					v-if="hasDeletePermission && (scope.row.username !== currentUser.username)"
					size="mini"
					type="text"
					@click="deleteUser(scope.row)"
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
		...mapState("auth", ["currentUser"]),
		...mapState("user", ["users", "isListLoading"])
	},
	methods: {
		...mapActions("user", [
			"toggleEnabled",
			"deleteUser",
		]),
		handleUpdate(row) {
			this.$store.commit("user/setDialogVisible", true);
			this.$store.commit("user/setDialogForm", { ...row });
		},
	},
	async created() {
		this.$store.dispatch("user/fetchList");
		this.hasUpdatePermission = await this.$store.dispatch("auth/hasPermission", "user-update");
		this.hasDeletePermission = await this.$store.dispatch("auth/hasPermission", "user-delete");
	}
};
</script>
