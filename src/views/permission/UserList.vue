<template>
	<div class="list">
		<div class="list__block">
			<SearchBar />
		</div>
		<div class="list__block">
			<Operation />
		</div>
		<div class="list__block">
			<Table />
		</div>
		<div class="list__pagination">
			<Pagination />
		</div>
		<Dialog />
	</div>
</template>

<script>
import SearchBar from "@/components/permission/userList/searchBar/Wrap.vue";
import Operation from "@/components/permission/userList/Operation.vue";
import Table from "@/components/permission/userList/Table.vue";
import Pagination from "@/components/permission/userList/Pagination.vue";
import Dialog from "@/components/permission/userList/dialog/Wrap.vue";

export default {
	components: {
		SearchBar,
		Operation,
		Table,
		Pagination,
		Dialog,
	}
};
</script>

<style>
.error input {
	border: 1px solid red;
}
</style>