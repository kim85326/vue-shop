<template>
	<el-table
		:data="categories"
		border
		style="width: 100%"
		v-loading="isListLoading"
	>
		<el-table-column
			prop="id"
			label="編號"
			width="120"
			align="center"
		>
		</el-table-column>
		<el-table-column
			prop="name"
			label="名稱"
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
	</el-table>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState("category", ["categories", "isListLoading"])
	},

	async created() {
		this.$store.dispatch("category/fetchCategories");
	}
};
</script>
