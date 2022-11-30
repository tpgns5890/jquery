package co.micol.prj.emp.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.common.Command;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.service.impl.EmpServiceImpl;
import co.micol.prj.emp.vo.EmpVO;

public class AjaxEmpUpdate implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		EmpVO vo= new EmpVO();
		EmpService service = new EmpServiceImpl();
		
		String employeeId = request.getParameter("employeeId");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String email = request.getParameter("email");
		String hireDate = request.getParameter("hireDate");
		String jobId = request.getParameter("jobId");
		String jobTitle = request.getParameter("jobTitle");
		
		vo.setEmployeeId(Integer.parseInt(employeeId));
		vo.setFirstName(firstName);
		vo.setLastName(lastName);
		vo.setEmail(email);
		vo.setHireDate(hireDate);
		vo.setJobId(jobId);
		vo.setJobTitle(jobTitle);
		int result = service.empUpdate(vo);
		
		String json = null;
		if(result > 0) {
			json = "Success";
		}else {
			json = "Fail";
		}
		return "ajax:" + json;
	}

}
