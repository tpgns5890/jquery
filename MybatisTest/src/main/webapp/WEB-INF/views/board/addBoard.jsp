<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="./js/board.js"></script>
<link href="./css/addBoard.css" rel="stylesheet">
<div id="addBoardArea">
	<form id="boardForm" name="boardForm">
		<div>
			<label class="addBoardLabel">제목</label><input type="text" id="title" name="title">
			<label class="addBoardLabel">내용</label><input type="text" id="content" name="content">
			<label class="addBoardLabel">작성자</label><input type="text" id="writer" name="writer" value="${id }" disabled><br>
			<div id="formBtn">
			<button class="BoardListBtn" id="addBoardBtn">등록</button>
			<button type="reset" class="BoardListBtn">취소</button>
			</div>
		</div>
	</form>
</div>
<div id="boardList" >
	<table>
		<colgroup>
			<col width="20%"/>
			<col width="*"/>
			<col width="25%"/>
		</colgroup>
		<thead>
				<tr>
					<th>No.</th>
					<th>제목</th>
					<th>작성자</th>
				</tr>
		</thead>
		<tbody id="boardTbody" align="center"></tbody>
	</table>
</div>
