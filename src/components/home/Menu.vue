<template>
	<el-submenu
		v-if="menu.children !== undefined"
		:index="menu.name"
	>
		<template slot="title">
			<i class="el-icon-s-cooperation"></i>
			<span>{{menu.displayName}}</span>
		</template>
		<Menu
			v-for="subMenu in menu.children"
			:menu="subMenu"
			:key="subMenu.name"
		/>
	</el-submenu>
	<LeafMenu
		v-else
		:menu="menu"
	/>
</template>

<script>
import LeafMenu from "./LeafMenu.vue";

export default {
	name: "Menu",
	props: ["menu"],
	components: {
		LeafMenu
	}
};
</script>
