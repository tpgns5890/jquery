/**
 *  ajaxjquery.js
 */
console.log('ajaxjquery')

$(function() {
	// 도서목록 json 타입 -> 화면에 출력.
	$.ajax({
		url: 'ajaxBookList.do',
		method: 'get',
		dataType: 'json',
		success: function(result) {
			$.each(result, function(prop, item) {
				$('#list').append(makeTr(item));
			})

			//상세보기(마우스 오버)
			$("#list tr").mouseover(function() {
				let code = $(this).children().eq(0).text();
				let title = $(this).children().eq(1).text();
				let author = $(this).children().eq(2).text();
				let press = $(this).children().eq(3).text();
				let price = $(this).children().eq(4).text();

				let book = { bookCode: code, bookTitle: title, bookAuthor: author, bookPress: press, bookPrice: price };

				$.ajax({
					url: 'ajaxBookSelect.do',
					method: 'post',
					contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					data: book,
					dataType: 'json',
					success: function(result) {
						$('#content span:nth-child(2)').eq(0).text(result.bookCode);
						$('#content span:nth-child(2)').eq(1).text(result.bookTitle);
						$('#content span:nth-child(2)').eq(2).text(result.bookAuthor);
						$('#content span:nth-child(2)').eq(3).text(result.bookPress);
						$('#content span:nth-child(2)').eq(4).text(result.bookPrice);
					},
					error: function(error) {
						console.log(error);
					}
				})
			});
		},
		error: function(error) {
			console.log(error);
		}
	});
	$('#addBtn').on('click', addBookFnc);
});


function addBookFnc() {
	let code = $('input[name="bCode"]').val();
	let title = $('input[name="bTitle"]').val();
	let author = $('input[name="bAuthor"]').val();
	let press = $('input[name="bPress"]').val();
	let price = $('input[name="bPrice"]').val();

	console.log($('form[name="myfrm"]').serialize());

	$.ajax({
		url: 'ajaxBookAdd.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		//data: {bCode: code, bTitle: title, bAuthor: author, bPress: press, bPrice: price},
		data: $('form[name="myfrm"]').serialize(),
		dataType: 'json',
		success: function(result) {
			console.log(result);
			$('#list').append(makeTr(result));
			init();
		},
		error: function(error) { console.log(error) }
	});
}
function init() {
	$('input[name="bCode"]').val("");
	$('input[name="bTitle"]').val("");
	$('input[name="bAuthor"]').val("");
	$('input[name="bPress"]').val("");
	$('input[name="bPrice"]').val("");
}

function makeTr(book = { bookCode: "", bookTitle: "", bookAuthor: "", bookPress: "", bookPrice: "" }) {

	return $('<tr/>').append(
		$('<td/>').text(book.bookCode),
		$('<td/>').text(book.bookTitle),
		$('<td/>').text(book.bookAuthor),
		$('<td/>').text(book.bookPress),
		$('<td/>').text(book.bookPrice),
		$('<td/>').append($('<button/>').text('수정').on('click', book, modifyFrm)),
		$('<td/>').append($('<button/>').text('삭제').on('click', book, deleteFrm))
	).on('click', function() {
		$('#id01').css('display', 'block');
		
		localStorage.setItem('code', book.bookCode);
		localStorage.setItem('title', book.bookTitle);
		localStorage.setItem('author', book.bookAuthor);
		localStorage.setItem('press', book.bookPress);
		localStorage.setItem('price', book.bookPrice);
		
		$('.container input[name="bCode"]').val(book.bookCode);
		$('.container input[name="bTitle"]').val(book.bookTitle).on('change', function() { localStorage.setItem('title', $(this).val()) });
		$('.container input[name="bAuthor"]').val(book.bookAuthor).on('change', function() { localStorage.setItem('author', $(this).val()) });
		$('.container input[name="bPress"]').val(book.bookPress).on('change', function() { localStorage.setItem('press', $(this).val()) });
		$('.container input[name="bPrice"]').val(book.bookPrice).on('change', function() { localStorage.setItem('price', $(this).val()) });
		$('.container .okBtn').on('click', book, modifyModal);
		
		//$(this).parentsUntil('#list').replaceWith(newTr);
	})
}

function modifyFrm(e) {
	localStorage.setItem('code', e.data.bookCode);
	localStorage.setItem('title', e.data.bookTitle);
	localStorage.setItem('author', e.data.bookAuthor);
	localStorage.setItem('press', e.data.bookPress);
	localStorage.setItem('price', e.data.bookPrice);

	let newTr = $('<tr/>').append(
		$('<td/>').text(e.data.bookCode),
		$('<td/>').append($('<input/>').val(e.data.bookTitle).on('change', function() { localStorage.setItem('title', $(this).val()) })),
		$('<td/>').append($('<input/>').val(e.data.bookAuthor).on('change', function() { localStorage.setItem('author', $(this).val()) })),
		$('<td/>').append($('<input/>').val(e.data.bookPress).on('change', function() { localStorage.setItem('press', $(this).val()) })),
		$('<td/>').append($('<input/>').val(e.data.bookPrice).on('change', function() { localStorage.setItem('price', $(this).val()) })),
		$('<td/>').append($('<button/>').text('변경').on('click', modifyData))
	);

	$(this).parentsUntil('#list').replaceWith(newTr);
}
function modifyModal(e){
	let code = localStorage.getItem('code');
	let title = localStorage.getItem('title');
	let author = localStorage.getItem('author');
	let press = localStorage.getItem('press');
	let price = localStorage.getItem('price');

	let book = { bookCode: code, bookTitle: title, bookAuthor: author, bookPress: press, bookPrice: price };
	let btn = $(this);
	$.ajax({
		url: 'ajaxBookModify.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: book,
		success: function(result) {
			if (result == 'Success') {
				$('#id01').css('display', 'none');
				console.log(code)
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(error) {
			console.log(error);
		}
	})
	localStorage.removeItem('code');
	localStorage.removeItem('title');
	localStorage.removeItem('author');
	localStorage.removeItem('press');
	localStorage.removeItem('price');
}

function modifyData(e) {
	let code = localStorage.getItem('code');
	let title = localStorage.getItem('title');
	let author = localStorage.getItem('author');
	let press = localStorage.getItem('press');
	let price = localStorage.getItem('price');

	let book = { bookCode: code, bookTitle: title, bookAuthor: author, bookPress: press, bookPrice: price };
	let btn = $(this); //이벤트 $(this) => 버튼
	//수정 컨트롤
	$.ajax({
		url: 'ajaxBookModify.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: book,
		success: function(result) {
			if (result == 'Success') {
				let newTr = makeTr(book);
				btn.parentsUntil('#list').replaceWith(newTr);
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(error) {
			console.log(error);
		}
	})

	localStorage.removeItem('code');
	localStorage.removeItem('title');
	localStorage.removeItem('author');
	localStorage.removeItem('press');
	localStorage.removeItem('price');
}

function deleteFrm(e) {
	let code = e.data.bookCode;
	let title = e.data.bookTitle;
	let author = e.data.bookAuthor;
	let press = e.data.bookPress;
	let price = e.data.bookPrice;

	let book = { bookCode: code, bookTitle: title, bookAuthor: author, bookPress: press, bookPrice: price };
	let btn = $(this);
	$.ajax({
		url: 'ajaxBookDelete.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: book,
		success: function(result) {
			if (result == 'Success') {
				btn.parentsUntil('#list').remove();
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(error) {
			console.log(error);
		}
	})
}
