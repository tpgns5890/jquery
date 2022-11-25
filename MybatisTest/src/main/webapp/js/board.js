$(function() {
	$.ajax({
		url: 'ajaxBoardList.do',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			$.each(result, function(idx) {
				$('#boardTbody').append(makeTr(result[idx]));
			});
			$("#boardTbody tr").on('click',function() {
				let boardNo = $(this).children().eq(0).val();
				console.log($(this).children().eq(0).val());
				location.href='selectBoard.do?boardNo='+boardNo;
			});
		},
		error: function(error) {
			console.log(error);
		}
	});
	
	$('#addBoardBtn').on('click', insertBoard);
});

function makeTr(board = { boardNo: "", title: "", writer: ""}) {
	return $('<tr/>').append(
		$('<td/>').text(board.boardNo),
		$('<td/>').text(board.title),
		$('<td/>').text(board.writer)
	)
}

function insertBoard() {
	$.ajax({
		url: 'ajaxBoardAdd.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: $('form[name="boardForm"]').serialize(),
		dataType: 'json',
		success: function(result) {
			console.log(result);
			$('#boardTbody').append(makeTr(result));
			init();	//	input값 초기화
		},
		error: function(error) { console.log(error) }
	});
}

function init() {
	$('input[name="title"]').val("");
	$('input[name="content"]').val("");
}