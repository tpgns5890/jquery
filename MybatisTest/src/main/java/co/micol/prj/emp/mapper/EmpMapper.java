package co.micol.prj.emp.mapper;

import java.util.List;

import co.micol.prj.emp.vo.EmpVO;
import co.micol.prj.emp.vo.JobVO;

public interface EmpMapper {
	List<EmpVO> empList();
	int empDelete(int employeeId);
	int empInsert(EmpVO vo);
	int empUpdate(EmpVO vo);
	List<JobVO> jobList();
}
