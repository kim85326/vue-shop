<template>
	<el-card shadow="never">
		<div class="operation">
			<div class="operation-title">
				<i class="el-icon-tickets"></i>
				<span>資料列表</span>
			</div>
			<el-button
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
	methods: {
		handleAdd() {
			this.$store.commit("user/setDialogVisible", true);
		},
	}
};
</script>
