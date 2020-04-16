<template>
	<el-menu-item
		:index="menu.name"
		:route="menu"
	>
		<i :class="menu.icon">
		</i>
		<span>{{menu.displayName}}</span>
	</el-menu-item>
</template>

<script>
export default {
	props: ["menu"]
};
</script>
