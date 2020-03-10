<template>
	<div>
		<el-card
			shadow="never"
			class="filter-container"
		>
			<div class="filter">
				<div class="filter-header">
					<div class="filter-title">
						<i class="el-icon-search"></i>
						<span>篩選搜尋</span>
					</div>
					<div class="filter-operation">
						<el-button size="mini">
							重置
						</el-button>
						<el-button
							size="mini"
							type="primary"
						>
							查詢
						</el-button>
					</div>
				</div>
				<div class="filter-body">
					<el-form
						:inline="true"
						:model="listQuery"
					>
						<el-form-item label="輸入搜尋：">
							<el-input
								size="small"
								v-model="listQuery.keyword"
								placeholder="帳號/姓名"
							></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</el-card>
		<el-card
			shadow="never"
			class="operation-container"
		>
			<div class="operation">
				<div class="operation-title">
					<i class="el-icon-tickets"></i>
					<span>資料列表</span>
				</div>
				<el-button
					size="mini"
					@click="handleAdd"
				>
					新增
				</el-button>
			</div>
		</el-card>
		<el-table
			:data="tableData"
			border
			style="width: 100%"
		>
			<el-table-column
				prop="id"
				label="編號"
				width="70"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="username"
				label="帳號"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="130"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="email"
				label="信箱"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="createdTime"
				label="建立時間"
				width="180"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="lastestLoginTime"
				label="最後登入"
				width="180"
				align="center"
			>
			</el-table-column>
			<el-table-column
				label="是否啟用"
				width="120"
				align="center"
			>
				<template slot-scope="scope">
					<el-switch v-model="scope.row.isEnabled">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="180"
				align="center"
			>
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="text"
					>
						分配角色
					</el-button>
					<el-button
						size="mini"
						type="text"
						@click="handleUpdate(scope.row)"
					>
						編輯
					</el-button>
					<el-button
						size="mini"
						type="text"
					>
						刪除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination
				background
				:current-page="pagination.currentPage"
				:page-sizes="[10, 15, 20]"
				:page-size="pagination.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"
			>
			</el-pagination>
		</div>
		<el-dialog
			:title="isUpdateMode? '編輯用戶' : '新增用戶'"
			:visible.sync="isUserDialogVisible"
			class="user-dialog"
		>
			<el-form
				ref="form"
				:model="userForm"
				size="small"
				label-width="150px"
			>
				<el-form-item label="帳號：">
					<el-input v-model="userForm.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名：">
					<el-input v-model="userForm.name"></el-input>
				</el-form-item>
				<el-form-item label="信箱：">
					<el-input v-model="userForm.email"></el-input>
				</el-form-item>
				<el-form-item label="密碼：">
					<el-input
						type="password"
						v-model="userForm.password"
					></el-input>
				</el-form-item>
				<el-form-item label="備註：">
					<el-input
						type="textarea"
						v-model="userForm.remark"
						:rows="5"
					></el-input>
				</el-form-item>
				<el-form-item label="是否啟用：">
					<el-radio
						v-model="userForm.isEnabled"
						:label="true"
					>是</el-radio>
					<el-radio
						v-model="userForm.isEnabled"
						:label="false"
					>否</el-radio>
				</el-form-item>
			</el-form>
			<div
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					size="small"
					@click="isUserDialogVisible = false"
				>取 消</el-button>
				<el-button
					size="small"
					type="primary"
					@click="handleSubmitUserDialog"
				>確 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const defaultUserForm = {
	id: 0,
	username: "",
	name: "",
	email: "",
	password: "",
	remark: "",
	isEnabled: true
};

export default {
	data() {
		return {
			listQuery: {
				keyword: ""
			},
			tableData: [
				{
					id: 1,
					username: "hello123",
					name: "李正赫",
					email: "hello123@gmail.com",
					password: "777777777",
					createdTime: "2018-09-29 13:55:30",
					lastestLoginTime: "2018-09-29 13:55:39",
					isEnabled: true,
					remark: "朝鮮人民軍總政治局局長的小兒子，現任民警大隊第五中隊大尉中隊長"
				},
				{
					id: 2,
					username: "elaine123",
					name: "尹世理",
					email: "elaine@gmail.com",
					password: "qwertyu",
					createdTime: "2019-10-06 15:02:51",
					lastestLoginTime: "2019-10-06 15:53:51",
					isEnabled: true,
					remark: "韓國女王集團會長的小女兒"
				},
				{
					id: 3,
					username: "hi123",
					name: "徐丹",
					email: "h123@gmail.com",
					password: "zxcvbnmsdfghjkertyuio",
					createdTime: "2018-09-29 13:55:30",
					lastestLoginTime: null,
					isEnabled: false,
					remark: ""
				},
				{
					id: 50,
					username: "ssssssskkkkkkkkk123",
					name: "阿爾貝托",
					email: "dddddeeeeeeeeeegggggg123@gmail.com",
					password: "1qaz2wsx3edc",
					createdTime: "2019-04-20 12:45:16",
					lastestLoginTime: null,
					isEnabled: true,
					remark: "英籍企業家，打算與世理結婚"
				}
			],
			pagination: {
				total: 17,
				pageSize: 2,
				currentPage: 1
			},
			isUserDialogVisible: false,
			userForm: defaultUserForm
		};
	},
	methods: {
		handleAdd() {
			this.isUserDialogVisible = true;
			this.userForm = defaultUserForm;
		},
		handleUpdate(row) {
			this.isUserDialogVisible = true;
			this.userForm = row;
		},
		handleSubmitUserDialog() {
			this.$confirm("是否要確認?", "提示", {
				confirmButtonText: "確認",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					if (this.isUpdateMode === false) {
						// TODO: 新增使用者
						this.$message({
							message: "新增成功！",
							type: "success"
						});
						this.isUserDialogVisible = false;
						// TODO: 重新取得列表
					} else {
						// TODO: 更新使用者
						this.$message({
							message: "編輯成功！",
							type: "success"
						});
						this.isUserDialogVisible = false;
						// TODO: 重新取得列表
					}
				});
		}
	},
	computed: {
		isUpdateMode() {
			return this.userForm.id !== 0;
		}
	}
};
</script>

<style>
.filter-container,
.operation-container {
	margin-bottom: 20px;
}

.filter-header,
.operation {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.filter-title,
.operation-title {
	display: flex;
}

.filter-title i,
.operation-title i {
	margin-right: 6px;
}

.filter-body {
	margin-top: 8px;
	padding-left: 32px;
}

.filter .el-form--inline .el-form-item {
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

.user-dialog input,
.user-dialog textarea {
	width: 250px;
}
</style>