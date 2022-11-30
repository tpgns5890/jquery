package co.micol.prj.emp.service;

import java.util.List;

import co.micol.prj.emp.vo.EmpVO;
import co.micol.prj.emp.vo.JobVO;

public interface EmpService {

	List<EmpVO> empList();
	int empDelete(int employeeId);
	int empInsert(EmpVO vo);
	int empUpdate(EmpVO vo);
	List<JobVO> jobList();

}
