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
						v-validate="{ required: true }"
						name="username"
						:class="{ error: errors.has('username') }"
						@keyup.enter.native="handleSubmit"
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
						v-validate="{ required: true }"
						name="password"
						:class="{ error: errors.has('password') }"
						@keyup.enter.native="handleSubmit"
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
						@click="handleSubmit"
					>
						登入
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	$_veeValidate: {
		validator: "new",
	},
	data() {
		return {
			username: "",
			password: ""
		};
	},
	methods: {
		...mapActions("auth", ["login"]),
		handleSubmit() {
			this.login({
				username: this.username,
				password: this.password,
				validator: this.$validator
			});
		}
	}

};
</script>
