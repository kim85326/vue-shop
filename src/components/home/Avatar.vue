<template>
	<el-dropdown class="avatar">
		<span class="el-dropdown-link">
			<el-avatar icon="el-icon-user-solid"></el-avatar>
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>
				<div @click="logout">
					登出
				</div>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
	methods: {
		...mapActions("auth", ["logout"])
	}
};
</script>
