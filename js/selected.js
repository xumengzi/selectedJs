/*
	selected.js v1.0.1 created by xumeng 2017/07/06
	支持IE8及以上高级浏览器
	http://xumengzi.top/

	已知bug
	1.Firefox(54)下的window.getSelection()返回值里没有type属性，而chrome(58)，edge等浏览器有这个属性值，比如有Range,None,Caret等。
	2.选择了一段文字，然后继续点击该文字，那么选中的背景没有，然而方法仍然返回数据，所以还是会有弹框出现。
*/

;(function(w){
	function selected(){
		this.version = '1.0.1';
	};
	selected.prototype.args = {
		searchEngine:['bing'],
		newTab: false,
		background: '#fff',
		zIndex: 9999,
	};
	selected.prototype.version = '1.0.1';
	selected.prototype.event = function(){
		var that = this;
		var args = that.args;
		var tar = document.querySelectorAll(".selectedSearch");
		tar = Array.prototype.slice.call(tar);
		for(var i=0;i<tar.length;i++){
			tar[i].addEventListener("mouseover",function(e,i){
				if (e.target.classList[0] == 'selectedSearch') {
					e.target.style.background = '#f5f5f5';
				};
			});
			tar[i].addEventListener("mouseout",function(e){
				if (e.target.classList[0] == 'selectedSearch') {
					e.target.style.background = '#fff';
				};
			});
			tar[i].addEventListener("click",function(e){
				var o = e.target.attributes, 
					engine = o[1].value, 
					txt = o[2].value;
                var urlArr = that.para;
                engine = that.searchArr(engine);
                engine = engine + encodeURI(txt);
                if (args.newTab) {
                	location.href = engine;
                } else{
					window.open(engine);
                }
                that.reSet();
			});
		};

		window.onscroll = function(){
			that.reSet();
		};
	};
	selected.prototype.searchArr = function(e){
		e = e.toLowerCase();
        var url = {
            google: "http://www.google.com/search?hl=zh-CN&q=",
            baidu: "http://www.baidu.com/s?wd=",
            bing: "http://cn.bing.com/search?q=",
            yahoo: "https://us.search.yahoo.com/search?p=",
            sougou: "http://www.sogou.com/sogou?query="
        };
        for (var i in url) {
            if (i == e) {
                e = url[i];
            };
        };
        return e;
	};
	selected.prototype.set = function(args){
		this.args = Object.assign({},this.args,args);
		this.mouseUp();
	};
	selected.prototype.mouseUp = function(){
		var that = this;
		var args = that.args;
		var target = document.getElementsByTagName("body")[0];
		target.addEventListener("mouseup",function(e){
			// e.stopPropagation();
			var tar = e.target;
            var text = null;
            var x = e.pageX;
            var y = e.pageY ;
            if (window.getSelection()) {
            	text = window.getSelection();
            	if (text.toString().length > 0) {
            		that.reSet();
            		var searchEngine = args.searchEngine, list = "";
                    for (var i in searchEngine) {
                        var s = searchEngine[i];
                        (s != "") && (list += "<div class='selectedSearch' _engine=" + s + " title='" + text + "'>使用" + s + "搜索&nbsp;&nbsp;" + (text.toString().substr(0, 10)) + "</div>")
                    };
                    var selectdiv = document.createElement("div");
                    selectdiv.classList.add('selected_div');
                    selectdiv.innerHTML = list ;
                    document.querySelector("body").appendChild(selectdiv);

                    // add styles
                    if (!document.getElementsByClassName("selected_div")) {return};
                    var ele = document.getElementsByClassName("selected_div")[0];
                    for(var i=0;i<ele.childNodes.length;i++){
                    	ele.childNodes[i].style.cssText += 'margin: 4px;padding: 4px;cursor: pointer;';
                    };
                    var cssStr = 'position: absolute;left: '+ x +'px;top: '+ y +'px;color: '+ args.color +';background: '+ args.background +';'+
	                            'border: 1px #ccc solid;border-radius: 4px;font-size: 13px;box-shadow: 1px 1px 2px 2px #ccc;z-index: '+ args.zIndex +'';
                    ele.style.cssText += cssStr;
                    that.init();
            	}else{
            		if (tar.parentNode.classList[0] !== 'selected_div' && tar.parentNode.classList[0] !== 'selectedSearch') {
            			that.reSet();
            		};
            	};
            };
		});
	};
	selected.prototype.reSet = function(){
		var ele = document.querySelector(".selected_div");
    	//remove already exsits
    	ele && ele.remove();
	};
	selected.prototype.init = function(){
		this.event();
	};
	w.selected = new selected();
})(window);