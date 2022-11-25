package co.micol.prj.board.command;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.ReplyVO;
import co.micol.prj.common.Command;

public class AjaxReplyAdd implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		ReplyVO vo = new ReplyVO();
		BoardService service = new BoardServiceImpl();
		HttpSession session = request.getSession();
		
		//int repNum = (service.getRepNum()) + 1;
		int boardNum = (int) session.getAttribute("boardNo");
		String repContent = request.getParameter("repContent");
		String repWriter = (String) session.getAttribute("id");
		String creationDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		
		//vo.setRepNum(repNum);
		vo.setBoardNum(boardNum);
		vo.setRepContent(repContent);
		vo.setRepWriter(repWriter);
		vo.setCreationDate(creationDate);
		
		service.repInsert(vo);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		
		try {
			json = mapper.writeValueAsString(vo);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "ajax:" + json;
	}

}
