/**
 * emp.js
 */

$(function() {
	$.ajax({
		url: '../ajaxEmpList.do',
		method: 'get',
		dataType: 'json',
		success: function(result) {
			$.each(result, function(prop, item) {
				$('tbody').append(makeTr(item));
			})
		},
		error: function(request, status, error) {
			alert("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	})
	$.ajax({
		url:'../ajaxJobOption.do',
		method: 'get',
		dataType: 'json',
		success: function(result){
			$('select[name="job_id"]').append($('<option/>').attr("value", null).text(""));
			$.each(result, function(prop, item){
				$('select[name="job_id"]').append(makeOption(item));
			})
		},
		error: function(request, status, error) {
			alert("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	})
	$('#btnInsert').css("display", "inline-block").on('click', empInsert);
	$('#btnUpdate').css("display", "none");
	$('#btnInit').on('click', init);
})

function makeOption(job ={jobId:"", jobTitle:""}){
	return $('<option/>').attr("value", job.jobId).text(job.jobTitle);
}

function empInsert() {
	let employeeId = $('input[class="form-control"]').eq(0).val();
	let firstName = $('input[class="form-control"]').eq(1).val();
	let lastName = $('input[class="form-control"]').eq(2).val();
	let email = $('input[class="form-control"]').eq(3).val();
	let hireDate = $('input[class="form-control"]').eq(4).val();
	let jobId = $('select').val();
	let jobTitle = $('select option:selected').text();
	$.ajax({
		url: '../ajaxEmpInsert.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {employeeId:employeeId, firstName:firstName, lastName:lastName, email:email, hireDate:hireDate, jobId:jobId,jobTitle:jobTitle},
		dataType: 'json',
		success: function(result) {
			$('tbody').append(makeTr(result));
			init();
		},
		error: function(request, status, error) {
			alert("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	})
}

function init() {
	$('input[class="form-control"]').eq(0).val("").attr("readonly", false);
	$('input[class="form-control"]').eq(1).val("");
	$('input[class="form-control"]').eq(2).val("");
	$('input[class="form-control"]').eq(3).val("");
	$('input[class="form-control"]').eq(4).val("");
	$('#btnInsert').css("display", "inline-block").on('click', empInsert);
	$('#btnUpdate').css("display", "none");
	
	localStorage.removeItem('selectedEmp')
}

function makeTr(emp = { employeeId: "", firstName: "", lastName: "", email: "", hireDate: "", jobId: "", jobTitle: "" }) {
	return $('<tr id="'+emp.employeeId+'"/>').append(
		$('<td class="text-center"/>').text(emp.employeeId),
		$('<td class="text-center"/>').text(emp.lastName + emp.firstName),
		$('<td class="text-center"/>').text(emp.jobTitle),
		$('<td class="text-center"/>').append(
			$('<button class="btnUpd"/>').text("조회").on('click', emp, empSelect),
			(" "),
			$('<button class="btnDel"/>').text("삭제").on('click', emp, empDelete)
		)
	);
}

function empSelect(e) {
	localStorage.setItem("selectedEmpNo",e.data.employeeId);
	let selectedEmpNo = localStorage.getItem("selectedEmpNo");
	function convertDateFormat(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month >= 10 ? month : '0' + month;
		var day = date.getDate();
		day = day >= 10 ? day : '0' + day;
		return [year, month, day].join('-');
	}
	$('#btnUpdate').css("display", "inline-block").on('click', empUpdate);
	$('input[class="form-control"]').eq(0).val(e.data.employeeId).attr("readonly", true)
	$('input[class="form-control"]').eq(1).val(e.data.firstName)
	$('input[class="form-control"]').eq(2).val(e.data.lastName)
	$('input[class="form-control"]').eq(3).val(e.data.email)
	$('input[class="form-control"]').eq(4).val(convertDateFormat(new Date(e.data.hireDate)))
	$('select').val(e.data.jobId).prop("selected", true)
	$('#btnInsert').css("display", "none");
}

function empDelete(e) {
	let employeeId = e.data.employeeId;
	let emp ={ employeeId: employeeId}
	let btn = $(this)
	$.ajax({
		url: '../ajaxEmpDelete.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: emp,
		success: function(result) {
			if (result == 'Success') {
				btn.parentsUntil('tbody').remove();
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(request, status, error) {
			alert("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	})

}

function empUpdate(){
	let selectedEmpNo = localStorage.getItem("selectedEmpNo");
	let employeeId = $('input[class="form-control"]').eq(0).val();
	let firstName = $('input[class="form-control"]').eq(1).val();
	let lastName = $('input[class="form-control"]').eq(2).val();
	let email = $('input[class="form-control"]').eq(3).val();
	let hireDate = $('input[class="form-control"]').eq(4).val();
	let jobId = $('select').val();
	let jobTitle = $('select option:selected').text();
	let emp = {employeeId:employeeId, firstName:firstName, lastName:lastName, email:email, hireDate:hireDate, jobId:jobId, jobTitle:jobTitle}
	$.ajax({
		url: '../ajaxEmpUpdate.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: emp,
		success: function(result) {
			if (result == 'Success') {
				let newTr = makeTr(emp);
				$('#'+selectedEmpNo).replaceWith(newTr);
				init();
			} else if (result == 'Fail') {
				alert('처리 건수가 없습니다.')
			}
		},
		error: function(request, status, error) {
			alert("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	})
	localStorage.removeItem('selectedEmp')
}