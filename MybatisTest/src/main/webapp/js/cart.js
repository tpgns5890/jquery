function number_format(amount) {
	return new Intl.NumberFormat('ko-KR', {
		style: 'currency',
		currency: 'KRW'
	}).format(amount);
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function() {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};

let basket = {
	cartCount: 0,//상품갯수.
	cartTotal: 0,
	cartSum:0,
	delCheckedItem: function() {
		// 선택삭제기능.
		$('#basket input[name="buy"]:checked').parentsUntil('#basket').remove();
	},
	delAllItem: function() {
		// 장바구니비우기.
		$('#basket .data').remove();
	},
	reCount: function(){
		basket.cartTotal=0;
		$.each($('.data'), function(){
			basket.cartTotal += Number($(this).find('input[name=p_num1]').val());
		})
		return basket.cartTotal;
	},	
	reCalc: function() {
		// 합계금액 계산.
		basket.cartTotal=0;
		basket.cartSum=0;
		$.each($('.data'), function(){
			basket.cartSum += Number($(this).find('div[class=sum]').attr('value'));
			console.log($(this).find('div[class=sum]').attr('value'));
		})
		return basket.cartSum;
	},
	updateUI: function() {
		// 상품전체갯수, 합계금액 변경.
	},
	plusPNum: function() {
		// 상품수량 변경기능.
		cartCount = Number($(this).prev().val());
		cartPrice = $(this).parent().parent().prev().attr('value');
		if(cartCount < 4){
			cartCount = cartCount + 1;
		}
		$(this).prev().val(cartCount);
		$(this).parent().parent().next().text(number_format(cartCount * cartPrice)).attr('value', cartCount * cartPrice);
	},
	minusPNum: function() {
		// 상품수량 변경기능.
		cartCount = Number($(this).prev().prev().val());
		cartPrice = $(this).parent().parent().prev().attr('value');
		//cartPrice = Number($(this).parent().parent().parent().prev().val())
		if(cartCount > 1){
			cartCount = cartCount - 1;
		}
		$(this).prev().prev().val(cartCount)
		$(this).parent().parent().next().text(number_format(cartCount * cartPrice)).attr('value', cartCount * cartPrice);
	},
	delItem: function() {
		// 삭제버튼.
		$(this).parentsUntil('.basketdiv').remove();
	},
	init: function() {
		// 상품목록 출력.		
		$.ajax({
			url: '../ajaxCartList.do',
			method: 'get',
			dataType: 'json',
			success: function(result) {
				$.each(result, function(prop, item) {
					$('.basketdiv').append(makeProduct(item));
				})
				$("#sum_p_num").text('상품갯수: ' + basket.reCount()).on('change', basket.updateUI)
				$("#sum_p_price").text('합계금액: ' + basket.reCalc() + '원').on('change', basket.updateUI)
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
};

basket.init();
function makeProduct(cart = { no: "", productNm: "", price: 0, img: "" }) {
	return $('<div class="row data"/>').append(
		$('<div class="subdiv"/>').append(
			$('<div class="check"/>').append(
				$('<input type="checkbox" name="buy" value="260" checked=""/>').text('&nbsp;')
			),
			$('<div class="img"/>').append(
				$('<img src="../img/'+cart.img+'" width="60" height="62.45"/>')
			),
			$('<div class="pname"/>').append(
				$('<span/>').text(cart.productNm)
			)
		),
		$('<div class="subdiv"/>').append(
			$('<div class="basketprice" value="'+cart.price+'"/>').append(
				$('<input type="hidden" name="p_price" id="p_price1" class="p_price" value="'+cart.price+'"/>')
			).text(number_format(cart.price)),
			$('<div class="num"/>').append(
				$('<div class="updown"/>').append(
					$('<input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="1">')
					,$('<span/>').text(' ').append($('<i class="fas fa-arrow-alt-circle-up up" value="'+cart.price+'"/>')).on('click', basket.plusPNum)
					,$('<span/>').text(' ').append($('<i class="fas fa-arrow-alt-circle-down down"/>')).on('click', basket.minusPNum)
				)
			),
			$('<div class="sum" value="'+cart.price+'"/>').text(number_format(cart.price))
		),
		$('<div class="subdiv"/>').append(
			$('<div class="basketcmd"/>').append(
				$('<a class="abutton"/>').text("삭제").on('click', basket.delItem)
			)
		)
	);
}