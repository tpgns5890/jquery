package co.micol.prj.emp.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.common.Command;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.service.impl.EmpServiceImpl;
import co.micol.prj.emp.vo.EmpVO;

public class AjaxEmpInsert implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		EmpVO vo = new EmpVO();
		EmpService service = new EmpServiceImpl();
		
		vo.setEmployeeId(Integer.parseInt(request.getParameter("employeeId")));
		vo.setFirstName(request.getParameter("firstName"));
		vo.setLastName(request.getParameter("lastName"));
		vo.setEmail(request.getParameter("email"));
		vo.setHireDate(request.getParameter("hireDate"));
		vo.setJobId(request.getParameter("jobId"));
		vo.setJobTitle(request.getParameter("jobTitle"));
		
		int n = service.empInsert(vo);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		
		try {
			json = mapper.writeValueAsString(vo);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "ajax:" + json;
	}

}
