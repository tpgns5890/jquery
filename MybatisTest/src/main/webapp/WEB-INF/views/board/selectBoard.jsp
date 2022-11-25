<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="./js/selectBoard.js"></script>
<link href="./css/selectBoard.css" rel="stylesheet">
<div id="boardSelectArea">
	<span class="labelSpan">제목</span>
	<p id="titleP"></p>
	<div>
		<span class="labelSpan">내용</span>
		<p id="contentP"></p>
	</div>
	<span class="labelSpan">작성자</span>
	<p id="writerP"></p>
	<span class="labelSpan">작성일자</span>
	<p id="dateP"></p>
</div>

<div id="replyArea">
	<ul id="replyUl">
		
	</ul>
</div>
<div id="addReply">
	<form>
		<input type="text" id="replyInput" name="repContent"></input>
		<button id="addReplyBtn">등록</button>
	</form>
</div>
