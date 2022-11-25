package co.micol.prj.board.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.common.Command;

public class AjaxReplyDelete implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		BoardService service = new BoardServiceImpl();
		
		int repNum = Integer.parseInt(request.getParameter("repNum"));
		int result = service.repDelete(repNum);
		
		String json = null;
		if(result > 0) {
			json = "Success";
		}else {
			json = "Fail";
		}
		return "ajax:" + json;
	}

}
