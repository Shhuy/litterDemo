使用方法引入src fonts文件和YangFigure文件然后创建数组对象
(键值对方式） 创建一个区域存放轮播图同时需要设置为相对定位。

然后实例化函数YangFigure（区域id,数组对象）；

然后就可以了。
let imgList =  [
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
		]
		var myFigure = new YangFigure("YangFigure",imgList);