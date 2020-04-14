<template>
	<div class="login">
		<el-card class="box-card login-form">
			<div class="login-form__logo">
				<i class="el-icon-box"></i>
			</div>
			<h2 class="login-form__title">vue-shop</h2>
			<el-form ref="form">
				<el-form-item>
					<el-input
						placeholder="請輸入帳號"
						v-model="username"
						name="username"
					>
						<span slot="prefix">
							<i class="el-icon-user-solid"></i>
						</span>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						placeholder="請輸入密碼"
						v-model="password"
						show-password
						name="password"
					>
						<span slot="prefix">
							<i class="el-icon-lock"></i>
						</span>
					</el-input>
				</el-form-item>
				<el-form-item class="login-form__button-group">
					<el-button
						type="primary"
						class="login-form__button"
					>
						登入
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: ""
		};
	},
};
</script>
