package co.micol.prj.cart.command;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.cart.service.CartService;
import co.micol.prj.cart.service.impl.CartServiceImpl;
import co.micol.prj.cart.vo.CartVO;
import co.micol.prj.common.Command;

public class AjaxCartList implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		CartService service = new CartServiceImpl();
		List<CartVO> list = new ArrayList<>();
		list = service.cartList();
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "ajax:"+json;
	}

}
