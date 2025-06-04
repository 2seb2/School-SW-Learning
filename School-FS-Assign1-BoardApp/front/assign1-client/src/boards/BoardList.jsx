import React, { useEffect, useState } from "react";
import './css/BoardList.css'
import axios from "axios";

function BoardList({ onSelectArticle, setIsEditMode }) {
    const [boardList, setBoardList] = useState([]);

    let callListApi = async () => {
        axios.post('/api/board?type=list', {

        }).then(response => {
            try {
                let result = [];
                let BoardList = response.data;

                for (let i = 0; i < BoardList.json.length; i++) {
                    let data = BoardList.json[i];
                    let date = data.write_date;
                    let year = date.substr(0, 4);
                    let month = date.substr(5, 2);
                    let day = date.substr(8, 2);
                    let write_date = year + '.' + month + '.' + day;

                    result.push(
                        <tr key={i} onClick={() => onSelectArticle(data.article_no, data)}>
                            <td>{data.article_no}</td>
                            <td>{data.title}</td>
                            <td>{data.write_id}</td>
                            <td>{write_date}</td>
                            <td>
                                <div className="button-group">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // tr 클릭 이벤트가 발생하지 않도록 방지
                                            onSelectArticle(data.article_no, data);
                                            setIsEditMode(true); // 수정 모드로 전환
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // 클릭 이벤트 전파 방지
                                            deleteSwtool(data.article_no, e);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                }
                setBoardList(result);
            } catch (error) {
                alert('목록 작업 중 오류');
            }
        }).catch(error => {
            alert('axios 호출 에러');
            return false;
        });
    }

    let deleteSwtool = (articleNo, e) => {
        e.preventDefault();
        console.log('deleteBoard()');

        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.post('/api/board?type=delete', {
                is_ArticleNo: articleNo // 클릭한 게시글의 article_no를 사용
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    callListApi();  // 삭제 후 목록 갱신
                }).catch(error => {
                    alert('작업 중 오류가 발생하였습니다.');
                    return false;
                });
        }
    }

    useEffect(() => {
        callListApi();
    }, []);

    return (
        <div className='boardList'><h2>게시글 목록</h2>
            <section>
                <button id='createPostBtn' onClick={() => onSelectArticle('new')} style={{ marginBottom: '10px' }}>
                    새 글 작성
                </button>
                <div className="boardlist-container">
                    <div className="ahrfhr">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>글 번호</th>
                                    <th>글 제목</th>
                                    <th>작성자</th>
                                    <th>등록일</th>
                                    <th>기능버튼</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table table-striped">
                            <tbody>
                                {boardList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BoardList

