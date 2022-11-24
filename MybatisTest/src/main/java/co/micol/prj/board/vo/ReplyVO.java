package co.micol.prj.board.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyVO {
	private int repNum;
	private int boardNum;
	private String repContent;
	private String repWriter;
	private String creationDate;
}