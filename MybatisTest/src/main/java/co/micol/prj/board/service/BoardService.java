package co.micol.prj.board.service;

import java.util.List;

import co.micol.prj.board.vo.BoardVO;

public interface BoardService {
	List<BoardVO> boardList(); //글 전체 목록 출력
	int boardInsert(BoardVO vo);

}
