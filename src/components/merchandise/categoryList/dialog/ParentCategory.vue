<template>
	<el-form-item label="上級分類：">
		<el-cascader
			v-model="parentIds"
			:options="dialogParentOptions"
			clearable
			:props="{ checkStrictly: true }"
		></el-cascader>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapFields("category", ["dialogForm.parentIds"]),
		...mapGetters("category", ["dialogParentOptions"])
	},
};
</script>
