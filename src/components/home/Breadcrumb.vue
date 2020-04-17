<template>
	<el-breadcrumb
		class="breadcrumb"
		separator="/"
	>
		<template>
			<el-breadcrumb-item
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="breadcrumb.to"
				:to="index === breadcrumbs.length - 1 ? undefined : breadcrumb.to"
			>
				{{ breadcrumb.name }}
			</el-breadcrumb-item>
		</template>

	</el-breadcrumb>
</template>

<script>
export default {
	data() {
		return {
			breadcrumbs: []
		};
	},
	methods: {
		generateBreadcrumbs() {
			this.breadcrumbs = this.$route.matched.map((route) => ({
				to: route.path,
				name: route.meta.title
			})).slice(1);

			if (this.breadcrumbs[0].name !== "首頁") {
				this.breadcrumbs.unshift({
					to: "/",
					name: "首頁"
				});
			}
		}
	},
	watch: {
		$route() {
			this.generateBreadcrumbs();
		}
	},
	created() {
		this.generateBreadcrumbs();
	}
};
</script>
