<template>
	<div>
		<div class="wrap">
			<div class="show-box" :style="{width: toWidth+'px', height: toHeight+'px'}">
				<div class="wrapper-box">
					<div v-for="box in showBox" :key="box.id" :style="box.style"></div>
				</div>
			</div>
			<div class="toolbar">
				<div class="i-btn" v-for="ti in toolItem" :key="ti.id" @click="boxSplit(ti.arr)">
					{{ti.item}}
				</div>
			</div>
			<div class="custom-panel" ref="customPanel">
				<ul v-for="(cb, cindex) in customBox" :key="cb.id">
					<li v-for="(sb, sindex) in cb.subBox" :key="sb.id" class="cus-box"
					@click.stop="startCus(sindex, cindex)"
					@mousemove.stop="movePos(sindex, cindex)"
					></li>
				</ul>
				<div class="mab" v-for="ibp in inBoxPanel"
				:key="ibp.id"
				:style="ibp.style"></div>
				<div class="mab mab-active" :style="inBox" v-if="isMove"></div>
			</div>
		</div>
		<button @click="niubi()">qwshuu</button>
	</div>
</template>

<script>
export default {
	name: "toolbar",
	data() {
		return {
			toWidth: 640,
			toHeight: 640,
			toolItem: [
				{
					item: '2左右',
					arr: [[1/2,1,0,0],[1/2,1,0,1/2]]
				},
				{
					item: '2上下',
					arr: [[1,1/2,0,0],[1,1/2,1/2,0]]
				},
				{
					item: '4田字格',
					arr: [[1/2,1/2,0,0],[1/2,1/2,1/2,0],[1/2,1/2,0,1/2],[1/2,1/2,1/2,1/2]]
				},
				{
					item: '其他形状',
					arr: [[1/2,1,0,0],[1/4,1/2,0,1/2],[1/4,1/2,0,3/4],[1/2,1/2,1/2,1/2]]
				},
				{
					item: 5
				}
			],
			showBox: [],
			selectedBox: [],
			selectedItem: {
				width: '0',
				height: '0',
				top: '0',
				left: '0'
			},
			isMove: false,
			startPoint: {},
			endPoint: {},
			movePoint: {},
			customPoint: {},
			customBox: [
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				},
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				},
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				},
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				},
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				},
				{
					subBox: [
						{},
						{},
						{},
						{},
						{},
						{}
					]
				}
			],
			cx: 0,
			cy: 0,
			inBoxPanel: [],
			inBox: {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			},
			spacing: 10,
			boxArea: []
		}
	},
	mounted(){
		document.onmousemove = this.movePoint
	},
	methods: {
		boxSplit(arr){
			this.showBox.length = 0
			for(let i=0;i<arr.length;i++){
				let boxStyle = {
					style: {}
				}
				boxStyle.style.width = this.toWidth * arr[i][0] + 'px'
				boxStyle.style.height = this.toHeight * arr[i][1] + 'px'
				boxStyle.style.top = this.toHeight * arr[i][2] + 'px'
				boxStyle.style.left = this.toWidth * arr[i][3] + 'px'
				this.showBox.push(boxStyle)
			}
		},
		startCus(si, ci){
			this.isMove = !this.isMove
			console.log(si)
			console.log(ci)
			for(let key in this.startPoint){
				delete this.startPoint[key]
			}
			if(this.isMove === true){
				this.startPoint.x = ci
				this.startPoint.y = si
			}
			if(this.isMove === false){
				var temp = {
					style: {
						left: null,
						top: null,
						width: null,
						height: null
					}
				}
				var showTemp = {
					style: {
						left: null,
						top: null,
						width: null,
						height: null
					}
				}
				for(let i in this.inBox){
					temp.style[i] = this.inBox[i]
					showTemp.style[i] = parseInt(this.inBox[i]) / 192 * this.toWidth + 'px'
					// showTemp.style[i] = this.inBox[i] / 192 * this.toWidth
				}				
				this.inBoxPanel.push(temp)
				this.showBox.push(showTemp)
			}
		},
		// getMousePos(event) {
		// 	var e = event || window.event;
		// 	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		// 	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		// 	var x = e.pageX || e.clientX + scrollX;
		// 	var y = e.pageY || e.clientY + scrollY;
		// 	return { 'x': x, 'y': y };
		// },
		movePos(si, ci){
			if(this.isMove){
				if(ci > this.startPoint.x){
					this.movePoint.x = this.startPoint.x
				}else{
					this.movePoint.x = ci
				}

				if(si > this.startPoint.y){
					this.movePoint.y = this.startPoint.y
				}else{
					this.movePoint.y = si
				}
				this.inBox.left = this.movePoint.x / this.customBox[0].subBox.length * 192 + 'px'
				this.inBox.top = this.movePoint.y / this.customBox.length * 192 + 'px'
				this.inBox.width = (Math.abs(ci - this.startPoint.x) + 1) * 32 + 'px'
				this.inBox.height = (Math.abs(si - this.startPoint.y) + 1) * 32 + 'px'
			}
		},
		niubi(){

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrap {
  display: flex;
  div{
	  box-sizing: border-box;
  }
  .show-box {
    position: relative;
    border: 1px solid rgb(141, 134, 134);
    div {
		position: absolute;
		border: 1px solid #46e832;
    }
	.wrapper-box{
		position: relative;
		border: 0!important;
	}
  }
  .toolbar {
    display: flex;
    margin-left: 20px;
    width: 350px;
    height: 100px;
    border: 1px solid #000;
    .i-btn {
      margin-left: 15px;
      margin-top: 15px;
      width: 50px;
      height: 50px;
      border: 1px solid red;
      cursor: pointer;
    }
  }
  .custom-panel {
	position: relative;
    width: 192px;
    height: 192px;
    display: flex;
    flex-wrap: wrap;
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
		li{
			pointer-events:auto;
		}
	}
    .cus-box{
		border: 1px solid red;
		width: 30px;
		height: 30px;
    }
	.selected-box{
		position: absolute;
		background-color: blue;
	}
  }
}
.mab{
	position: absolute;
	border: 1px solid blue;
	width: 30px;
	height: 30px;
	background-color: rgba(0, 0, 205, 0.6);
	pointer-events: auto;
}
.mab-active{
	pointer-events: none;
}
</style>
