<template>
	<el-breadcrumb
		class="breadcrumb"
		separator="/"
	>
		<el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
		<el-breadcrumb-item><a href="/">權限</a></el-breadcrumb-item>
		<el-breadcrumb-item>用戶列表</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
};
</script>
