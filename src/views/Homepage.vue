<template>
	<header>
		<form class="head">
			<img  class="Microphone" src="../images/话筒.png" >
			<input type="text" class="search">
			<img class="sound" src="../images/声音 .png" height="25" width="27" alt="">
		</form>
	</header>
</template>

<script>	
</script>

<style>
	.head{
		text-align: center;
		background-color: #CF3D38;
		padding: 10px;
	}
	.search{
		width: 280px;
		outline:none;
		padding-left: 5px;
		-moz-border-radius: 11px;
		-khtml-border-radius: 11px;
		-webkit-border-radius: 11px;
		border-radius: 11px;
	}
	.search_box{
		text-align: center;
	}
	.head .Microphone{
		float: left;
		height: 25px;
		width: 25px;
	}
	.head .sound{
		width: 20px;
		height: 25px;
		float: right;
	}
</style>