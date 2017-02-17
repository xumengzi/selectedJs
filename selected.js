var selected = (function(sec) {
	var sec = {
		events: function() {
			$(window).scroll(function() {
				$("body").find(".search").remove()
			})
		},
		mouseup: function() {
			var that = this;
			$("body").mouseup(function(e) {
				var tar = $(e.target);
				var text = null;
				var parentOffSet = $(this).offset();
				var x = e.pageX - parentOffSet.left;
				var y = e.pageY - parentOffSet.top;
				if (window.getSelection()) {
					text = window.getSelection();
					if (text.toString().length > 0) {
						$("body").find(".search").remove();
						var searchEngine = that.para.searchEngine,
							list = "";
						searchEngine = (searchEngine.length ? searchEngine : ["baidu"]);
						for (var i in searchEngine) {
							var s = searchEngine[i];
							(s != "") && (list += "<div class='singleSearch' _engine=" + s + " title='" + text + "'>使用" + s + "搜索&nbsp;&nbsp;<span>" + (text.toString().substr(0, 10)) + "</span></div>")
						}(list == "") && (list += "<div class='singleSearch' _engine='baidu' title='" + text + "'>使用baidu搜索&nbsp;&nbsp;<span>" + (text.toString().substr(0, 10)) + "</span></div>");
						var seclectdiv = document.createElement("div");
						var searchContent = '<div class="search">' + list + "</div>";
						$("body").append(searchContent);
						$("body .search .singleSearch").hover(function() {
							$(this).css({
								background: "#f5f5f5",
							})
						}, function() {
							$(this).css({
								background: "#fff"
							})
						});
						$("body .search .singleSearch").css({
							margin: "4px",
							padding: "4px",
							cursor: "pointer"
						});
						$("body .search").css({
							position: "absolute",
							left: x + 10,
							top: y + 10,
							background: "#fff",
							border: "1px #ccc solid",
							borderRadius: "4px",
							fontSize: "13px",
							boxShadow: "1px 1px 2px 2px #ccc",
							zIndex: 999
						})
					} else {
						!tar.parents(".search").hasClass("search") && $("body").find(".search").remove()
					}
				}
			})
		},
		jumpUrl: function() {
			var that = this;
			$("body").delegate(".singleSearch", "click", function() {
				var o = $(this),
					engine = o.attr("_engine"),
					txt = o.attr("title");
				var urlArr = that.para;
				engine = that.searchArr(engine);
				engine = engine + encodeURI(txt);
				window.open(engine);
				$("body").find(".search").remove()
			})
		},
		searchArr: function(e) {
			e = e.toLowerCase();
			console.log(e);
			var url = {
				google: "http://www.google.com/search?hl=zh-CN&q=",
				baidu: "http://www.baidu.com/s?wd=",
				bing: "http://cn.bing.com/search?q=",
				yahoo: "https://us.search.yahoo.com/search?p=",
				sougou: "http://www.sogou.com/sogou?query="
			};
			for (var i in url) {
				if (i == e) {
					e = url[i]
				}
			}
			return e
		},
		init: function() {
			this.events();
			this.mouseup();
			this.jumpUrl()
		},
		set: function(para) {
			var that = this;
			that.para = para;
			that.init()
		}
	};
	return sec
})();
