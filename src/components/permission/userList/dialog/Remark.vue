<template>
	<el-form-item label="備註：">
		<el-input
			type="textarea"
			v-model="remark"
			:rows="5"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	computed: {
		...mapFields("user", ["dialogForm.remark"]),
	}
};
</script>
