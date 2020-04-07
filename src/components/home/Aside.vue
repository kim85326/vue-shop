<template>
	<div class="aside">
		<el-menu
			default-active="5-1"
			background-color="#304156"
			text-color="#bfcbd9"
			active-text-color="#409eff"
		>
			<el-menu-item index="1">
				<i class="el-icon-s-home"></i>
				<span slot="title">首頁</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-s-cooperation"></i>
					<span>商品</span>
				</template>
				<el-menu-item index="2-1">
					<i class="el-icon-notebook-2"></i>
					<span>商品列表</span>
				</el-menu-item>
				<el-menu-item index="2-2">
					<i class="el-icon-document-add"></i>
					<span>添加商品</span>
				</el-menu-item>
				<el-menu-item index="2-3">
					<i class="el-icon-menu"></i>
					<span>商品分類</span>
				</el-menu-item>
				<el-menu-item index="2-4">
					<i class="el-icon-tickets"></i>
					<span>商品類型</span>
				</el-menu-item>
				<el-menu-item index="2-5">
					<i class="el-icon-price-tag"></i>
					<span>品牌管理</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-s-order"></i>
					<span>訂單</span>
				</template>
				<el-menu-item index="3-1">
					<i class="el-icon-s-claim"></i>
					<span>訂單列表</span>
				</el-menu-item>
				<el-menu-item index="3-2">
					<i class="el-icon-setting"></i>
					<span>訂單設置</span>
				</el-menu-item>
				<el-menu-item index="3-3">
					<i class="el-icon-document-delete"></i>
					<span>退貨申請處理</span>
				</el-menu-item>
				<el-menu-item index="3-4">
					<i class="el-icon-s-tools"></i>
					<span>退貨原因設置</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-s-cooperation"></i>
					<span>營銷</span>
				</template>
				<el-menu-item index="4-1">
					<i class="el-icon-time"></i>
					<span>秒殺活動列表</span>
				</el-menu-item>
				<el-menu-item index="4-2">
					<i class="el-icon-document-add"></i>
					<span>優惠券列表</span>
				</el-menu-item>
				<el-menu-item index="4-3">
					<i class="el-icon-collection-tag"></i>
					<span>品牌推薦</span>
				</el-menu-item>
				<el-menu-item index="4-4">
					<i class="el-icon-document-add"></i>
					<span>新品推薦</span>
				</el-menu-item>
				<el-menu-item index="4-5">
					<i class="el-icon-star-on"></i>
					<span>人氣推薦</span>
				</el-menu-item>
				<el-menu-item index="4-6">
					<i class="el-icon-price-tag"></i>
					<span>專題推薦</span>
				</el-menu-item>
				<el-menu-item index="4-7">
					<i class="el-icon-data-analysis"></i>
					<span>廣告列表</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-s-custom"></i>
					<span>權限</span>
				</template>
				<el-menu-item index="5-1">
					<i class="el-icon-user-solid"></i>
					<span>用戶列表</span>
				</el-menu-item>
				<el-menu-item index="5-2">
					<i class="el-icon-user"></i>
					<span>角色列表</span>
				</el-menu-item>
				<el-menu-item index="5-3">
					<i class="el-icon-menu"></i>
					<span>菜單列表</span>
				</el-menu-item>
				<el-menu-item index="5-4">
					<i class="el-icon-coin"></i>
					<span>資源列表</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
};
</script>
