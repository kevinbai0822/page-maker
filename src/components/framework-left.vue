<template>
  	<div class="wrap">
		<div class="show-box" :style="{width: toWidth+'px', height: toHeight+'px'}">
			<div v-for="box in showBox" :key="box.id" :style="box.style"></div>
		</div>
		<div class="toolbar">
			<div class="i-btn" v-for="ti in toolItem" :key="ti.id" @click="boxSplit(ti.arr)">
				{{ti.item}}
			</div>
		</div>
		<div class="custom-panel" ref="customPanel">
			<div class="cus-box" v-for="m in 36" :key="m.id" @click="customBox()"></div>
			<div class="selected-box" v-for="sb in selectedBox" :key="sb.id" :style="sb.style"></div>
		</div>
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
			startPoint:{},
			endPoint: {},
			movePoint: {},
			customPoint: {},
		}
	},
	mounted(){
		var cus = this.$refs.customPanel
		this.customPoint.x = cus.offsetLeft
		this.customPoint.y = cus.offsetTop
		this.customPoint.width = cus.clientWidth
		this.customPoint.height = cus.clientHeight
	},
	methods: {
		boxSplit(arr){
			for(let i=0;i<arr.length;i++){
				console.log('sss')
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
		customBox(event){
			this.isMove = !this.isMove
			if(this.isMove){
				console.log('move')
				this.startPoint = this.getMousePos(event)
				this.selectedBox.push(this.selectedItem)
				var swid = 192/6
				var sheg = 192/6
				var dw = this.startPoint.x - this.customPoint.x
				var dy = this.startPoint.y - this.customPoint.y
				this.selectedItem.left = (Math.floor(dw/swid)/6) * 192 + 'px'
				this.selectedItem.top = (Math.floor(dy/sheg)/6) * 192 + 'px'
				document.onmousemove = this.movePos
			}else{
				this.endPoint = this.getMousePos(event)
			}
		},
		getMousePos(event) {
			var e = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var x = e.pageX || e.clientX + scrollX;
			var y = e.pageY || e.clientY + scrollY;
			return { 'x': x, 'y': y };
		},
		movePos(event){
			this.movePoint = this.getMousePos(event)
			var diffX = this.movePoint.x - this.startPoint.x
			var diffY = this.movePoint.y - this.startPoint.y
			this.selectedItem.width = diffX+'px'
			this.selectedItem.height = diffY+'px'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  display: flex;
  .show-box {
    position: relative;
    border: 1px solid rgb(141, 134, 134);
    div {
      position: absolute;
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
</style>
