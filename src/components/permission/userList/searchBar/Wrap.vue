<template>
	<el-card shadow="never">
		<div class="search-bar">
			<div class="search-bar__header">
				<div class="search-bar__title">
					<i class="el-icon-search"></i>
					<span>篩選搜尋</span>
				</div>
				<div>
					<el-button
						size="mini"
						@click="handleReset"
					>
						重置
					</el-button>
					<el-button
						size="mini"
						type="primary"
						@click="handleSearchList"
					>
						查詢
					</el-button>
				</div>
			</div>
			<div class="search-bar__body">
				<el-form :inline="true">
					<Keyword />
				</el-form>
			</div>
		</div>
	</el-card>
</template>

<script>
import { mapMutations } from "vuex";

import Keyword from "./Keyword.vue";

export default {
	components: {
		Keyword
	},
	methods: {
		...mapMutations("user", ["initListQuery"]),
		handleSearchList() {
			this.$store.commit("user/setPaginationCurrentPage", 1);
			this.$store.dispatch("user/fetchList");
		},
		handleReset() {
			this.initListQuery();
			this.$store.dispatch("user/fetchList");
		}
	}
};
</script>
