<template>
	<el-card shadow="never">
		<div class="operation">
			<div class="operation__title">
				<i class="el-icon-tickets"></i>
				<span>資料列表</span>
			</div>
			<el-button
				v-if="hasAddPermission"
				size="mini"
				@click="handleAdd()"
			>
				新增
			</el-button>
		</div>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			hasAddPermission: false,
		};
	},
	methods: {
		handleAdd() {
			this.$store.commit("user/setDialogVisible", true);
		},
	},
	async created() {
		this.hasAddPermission = await this.$store.dispatch("auth/hasPermission", "user-add");
	}
};
</script>
