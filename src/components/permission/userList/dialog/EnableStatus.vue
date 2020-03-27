<template>
	<el-form-item label="是否啟用：">
		<el-radio-group v-model="isEnabled">
			<el-radio :label="true">是</el-radio>
			<el-radio :label="false">否</el-radio>
		</el-radio-group>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	computed: {
		...mapFields("user", ["dialogForm.isEnabled"]),
	}
};
</script>
