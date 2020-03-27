<template>
	<div>
		<SearchBar />
		<Operation />
		<Table />
		<div class="pagination">
			<Pagination />
		</div>
		<Dialog />
	</div>
</template>

<script>
import SearchBar from "@/components/permission/userList/SearchBar.vue";
import Operation from "@/components/permission/userList/Operation.vue";
import Table from "@/components/permission/userList/Table.vue";
import Pagination from "@/components/permission/userList/Pagination.vue";
import Dialog from "@/components/permission/userList/Dialog.vue";

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
.search-bar-container,
.operation-container {
	margin-bottom: 20px;
}

.search-bar-header,
.operation {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.search-bar-title,
.operation-title {
	display: flex;
}

.search-bar-title i,
.operation-title i {
	margin-right: 6px;
}

.search-bar-body {
	margin-top: 8px;
	padding-left: 32px;
}

.search-bar .el-form--inline .el-form-item {
	margin-bottom: 0;
}

.pagination {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}

.user-dialog .el-dialog {
	width: 540px;
}

.user-dialog .el-input,
.user-dialog .el-textarea {
	width: 250px;
}

.error input {
	border: 1px solid red;
}
</style>