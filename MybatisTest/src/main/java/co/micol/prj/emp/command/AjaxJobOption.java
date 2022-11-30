package co.micol.prj.emp.command;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.common.Command;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.service.impl.EmpServiceImpl;
import co.micol.prj.emp.vo.JobVO;

public class AjaxJobOption implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		EmpService service = new EmpServiceImpl();
		List<JobVO> list = new ArrayList<>();
		list = service.jobList();
		
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
