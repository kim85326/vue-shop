<template>
	<el-form-item label="信箱：">
		<el-input
			v-model="email"
			v-validate="{ required: true, email: true }"
			name="email"
			:class="{ error: errors.has('email') }"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	inject: ["$validator"],
	computed: {
		...mapFields("user", ["dialogForm.email"]),
	}
};
</script>
