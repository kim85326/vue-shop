<template>
	<div class="list">
		<div class="list__block">
			<Operation />
		</div>
		<div class="list__block">
			<Table />
		</div>
	</div>
</template>

<script>
import Operation from "@/components/permission/roleList/Operation.vue";
import Table from "@/components/permission/roleList/Table.vue";

export default {
	components: {
		Operation,
		Table,
	}
};
</script>
