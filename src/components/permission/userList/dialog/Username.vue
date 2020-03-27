<template>
	<el-form-item label="帳號：">
		<el-input
			v-model="username"
			v-validate="{ required: true }"
			name="username"
			:class="{ error: errors.has('username') }"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	inject: ["$validator"],
	computed: {
		...mapFields("user", ["dialogForm.username"]),
	}
};
</script>
