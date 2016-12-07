$(function() {
	$(".header a").hover( //头部a标签的样式变化
		function() {
			$(this).addClass("header_active");
		},
		function() {
			$(this).removeClass("header_active");
		}

	)

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
			$("html body").stop(true).animate({
					"scrollTop": "0"
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

	if(document.cookie) {
		$(".kong").hide().siblings("table").show();

		console.log(document.cookie)
		var arr = document.cookie.split("; ");
		var myid = [];
		for(var i = 0; i < arr.length; i++) {
			// name1=1
			myid[i] = arr[i].split("=")[0];
			// 找到了cookie中与mKey对应的value 返回[key,value]
		}

		//		console.log(myid)
		$.get("js/tj.json", function(res) {
			$(myid).each(function(i) {
				//				console.log(myid[i])
				$(res).each(function(index) {
					//					console.log($(myid)[i])
					//					console.log($(res)[index]["id"])
					if($(myid)[i] == $(res)[index]["id"]) {
						var tr = $("<tr><td><input class='ck' type='checkbox'/></td><td class='tdshop'><img src='img/tj/" + $(res)[index]['bg'] + "'/><span><a href='#'>" + $(res)[index]['title'] + "</a></span></td><td class='xianjia'>" + $(res)[index]['xianjia'] + "</td><td class='yuanjia'>" + $(res)[index]['yuanjia'] + "</td><td><a class='rm' id='" + $(myid)[i] + "'>删除</a></td></tr>")
							//						$("tbody .tdshop a").text($(res)[index]["title"]);
							//						$("tbody .tdshop img").attr("src","img/tj/"+$(res)[index]["bg"])
						$("table tbody").append(tr);
						//						console.log($("tbody"))

					}

				})

			})
			$("table a").hover(function() {
				$(this).addClass("tab_active");
			}, function() {
				$(this).removeClass("tab_active");
			})

			$(".rm").click(function() {
				console.log($(this).attr("id"));
				$.removeCookie($(this).attr("id"), {
					"expires": -1
				})
				$(this).closest("tr").remove();

				if(document.cookie == "") {
					$("table").hide().siblings(".kong").show()
					$(".pay").hide();
				}
			})

			$(":checkbox:first").click(function() {

				if($(":checkbox:first").prop("checked")) {
					$(":checkbox").prop("checked", "checked");
				} else {
					$(":checkbox").prop("checked", false);
				}
			})

		})

	} else {
		$(".pay").hide();
	}

})