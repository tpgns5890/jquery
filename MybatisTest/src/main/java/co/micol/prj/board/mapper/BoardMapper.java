package co.micol.prj.board.mapper;

import java.util.List;

import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.board.vo.ReplyVO;

public interface BoardMapper {
	List<BoardVO> boardList();
	int boardInsert(BoardVO vo);
	BoardVO selectBoard(int boardNo);
	List<ReplyVO> replyList(int boardNo);
	int repDelete(int repNum);
	void repInsert(ReplyVO vo);
	int getRepNum();
}
