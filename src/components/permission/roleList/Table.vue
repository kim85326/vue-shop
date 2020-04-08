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
			prop="createdTime"
			label="建立時間"
			width="180"
			align="center"
		>
		</el-table-column>
		<el-table-column
			label="操作"
			width="120"
			align="center"
		>
			<template>
				<el-button
					size="mini"
					type="text"
				>
					編輯
				</el-button>
				<el-button
					size="mini"
					type="text"
				>
					刪除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState("role", ["roles", "isListLoading"])
	},
	created() {
		this.$store.dispatch("role/fetchRoles");
	}
};
</script>
