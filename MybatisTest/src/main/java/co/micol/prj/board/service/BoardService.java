package co.micol.prj.board.service;

import java.util.List;

import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.board.vo.ReplyVO;

public interface BoardService {
	List<BoardVO> boardList(); //글 전체 목록 출력
	int boardInsert(BoardVO vo);
	BoardVO selectBoard(int boardNo);
	List<ReplyVO> replyList(int boardNo);
	int repDelete(int repNum);
	void repInsert(ReplyVO vo);
	int getRepNum();
}
