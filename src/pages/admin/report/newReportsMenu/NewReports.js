import './NewReports.css';

function NewReports() {
    console.log('보고서 작성 페이지')

  return (
    <div className="menu1_layout">
      <div className='flex_wrap'>
        <div className="report-create">
          <h1>보고서 작성</h1>
          <div className="button-group">
            <button className="register-button">등록</button>
            <button className="create-button">삭제</button>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>차량번호</th>
                <th>차량기사</th>
                <th>제출일</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {/* 데이터가 들어갈 부분 */}
            </tbody>
          </table>
          <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReports;
