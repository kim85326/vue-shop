<template>
	<el-pagination
		background
		:current-page="pagination.currentPage"
		:page-sizes="pagination.pageSizes"
		:page-size="pagination.pageSize"
		layout="total, sizes, prev, pager, next, jumper"
		:total="pagination.total"
		@size-change="handlePageSizeChange"
		@current-change="handleCurrentPageChange"
	>
	</el-pagination>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState("user", ["pagination"])
	},
	methods: {
		handlePageSizeChange(pageSize) {
			this.$store.commit("user/setPaginationPageSize", pageSize);
			this.$store.commit("user/setPaginationCurrentPage", 1);
			this.$store.dispatch("user/fetchList");
		},
		handleCurrentPageChange(page) {
			this.$store.commit("user/setPaginationCurrentPage", page);
			this.$store.dispatch("user/fetchList");
		},
	}
};

</script>
