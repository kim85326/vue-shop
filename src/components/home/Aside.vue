<template>
	<div class="aside">
		<el-menu
			:default-active="$route.name"
			background-color="#304156"
			text-color="#bfcbd9"
			active-text-color="#409eff"
			:router="true"
			:unique-opened="true"
		>
			<el-menu-item
				index="Home"
				route="/"
			>
				<i class="el-icon-s-home"></i>
				<span slot="title">首頁</span>
			</el-menu-item>
			<Menu
				v-for="menu in menuList"
				:menu="menu"
				:key="menu.name"
			/>
		</el-menu>
	</div>
</template>

<script>
import menuList from "@/common/menuList";
import Menu from "./Menu.vue";

export default {
	data() {
		return {
			menuList
		};
	},
	components: {
		Menu
	}
};
</script>
