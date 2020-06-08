<template>
	<div class="list">
		<div class="list__block">
			<Operation />
		</div>
		<div class="list__block">
			<Table />
		</div>
		<Dialog />
	</div>
</template>

<script>
import Operation from "@/components/merchandise/categoryList/Operation.vue";
import Table from "@/components/merchandise/categoryList/Table.vue";
import Dialog from "@/components/merchandise/categoryList/dialog/Wrap.vue";

export default {
	components: {
		Operation,
		Table,
		Dialog,
	}
};
</script>
