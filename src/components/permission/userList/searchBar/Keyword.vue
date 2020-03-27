<template>
	<el-form-item label="輸入搜尋：">
		<el-input
			size="small"
			v-model="keyword"
			placeholder="帳號/姓名"
		></el-input>
	</el-form-item>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
	computed: {
		...mapFields("user", ["listQuery.keyword"])
	},
};
</script>
