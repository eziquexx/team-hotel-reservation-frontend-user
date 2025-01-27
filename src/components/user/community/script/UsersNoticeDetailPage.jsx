import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

// 24.12.11 지은 [작업중] : UI 및 조회수 증가 수정 해야함.
export default function UsersNoticeDetailPage() {
  const env_API_BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const fetchNotice = useCallback(async () => {
    try {
      const response = await fetch(`${env_API_BASE_URL}/api/users/notices/${noticeId}`, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data); 
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [noticeId]);


  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>

  // 날짜
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];
    return formattedDate;
  }

  // 뒤로가기 modal
  const handleMoveBack = () => {
    navigate(`/community/notice`);
  };

  return (
    <> 
      <div className="table-height-fixed detail-page">
        <Table 
          responsive="xl"
          border={1}
          className="table-group table-bordered"
        >
          <tbody>
            <tr>
              <td style={{width:"100px"}} className="text-center table-cell">게시판 ID</td>
              <td colSpan={3} className="text-start">{data.noticeId}</td>
            </tr>
            <tr>
              <td style={{width:"100px"}} className="text-center table-cell">카테고리</td>
              <td className="text-start">{data.category}</td>
              <td style={{width:"100px"}} className="text-center table-cell">조회수</td>
              <td className="text-start">{data.views}</td>
            </tr>
            <tr>
              <td style={{width:"100px"}} className="text-center table-cell">작성일</td>
              <td className="text-start">{formatDate(data.createdAt)}</td>
              <td style={{width:"100px"}} className="text-center table-cell">수정일</td>
              <td className="text-start">{formatDate(data.updatedAt)}</td>
            </tr>
            <tr>
              <td style={{width:"100px"}} className="text-center">제목</td>
              <td colSpan={3} className="text-start">{data.title}</td>
            </tr>
            <tr style={{height: "280px"}}>
              <td style={{width: "100px"}} className="text-center">내용</td>
              <td colSpan={3} style={{height: "280px"}}>
                <div style={{maxHeight:"280px", overflowY:"auto"}} className="text-start">
                  {data.content}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button 
          onClick={handleMoveBack}
          className="position-relative"
        >
            목록 이동
        </Button>
      </div>
    </>
  );
}