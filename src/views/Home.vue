<template>
	<el-container class="home">
		<el-aside width="180px">
			<Aside />
		</el-aside>
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<UserList></UserList>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from "@/components/home/Aside.vue";
import Header from "@/components/home/Header.vue";
import UserList from "./permission/UserList.vue";

export default {
	components: {
		Aside,
		Header,
		UserList
	}
};
</script>

<style>
.home {
	height: 100%;
}

.el-header {
	background-color: white;
	border-bottom: 1px solid #e6e6e6;
}

.el-aside {
	background-color: #304156;
}

.el-main {
	background-color: white;
}
</style>