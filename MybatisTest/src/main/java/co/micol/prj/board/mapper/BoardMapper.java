package co.micol.prj.board.mapper;

import java.util.List;

import co.micol.prj.board.vo.BoardVO;

public interface BoardMapper {
	List<BoardVO> boardList();
	int boardInsert(BoardVO vo);
}
