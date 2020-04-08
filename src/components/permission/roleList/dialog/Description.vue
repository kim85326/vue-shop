<template>
	<el-form-item label="描述：">
		<el-input
			type="textarea"
			v-model="description"
			:rows="5"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	computed: {
		...mapFields("role", ["dialogForm.description"]),
	}
};
</script>
