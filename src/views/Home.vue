<template>
	<el-container class="home">
		<el-aside
			width="180px"
			class="home__aside"
		>
			<Aside />
		</el-aside>
		<el-container>
			<el-header class="home__header">
				<Header />
			</el-header>
			<el-main class="home__main">
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from "@/components/home/Aside.vue";
import Header from "@/components/home/Header.vue";

export default {
	components: {
		Aside,
		Header,
	}
};
</script>
