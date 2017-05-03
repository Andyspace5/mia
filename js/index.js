$(function() {
	$(".header a").hover( //头部a标签的样式变化
		function() {
			$(this).addClass("header_active");
		},
		function() {
			$(this).removeClass("header_active");
		}

	)

	$.get("js/nav_shop.json", function(res) { //json添加nav_shop的名字
		$(res[0].nav_shop).each(function(index) {
			$(".nav_shop li a").eq(index).text(res[0].nav_shop[index]);
		})
	})

	$(".nav_shop li a").hover( //nav_shop的样式变化
		function() {
			$(this).addClass("nav_shop_active");
		},
		function() {
			$(this).removeClass("nav_shop_active");
		}
	)

	$(".shopcar a").hover(
		function() {
			$(this).css("border-color", "#ff3893").siblings("span").show();
		},
		function() {
			$(this).css("border-color", "#e5e5e5").siblings("span").hide();
		}
	)

	$(".banner_list li>a").hover( //给banner添加划入样式 并在最后一个呼入时显示ul
		function() {
			$(this).addClass("banner_active");
		},
		function() {
			$(this).removeClass("banner_active");
		}
	)
	$(".a_list li a").css("color", "#666666")
	$(".last_a").parent().mouseover(function() { //ul的样式变化

		$(".a_list").show().find("a").hover(
			function() {
				$(this).closest(".a_list").removeClass("banner_active");
				$(this).removeClass("banner_active").addClass("alist_active").parent().siblings("li").children("a").removeClass("alist_active");

			},
			function() {
				$(this).removeClass("alist_active");
			}
		)
	})

	$(".last_a").parent().mouseleave(function() { //离开时移除样式并隐藏ul
		$(".a_list").hide().find("a").removeClass("alist_active");
	})

	$.get("js/showshop.json", function(res) {
		//json向img插入图片
		$(".showshop img").each(function(index) {

			$(this).attr("src", "img/showshop/" + res[0].img[index]);
		})

		$(".mark li:first-child").addClass("showshop_active");
		var index = 1;
		var timer = setInterval(nextImg, 3000); //banner的图片轮播
		function nextImg() {
			$(".showshop img:eq(" + index + ")").stop(true).animate({
				"opacity": "1"
			}, 1000).siblings("img").stop(true).animate({
				"opacity": "0"
			}, 1000);
			$(".mark li:eq(" + index + ")").addClass("showshop_active").siblings("li").removeClass("showshop_active");
			index++;
			if(index == $(".showshop img").size()) {
				index = 0;
			}
		}

		$(".showshop").mouseover(function() {
			clearInterval(timer);
			$(".mark li").mouseover(function() {
				index = $(this).index();
				nextImg();
			})

		})

		$(".showshop").mouseout(function() {
			clearInterval(timer);
			timer = setInterval(nextImg, 3000);
		})
	})

	$.get("js/allshop.json", function(res) { //json动态创建添加样式
		$(res).each(function(index) {
			//			console.log($(res)[index]);
			//			console.log($(res[index]["h3"]))
			//			console.log($(res[index]["content"]));
			//			console.log(index);
			var content = $("<li></li>");
			var div = $("<div class='content'></div>")
			var h3 = $("<h3><a href='#'>" + $(res[index]["h3"])[0] + "</a></h3>");
			$(div).append($(h3));
			$(res[index]["content"]).each(function(i) {
				//				console.log(i)
				var a = $("<a href='#'>" + this + "</a>")
				$(div).append($(a));
	
			})
			$(content).append(div);
			$(".allshop").append($(content));
	
			$.get("js/moreshop.json", function(res) {
					var more = $("<div class='more'></div>");
					//			console.log($(res[index]["one"]),index);
					if($(res[index])["one"]) {
						var dl = $("<dl></dl>");
						$(res[index]["one"]).each(function(i) {
							var dd = $("<dd>" + $(res[index]["one"])[i]["dd"] + "</dd>");
							var dt = $("<dt></dt>")
							$(res[index]["one"][i]["dt"]).each(function(j) {
								var a = $("<a href='#'>" + $(res[index]["one"])[i]["dt"][j] + "</a>");
								//						console.log($(res["one"])[index]["dt"][i])
								$(dt).append($(a));
	
							})
							$(dl).append($(dd));
							$(dl).append($(dt));
						})
						$(more).append($(dl));
					}
	
					if($(res[index]["two"])) {
	
						var dl = $("<dl></dl>");
						$(res[index]["two"]).each(function(i) {
	
							var dd = $("<dd>" + $(res[index]["two"])[i]["dd"] + "</dd>");
							var dt = $("<dt></dt>")
							$(res[index]["two"][i]["dt"]).each(function(j) {
								var a = $("<a href='#'>" + $(res[index]["two"])[i]["dt"][j] + "</a>");
								//						console.log($(res["two"])[index]["dt"][i])
								$(dt).append($(a));
	
							})
							$(dl).append($(dd));
							$(dl).append($(dt));
						})
						$(more).append($(dl));
					}
	
					if($(res[index]["three"])) {
	
						$(".more dd:last").css("border", "none");
						var dl2 = $("<dl></dl>");
						$(res[index]["three"]).each(function(i) {
	
							var dd = $("<dd>" + $(res[index]["three"])[i]["dd"] + "</dd>");
							var dt = $("<dt></dt>")
							var div = $("<div class='img'></div>")
							$(res[index]["three"][i]["img"]).each(function(j) {
								var a = $("<a href='#'><img src=img/moreshop/" + $(res[index]["three"])[i]["img"][j] + "/></a>");
								//						console.log($(res["two"])[index]["dt"][i])
	
								$(div).append($(a));
								$(dt).append($(div));
	
							})
							$(dl2).append($(dd));
							$(dl2).append($(dt));
						})
						$(more).append($(dl2));
	
					}
					$(".allshop li:eq(" + index + ")").append($(more));
					$(".more:gt(2)").css("top", "-220px")
					$(".more:eq(6)").css("top", "-300px")
					$(".more:eq(7)").css("top", "-400px")
					$(".more a:nth-child(5n+2)").css("color", "#fb69ac")
					$(".allshop a").hover(
						function() { //给全部分类里的a标签添加移入样式
							$(this).addClass("allshop_active")
						},
						function() {
							$(this).removeClass("allshop_active")
						}
					)
				})
		//		$.get("js/moreshop.json",function(res){
		////			
		//	//		
		//			var more = $("<div class='more'></div>");
		//			if ($(res)["one"]) {
		//				var dl = $("<dl></dl>");
		//				$(res["one"]).each(function(index){
		//					var dd = $("<dd>"+$(res["one"])[index]["dd"]+"</dd>");
		//					var dt = $("<dt></dt>")
		//					$(res["one"][index]["dt"]).each(function(i){
		//						var a = $("<a href='#'>"+$(res["one"])[index]["dt"][i]+"</a>");
		////						console.log($(res["one"])[index]["dt"][i])
		//						$(dt).append($(a));
		//						
		//					})
		//					$(dl).append($(dd));
		//					$(dl).append($(dt));
		//				})
		//				$(more).append($(dl));
		//			}
		//			
		//			if ($(res["two"])) {
		//	
		//				var dl = $("<dl></dl>");
		//				$(res["two"]).each(function(index){
		//					
		//					var dd = $("<dd>"+$(res["two"])[index]["dd"]+"</dd>");
		//					var dt = $("<dt></dt>")
		//					$(res["two"][index]["dt"]).each(function(i){
		//						var a = $("<a href='#'>"+$(res["two"])[index]["dt"][i]+"</a>");
		////						console.log($(res["two"])[index]["dt"][i])
		//						$(dt).append($(a));
		//						
		//					})
		//					$(dl).append($(dd));
		//					$(dl).append($(dt));
		//				})
		//				$(more).append($(dl));
		//			}
		//			
		//			if ($(res["three"])) {
		//	
		//				var dl = $("<dl></dl>");
		//				$(res["three"]).each(function(index){
		//					
		//					var dd = $("<dd>"+$(res["two"])[index]["dd"]+"</dd>");
		//					var dt = $("<dt></dt>")
		//					var div =  $("<div class='img'></div>")
		//					$(res["three"][index]["img"]).each(function(i){
		//						var a = $("<a href='#'><img src='img/moreshop/"+ res[index]["three"][i]["img"][j] + "'/></a>");
		////						console.log($(res["two"])[index]["dt"][i])
		//						$(div).append($(a));
		//						$(dt).append($(div));
		//						
		//					})
		//					$(dl).append($(dd));
		//					$(dl).append($(dt));
		//				})
		//				$(more).append($(dl));
		//			}
		//			$(".allshop li:eq("+index+")").append($(more));
		//			
				$(".allshop li").hover(function() {

					$(this).prevAll("li").css("border-right", "1px solid #c5c5c5")
					$(this).prev().children(".content").css({
						"border-bottom": "none"
					})
					$(this).nextAll().css("border-right", "1px solid #c5c5c5")

					$(this).css({
						"border": "1px solid #ccc",
						"border-right": "none",
						"border-left": "2px solid red",
					}).find(".content").css({
						"border": "none"
					}).closest("li").find(".more").show();
				}, function() {
					$(this).css({
						"border": "none"
					}).find(".content").css("border-bottom", "1px dashed #ccc").closest("li").find(".more").hide();

					$(this).prevAll().css("border-right", "none")
					$(this).prev().children(".content").css({
						"border-bottom": "1px dashed #c5c5c5"
					})
					$(this).nextAll().css("border-right", "none")
				})

			})
			//				
		$(".allshop li .content:last").css("border", "none") //消除最后一个content的边框

	})

	$.get("js/heartshop.json", function(res) { //json动态添加热门商品
		$(res[0]["img"]).each(function(index) {

			$(".heartshop_in li img:eq(" + index + ")").attr("src", "img/heartshop/" + res[0]["img"][index]);
		})

	})

	$.get("js/tj.json", function(res) {
		$(res).each(function(index) {
			//			console.log(index)
			//			console.log($(res)[index].title)
			var li = $("<li id='id" + index + "'><a><div class='wenzi'><p class='title'>" + $(res)[index].title + "</p></div></a></li>")
			if($(res)[index]["jianjia"]) {
				//				console.log("zzz");
				var jianjia = $("<p>" + $(res)[index]["jianjia"] + "</p>")
				$(li).find(".wenzi").append(jianjia);
				$(li).find(".title").css("overflow", "hidden")
			}
			var div = $("<div class='buy'><p>¥<a>" + $(res)[index]["xianjia"] + "</a><span>¥" + $(res)[index]["yuanjia"] + "</span><input class='gobuy' type='button' value='立即抢'/></p><p>" + $(res)[index]["renshu"] + "已购买</p></div>")
			$(li).find(".wenzi").append($(div));
			$(li).css({
				"background": "white url(img/tj/" + $(res)[index]["bg"] + ") no-repeat top center",
				"background-size": "217px 200px",
				"cursor": "pointer"
			})
			$(".tjshop").append($(li));
			$(li).hover(
				function() {
					$(li).find(".title").addClass("title_active");
				},
				function() {
					$(li).find(".title").removeClass("title_active");
				}
			)

		})

		$(".gobuy").click(function() {
				if(document.cookie) {
					$(".shopcar .change").text("快去购物车查看宝贝吧!")
				}
				//			console.log($(this).closest("li").attr("id"))
				$.cookie($(this).closest("li").attr("id"), $(this).closest("li").attr("id"), {
					"expires": 7
				});
			})
			//		

	})

	$.get("js/dayshop.json", function(res) {
		$(res).each(function(index) {
			var li = $("<li><div class='dayimg'><img src='img/dayshop/" + res[index]["dayshop"] + "' /></div><div class='topshop'></div></li>")
			$(".dayheart").append($(li));
			$(res[index]["topshop"]).each(function(i) {
				var a = $("<a><div class='img'><img class='tp' src='img/topshop/" + res[index]["topshop"][i] + "' /><img class='mark' src='img/topshop/top" + (i + 1) + ".png' /></div><div class='txt'><p class='title'>" + res[index]["title"][i] +
					"</p><p>¥<b>" + res[index]["xianjia"][i] + "</b><span>¥" + res[index]["yuanjia"][i] + "</p></div></a>")
				$(li).find(".topshop").append($(a));
			})

		})

		$(".dayheart .topshop a").hover(function() {
			$(this).find(".title").addClass("dayheart_active")
		}, function() {
			$(this).find(".title").removeClass("dayheart_active")
		})
	})

	$(".infor ul a").hover(function() {
		$(this).addClass("infor_active")
	}, function() {
		$(this).removeClass("infor_active");
	})

	$(".xg").hover(function() {
		$(".wx_more").show();
	}, function() {
		$(".wx_more").hide();
	})

	$(".end_nav a").hover(function() {
		$(this).addClass("end_active");
	}, function() {
		$(this).removeClass("end_active");
	})

	$(window).bind("scroll", function() {
		//		console.log($(window).scrollTop())
		if($(window).scrollTop() >= 200) {
			$(".easy").css("display", "block")
		} else {
			$(".easy").css("display", "none")
		}
		$(".gotop").click(function() {
			$("html,body").stop(true).animate({
					"scrollTop": "0",
					
				}, 1000)
				//			console.log("zzz")
		})
	})

	$(".phone").hover(function() {
		$(".phoneb").show().stop(true).animate({
			"left": "-158px"
		}, 1000);
	}, function() {
		$(".phoneb").stop(true).hide().css({
			"left": "-258px"
		});
	})

	$(".wxa").hover(function() {
		$(".wxb").show().stop(true).animate({
			"left": "-158px"
		}, 1000);

	}, function() {
		$(".wxb").hide().stop(true).css({
			"left": "-258px"
		});
	})

})