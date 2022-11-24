package co.micol.prj.board.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardVO {
	private int boardNo;
	private String title;
	private String content;
	private String writer;
	private String writeDate;
	private int clickCnt;
	private String image;
	
}
