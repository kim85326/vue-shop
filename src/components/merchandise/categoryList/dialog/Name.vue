<template>
	<el-form-item label="名稱：">
		<el-input
			v-model="name"
			v-validate="{ required: true }"
			name="name"
			:class="{ error: errors.has('name') }"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	inject: ["$validator"],

	computed: {
		...mapFields("category", ["dialogForm.name"]),
	}
};
</script>
