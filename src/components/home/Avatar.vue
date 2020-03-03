<template>
	<el-dropdown>
		<span class="el-dropdown-link">
			<el-avatar icon="el-icon-user-solid"></el-avatar>
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>登出</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
};
</script>

<style>
.el-dropdown-link {
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>