$(function() {
	$.ajax({
		url: 'ajaxBoardSelect.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		dataType: 'json',
		success: function(result) {
			$('#titleP').text(result.title);
			$('#contentP').text(result.content);
			$('#writerP').text(result.writer);
			$('#dateP').text(result.writeDate);
			
		},
		error: function(error) {
			console.log(error);
		}
	});
	$.ajax({
		url: 'ajaxReplyList.do',
		method:'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		dataType: 'json',
		success:function(result){
			console.log(result);
			let i=0;
			$.each(result, function(prop, item) {
				i++
				$('#replyUl').append(makeLi(item, i));
				
			})
		},
		error: function(error){
			console.log(error);
		}
	});
	$('#addReplyBtn').on('click', addReplyFnc);
});

function makeLi(reply = { repNum: "", boardNum: "", repContent: "", repWriter: "", creationDate: "" },i) {
	let div = $('<div />');
	return $('<li />').append(
			div.append($('<span />').attr("class","repSection1").text("No:"+i+" "+reply.repWriter)),
			div.append($('<span />').attr("class","repSection1").text(reply.creationDate)),
			$('<span />').attr("id","replyContent").text(reply.repContent),
			$('<button/>').attr("id","deleteRepBtn").text('삭제').on('click', reply, deleteRep)
			)
}

function deleteRep(e) {
	let repNum = e.data.repNum;
	let btn = $(this);
	
	let reply = {repNum : repNum}
	$.ajax({
		url: 'ajaxReplyDelete.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: reply,
		success: function(result) {
			if (result == 'Success') {
				btn.parentsUntil('#replyUl').remove();
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(error) {
			console.log(error);
		}
	})
};

function addReplyFnc() {
	let repContent = $('input[name="repContent"]').val();
	let reply = { repNum: "", boardNum: "", repContent: repContent, repWriter: "", creationDate: "" };
	$.ajax({
		url: 'ajaxReplyAdd.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: reply,
		dataType: 'json',
		success: function(result) {
			console.log(result);
			$('#replyUl').append(makeLi(result,($('#replyUl li').length)+1));
			init();
		},
		error: function(error) { console.log(error) }
	});
}

function init() {
	$('input[name="repContent"]').val("");
}