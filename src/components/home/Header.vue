<template>
	<div class="header">
		<Breadcrumb />
		<Avatar />
	</div>
</template>

<script>
import Breadcrumb from "./Breadcrumb.vue";
import Avatar from "./Avatar.vue";

export default {
	components: {
		Breadcrumb,
		Avatar
	}
};
</script>
