<template>
	<el-submenu
		v-if="menu.children !== undefined && hasPermission"
		:index="menu.name"
	>
		<template slot="title">
			<i :class="menu.icon"></i>
			<span>{{menu.displayName}}</span>
		</template>
		<Menu
			v-for="subMenu in menu.children"
			:menu="subMenu"
			:key="subMenu.name"
		/>
	</el-submenu>
	<LeafMenu
		v-else-if="hasPermission"
		:menu="menu"
	/>
</template>

<script>
import LeafMenu from "./LeafMenu.vue";

export default {
	name: "Menu",
	props: ["menu"],
	data() {
		return {
			hasPermission: false,
		};
	},
	components: {
		LeafMenu
	},
	methods: {
		flattenPermissions(menu) {
			const permissions = [];

			menu.children.forEach(subMenu => {
				if (subMenu.children) {
					permissions.concat(this.flattenPermissions(subMenu));
				} else {
					permissions.push(subMenu.permission);
				}
			});

			return permissions;
		},
		async isArrayHasPermission(permissions) {
			let hasPermission = false;

			// eslint-disable-next-line no-restricted-syntax
			for (const permission of permissions) {
				// eslint-disable-next-line no-await-in-loop
				hasPermission = await this.$store.dispatch("auth/hasPermission", permission);
				if (hasPermission) {
					break;
				}
			}

			return hasPermission;
		}
	},
	async created() {
		if (this.menu.children) {
			const allChildrenPermissions = this.flattenPermissions(this.menu);
			if (allChildrenPermissions) {
				this.hasPermission = await this.isArrayHasPermission(allChildrenPermissions);
			}
		} else {
			this.hasPermission = await this.$store.dispatch("auth/hasPermission", this.menu.permission);
		}
	}
};
</script>
