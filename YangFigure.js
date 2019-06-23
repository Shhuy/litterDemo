function YangFigure(element, imgList, speed) {
	this.element = document.getElementById(element);
	this.imgList = imgList;
	this.speed = speed || 70;
	if(!this.element || !this.imgList) {
		return "数据传入错误！";
	}

			// 初始化生成相应的HTML节点
			YangFigure.prototype.init = function() {
				let ulObj  = `<ul id = "FigureImg">`;
				this.imgList.forEach((item) =>{
					ulObj+= `<li>
					<a href = "${item.linkhref}">
					<img src = "${item.imagesrc}" width = "${this.element.offsetWidth}}" height = "${this.element.offsetHeight}" alt = "图片加载失败">
					</a>
					</li>`;
				});
				// 无缝轮播图生成最后一张图片和第一张图片相同
				ulObj+= `<li>
				<a href = "${this.imgList[0].linkhref}">
				<img src = "${this.imgList[0].imagesrc}" width = "${this.element.offsetWidth}}" height = "${this.element.offsetHeight}" alt = "图片加载失败">
				</a>
				</li>`;
				ulObj+= `</ul>`;
				// 生成下面的小圆点
				let CircleRowLi = "";
				imgList.forEach(function(index,item) {
					if(item === 0) {
						CircleRowLi+="<li class = 'active'></li>"
					}else {
						CircleRowLi+="<li></li>"
					}
				});
				ulObj+= `<div><ul id = "CircleRow">${CircleRowLi}</ul></div>`;
				// 生成左右模板
				ulObj+=`<div id = "row"><span id = "row_left"></span><span id = "row_right"></span></div>`
				this.element.innerHTML = ulObj;
				// 获取以前的样式
				// let OldStyle = document.styleSheets[0].rules[1].cssText;
				// 创建一个新的style	
				let YangStyle = document.createElement("style");
				YangStyle.setAttribute("type","text/css");
				// 定义样式
				let Totalstyle  = `*{margin: 0;padding: 0;}@font-face {font-family: 'icomoon';
				src:  url('Yangfonts/icomoon.eot?do3pnz');
				src:  url('Yangfonts/icomoon.eot?do3pnz#iefix') format('embedded-opentype'),
				url('Yangfonts/icomoon.ttf?do3pnz') format('truetype'),
				url('Yangfonts/icomoon.woff?do3pnz') format('woff'),
				url('Yangfonts/icomoon.svg?do3pnz#icomoon') format('svg');
				font-weight: normal;
				font-style: normal;
			}
			#FigureImg {
				position: absolute;
				top: 0;
				left: 0;
				width: ${(this.imgList.length + 1) * this.element.offsetWidth}px;
				height: ${this.element.offsetHeight}px;
			}
			#FigureImg li {
				float: left;
				list-style: none;
			}
			#CircleRow {
				position: absolute;
				top: 90%;
				left: 45%;
			}

			#CircleRow li {
				float: left;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: #fff;
				margin-right: 5px;
				list-style: none;
				cursor: pointer;
			}
			.active {
				background-color: red!important;
			}
			#row {
				display: none;
				position:absolute;
				top: 50%;
				margin-top: -20px;
				left: 0;
				width: ${this.element.offsetWidth}px;
				height: 40px;
				z-index: 666;
				box-sizing: border-box;
			}
			#row span {
				width: 30px;
				height: 40px;
				line-height: 40px;
				font-family: "icomoon";
				font-size: 22px;
				background-color: #000;
				text-align: center;
				color: #fff;
				opacity: 0.5;
				cursor: pointer;
			}
			#row_left {
				float: left;
			}
			#row_right {
				float: right;
			}
			#YangFigure:hover #row {
				display: block;
			}`;
			try{
       		 //for Chrome Firefox Opera Safari
        	YangStyle .appendChild(document.createTextNode(Totalstyle));
   				 }catch(ex){
       		 //for IE
        	style.styleSheet.cssText = Totalstyle;
  			  }

			 document.getElementsByTagName('head')[0].appendChild(YangStyle);
		}
		YangFigure.prototype.End = function() {
			let element = this.element;
				// 找到包裹图片的Ul
				let ImgUlObj = document.getElementById("FigureImg");
				// 找到所有的li
				let ImgLiObj = ImgUlObj.getElementsByTagName("li");
				// 找到下面小圆点
				let CircleRowObj = document.getElementById("CircleRow").getElementsByTagName("li");
				// 找到最外边框
				let FigureObj = document.getElementById("YangFigure");
				// 找到左右按钮
				let ButtonLeft = document.getElementById("row_left");
				let ButtonRight = document.getElementById("row_right");
				// 定义一个图片当前索引值
				let index = 0;
				// 首先为每个li绑定一个点击相应事件
				for(var i = 0; i < CircleRowObj.length; i++) {
					CircleRowObj[i].onclick = (function(i) {
						return function() {
							index = i;
							// 获取需要移动的位置
							let lastLeft = -i * element.offsetWidth;
							MoveTool(ImgUlObj,lastLeft);
							ChangeCircleActiv(CircleRowObj,i);
						}
					})(i);
				}
				// 为左右按钮添加点击事件
				ButtonLeft.onclick = function() {
					if(index == 0) {
						index = ImgLiObj.length -1;
						ImgUlObj.style.left = - FigureObj.offsetWidth * (ImgLiObj.length - 1) + "px";
					}
					index--;
					MoveTool(ImgUlObj, - index * element.offsetWidth);
					ChangeCircleActiv(CircleRowObj,index);
				}
				// 右按键移动事件
				var turnRight = function() {
					if(index == ImgLiObj.length -1) {
						index = 0;
						ImgUlObj.style.left = "0px";
					}
					index++;
					MoveTool(ImgUlObj,- index * element.offsetWidth);
					ChangeCircleActiv(CircleRowObj,index);
				}
				// 右按钮点击事件
				ButtonRight.onclick = turnRight;
				// 自动轮播
				element.timerAuto = setInterval(function() {
					turnRight();
				},2000);
				// 为外边大框绑定鼠标覆盖事件
				FigureObj.onmouseenter = function() {
					if(element.timerAuto) {
						clearInterval(element.timerAuto);
					}
				}
				FigureObj.onmouseleave = function() {
					element.timerAuto = setInterval(function() {
						turnRight();
					},2000);
				}
				// 小圆点变红样式
				function ChangeCircleActiv(CircleRowObj,number) {
					for(var i = 0; i < CircleRowObj.length; i++) {
						CircleRowObj[i].removeAttribute("class");
					}
					if(number == ImgLiObj.length -1) {
						number = 0;
					}
					CircleRowObj[number].setAttribute("class","active");
				}

				// 移动函数
				function MoveTool(element,lastLeft,speed) {
					speed = speed || 70;
				// 获取到当前元素的左边距
				let currentLeft = element.offsetLeft;
				let content = document.getElementById("YangFigure");
				// 判断移动距离进而改变移动速度
				if(Math.abs(lastLeft - currentLeft) > content.offsetWidth) {
					speed = 70;
				}
				if(Math.abs(lastLeft - currentLeft) >= content.offsetWidth * 2) {
					speed = 140;
				}
				if(Math.abs(lastLeft - currentLeft) >= (content.offsetWidth * 3)) {
					speed = 200;
				}
				if(element.timer) {
					clearInterval(element.timer);
				}
				// 开启定时器
				element.timer = setInterval(function() {
					currentLeft = element.offsetLeft;
					if(Math.abs(lastLeft - currentLeft) > speed) {
						element.style.left = (lastLeft - currentLeft) > 0 ? currentLeft + speed + "px" : currentLeft - speed + "px";
					}else {
						element.style.left = lastLeft + "px";
						clearInterval(element.timer);
					}
				},40);
			}
		}
		this.init();
		this.End();
	}
