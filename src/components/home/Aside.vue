<template>
	<div class="aside">
		<el-menu
			background-color="#304156"
			text-color="#bfcbd9"
			active-text-color="#409eff"
		>
			<el-menu-item>
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
