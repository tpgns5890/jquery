package co.micol.prj.board.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import co.micol.prj.common.Command;

public class SelectBoard implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		
		int boardNo = Integer.parseInt(String.valueOf(request.getParameter("boardNo")));
		System.out.println(boardNo);
		session.setAttribute("boardNo", boardNo);
		return "board/selectBoard.tiles";
	}

}
