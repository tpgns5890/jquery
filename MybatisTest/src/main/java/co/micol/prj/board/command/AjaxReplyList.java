package co.micol.prj.board.command;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.ReplyVO;
import co.micol.prj.common.Command;

public class AjaxReplyList implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		BoardService service = new BoardServiceImpl();
		List<ReplyVO> list = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		
		int boardNo = (int) session.getAttribute("boardNo");
		list = service.replyList(boardNo);
		
		String json = null;
		try {
			json = mapper.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "ajax:"+json;
	}

}
