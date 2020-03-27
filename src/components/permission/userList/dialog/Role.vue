<template>
	<el-form-item label="角色：">
		<el-select
			v-model="roleId"
			v-validate="{ required: true }"
			name="roleId"
			:class="{ error: errors.has('roleId') }"
			placeholder=""
		>
			<el-option
				v-for="role in selectableRoles"
				:key="role.id"
				:label="role.name"
				:value="role.id"
			>
			</el-option>
		</el-select>
	</el-form-item>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
	inject: ["$validator"],
	computed: {
		...mapState("role", {
			selectableRoles: (state) => state.rolesSummaries
		}),
		...mapFields("user", {
			roleId: "dialogForm.role.id",
		}),
	},
	created() {
		this.$store.dispatch("role/fetchSummaries");
	}
};
</script>
