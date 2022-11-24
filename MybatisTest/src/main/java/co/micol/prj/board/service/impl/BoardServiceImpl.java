package co.micol.prj.board.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.micol.prj.board.mapper.BoardMapper;
import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.common.DataSource;

public class BoardServiceImpl implements BoardService{
	private SqlSession sqlSession = DataSource.getInstance().openSession(true);
	private BoardMapper map = sqlSession.getMapper(BoardMapper.class);
	
	@Override
	public List<BoardVO> boardList() {
		return map.boardList();
	}

	@Override
	public int boardInsert(BoardVO vo) {
		return map.boardInsert(vo);
	}

}
