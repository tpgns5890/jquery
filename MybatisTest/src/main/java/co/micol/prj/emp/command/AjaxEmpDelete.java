package co.micol.prj.emp.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.micol.prj.common.Command;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.service.impl.EmpServiceImpl;

public class AjaxEmpDelete implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		EmpService service = new EmpServiceImpl();
		
		String employeeId = request.getParameter("employeeId");
		int result = service.empDelete(Integer.parseInt(employeeId));
		
		String json = null;
		if(result > 0) {
			json = "Success";
		}else {
			json = "Fail";
		}
		return "ajax:" + json;
	}

}
