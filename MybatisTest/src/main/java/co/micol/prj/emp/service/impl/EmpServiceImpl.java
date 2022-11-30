package co.micol.prj.emp.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.micol.prj.common.DataSource;
import co.micol.prj.emp.mapper.EmpMapper;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.vo.EmpVO;
import co.micol.prj.emp.vo.JobVO;

public class EmpServiceImpl implements EmpService {
	private SqlSession sqlSession = DataSource.getInstance().openSession(true);
	private EmpMapper map = sqlSession.getMapper(EmpMapper.class);
	
	@Override
	public List<EmpVO> empList() {
		return map.empList();
	}

	@Override
	public int empDelete(int employeeId) {
		return map.empDelete(employeeId);
	}

	@Override
	public int empInsert(EmpVO vo) {
		return map.empInsert(vo);
		
	}

	@Override
	public int empUpdate(EmpVO vo) {
		return map.empUpdate(vo);
	}

	@Override
	public List<JobVO> jobList() {
		return map.jobList();
	}

}
