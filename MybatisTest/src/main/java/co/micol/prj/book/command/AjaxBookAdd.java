package co.micol.prj.book.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.book.service.BookService;
import co.micol.prj.book.service.impl.BookServiceImpl;
import co.micol.prj.book.vo.BookVO;
import co.micol.prj.common.Command;

public class AjaxBookAdd implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		BookVO vo = new BookVO();
		BookService service = new BookServiceImpl();

		String code = request.getParameter("bCode");
		String title = request.getParameter("bTitle");
		String author = request.getParameter("bAuthor");
		String press = request.getParameter("bPress");
		String price = request.getParameter("bPrice");

		vo.setBookCode(code);
		vo.setBookTitle(title);
		vo.setBookAuthor(author);
		vo.setBookPress(press);
		vo.setBookPrice(Integer.parseInt(price));

		service.bookInsert(vo);

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
