<template>
	<div>
		<el-table
			ref="categoryTable"
			:data="categories"
			border
			style="width: 100%"
			v-loading="isListLoading"
			row-key="id"
		>
			<el-table-column
				label=""
				width="80"
			>
			</el-table-column>
			<el-table-column
				label="級別"
				width="120"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag
						size="medium"
						v-if="scope.row.level === 1"
					>
						一級
					</el-tag>
					<el-tag
						size="medium"
						type="success"
						v-else-if="scope.row.level === 2"
					>
						二級
					</el-tag>
					<el-tag
						size="medium"
						type="warning"
						v-else
					>
						三級
					</el-tag>
				</template>
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
						v-if="hasDeletePermission && scope.row.children.length === 0"
						size="mini"
						type="text"
						@click="deleteCategory(scope.row)"
					>
						刪除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<el-button
				type="mini"
				@click="expandAll"
			>
				全部展開
			</el-button>
			<el-button
				type="mini"
				@click="collapseAll"
			>
				全部收起
			</el-button>
		</div>
	</div>
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
		...mapState("category", ["categories", "isListLoading"])
	},

	methods: {
		...mapActions("category", [
			"deleteCategory",
		]),

		handleUpdate(row) {
			this.$store.commit("category/setDialogVisible", true);
			// 目前系統限制只可以修改分類名稱
			this.$store.commit("category/setDialogForm", {
				id: row.id,
				name: row.name,
			});
		},

		handleRowExpand(items, isExpand) {
			items.forEach((item) => {
				this.$refs.categoryTable.toggleRowExpansion(item, isExpand);

				if (item.children) {
					this.handleRowExpand(item.children, isExpand);
				}
			});
		},

		expandAll() {
			this.handleRowExpand(this.categories, true);
		},

		collapseAll() {
			this.handleRowExpand(this.categories, false);
		}
	},

	async created() {
		this.$store.dispatch("category/fetchCategories");
		this.hasUpdatePermission = await this.$store.dispatch("auth/hasPermission", "category-update");
		this.hasDeletePermission = await this.$store.dispatch("auth/hasPermission", "category-delete");
	}
};
</script>
