# litterDemo
用于上传自己学习中的一个小项目
*** 
* 使用方法引入fonts文件和YangFigure文件，然后实例化函数 `YangFigure` 需要闯入两个参数，第一个用于存放轮播图的区域的DOM对象，第二个是轮播图数组对象
  * 数组对象实例 
  
  `let imgList =  [
		{
			"imagesrc" : "images/5.jpg",
			"linkhref" : "http://www.baidu.com"
		},
		{
			"imagesrc" : "images/6.jpg",
			"linkhref" : "http://www.jd.com"
		},
		{
			"imagesrc" : "images/7.jpg",
			"linkhref" : "http://www.taobao.com"
		},
		{
			"imagesrc" : "images/8.jpg",
			"linkhref" : "http://www.aliyun.com"
		},
		{
			"imagesrc" : "images/9.jpg",
			"linkhref" : "http://www.baixiu.com"
		},
		]`
    * 实例化 
    
    `var myFigure = new YangFigure("YangFigure",imgList);`
