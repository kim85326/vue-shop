<template>
	<el-card
		shadow="never"
		class="search-bar-container"
	>
		<div class="search-bar">
			<div class="search-bar-header">
				<div class="search-bar-title">
					<i class="el-icon-search"></i>
					<span>篩選搜尋</span>
				</div>
				<div class="search-bar-operation">
					<el-button
						size="mini"
						@click="initListQuery"
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
			<div class="search-bar-body">
				<el-form :inline="true">
					<el-form-item label="輸入搜尋：">
						<el-input
							size="small"
							v-model="keyword"
							placeholder="帳號/姓名"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</el-card>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapMutations } from "vuex";

export default {
	computed: {
		...mapFields("user", ["listQuery.keyword"])
	},
	methods: {
		...mapMutations("user", ["initListQuery"]),
		handleSearchList() {
			this.$store.commit("user/setPaginationCurrentPage", 1);
			this.$store.dispatch("user/fetchList");
		},
	}
};
</script>
