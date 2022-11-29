package co.micol.prj.cart.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.micol.prj.cart.mapper.CartMapper;
import co.micol.prj.cart.service.CartService;
import co.micol.prj.cart.vo.CartVO;
import co.micol.prj.common.DataSource;

public class CartServiceImpl implements CartService {
	private SqlSession sqlSession = DataSource.getInstance().openSession(true);
	private CartMapper map = sqlSession.getMapper(CartMapper.class);
	
	@Override
	public List<CartVO> cartList() {
		return map.cartList();
	}
}
