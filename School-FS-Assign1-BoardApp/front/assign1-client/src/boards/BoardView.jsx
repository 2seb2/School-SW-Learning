// // BoardView.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './css/BoardView.css';

// function BoardView({ selectedId }) {
//     const [boardData, setBoardData] = useState(null);

//     useEffect(() => {
//         if (selectedId) {
//             axios.post('/api/board?type=list', {
//                 isArticleNo: selectedId,
//             }).then(response => {
//                 const data = response.data.json[0];
//                 setBoardData(data);
//             }).catch(error => {
//                 alert('게시물 정보를 가져오는 데 실패했습니다.');
//             });
//         }
//     }, [selectedId]);

//     if (!boardData) {
//         return <div className='boardView'>게시물을 선택하세요.</div>;
//     }

//     let submitClick = (type, e) => {
//         e.preventDefault();
//         const formData = new FormData(document.querySelector('#frm'));
//         var Json_form = JSON.stringify(Object.fromEntries(formData));
//         const response = fetch('/api/board?type=' + type, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: Json_form,
//         }).then(response => {
//             if (!response.ok) {
//                 throw new Error(`${response.status} 에러 발생`)
//             }
//             return response.json();
//         }).then(body => {
//             if (body.code === 'succ') {
//                 if (type === 'save') {
//                     sweetalertSucc('Software Tools 등록 성공', false);
//                 } else if (type === 'modify') {
//                     sweetalertSucc('Software Tools 수정 성공', false);
//                 }
//                 setTimeout(function () {
//                     navigate('/');
//                 }, 1500);
//             } else {
//                 alert('insert 오류');
//             }
//         }).catch(err => { alert(err) })
//     }


//     return (
//         <div className='boardView'>
//             <h2>BoardView</h2>
//             <div className="form-container">
//                 <form name="frm" id="frm" action="" method="post">
//                     <div className="form-group">
//                         <input type="text" id="article_no" name="article_no" value={boardData.article_no} readOnly />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="title">제목:</label>
//                         <input type="text" id="title" name="title" value={boardData.title} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="content">내용:</label>
//                         <textarea id="content" name="content" rows="4" value={boardData.content} ></textarea>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="writer">작성자:</label>
//                         <input type="text" id="writer" name="writer" value={boardData.write_id} />
//                     </div>
//                     <button type="submit" className="modifyClass" onClick={(e) => submitClick('modify', e)}>
//                         제출
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default BoardView;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/BoardView.css';

function BoardView({ selectedId, setSelectedId }) {  // setSelectedId를 props로 받음
    const [boardData, setBoardData] = useState({
        article_no: '',
        title: '',
        content: '',
        write_id: '', // 작성자 필드
    });

    useEffect(() => {
        if (selectedId === 'new') {
            // 새로운 게시글 작성 화면을 초기화
            setBoardData({
                article_no: '',
                title: '',
                content: '',
                write_id: '',
            });
        } else if (selectedId) {
            // 기존 게시글 수정 화면을 불러오기
            callBoardInfoApi();
        }
    }, [selectedId]);

    const callBoardInfoApi = async () => {
        try {
            const response = await axios.post('/api/board?type=list', {
                isArticleNo: selectedId,
            });
            const data = response.data.json[0];
            setBoardData({
                article_no: data.article_no || '',
                title: data.title || '',
                content: data.content || '',
                write_id: data.write_id || '', // 작성자 정보 설정
            });
        } catch (error) {
            alert('게시물 정보를 가져오는 데 실패했습니다.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { title, content, write_id } = boardData;
        if (!title || !content || !write_id) {
            alert('모든 필수 입력사항을 확인해주세요.');
            return false;
        }
        return true;
    };

    const submitClick = async (type, e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            is_Title: boardData.title,
            is_Content: boardData.content,
            is_WriteId: boardData.write_id,
            is_beforeArticleNo: selectedId !== 'new' ? selectedId : '', // 기존 게시물의 article_no, 새로운 게시물은 빈 값
        };

        try {
            const response = await fetch(`/api/board?type=${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`${response.status} 에러 발생`);
            }
            const body = await response.json();
            if (body.code === 'succ') {
                alert(type === 'save' ? '게시물 등록 성공' : '게시물 수정 성공');
                setTimeout(() => {
                    window.location.href = '/boardList';
                }, 1500);
            } else {
                alert('처리 중 오류가 발생했습니다.');
            }
        } catch (err) {
            alert(err);
        }
    };

    const handleCancelClick = () => {
        // 게시글 등록 화면으로 돌아가도록 selectedId를 'new'로 설정
        setSelectedId('new');
    };

    return (
        <div className='boardView'>
            <h2>{selectedId === 'new' ? '게시물 등록' : '게시물 수정'}</h2>
            <div className="form-container">
                <form name="frm" id="frm" onSubmit={(e) => submitClick(selectedId === 'new' ? 'save' : 'modify', e)}>
                    <div className="form-group">
                        <input type="hidden" id="article_no" name="article_no" value={boardData.article_no} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_Title">제목:</label>
                        <input type="text" id="is_Title" name="title" value={boardData.title} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_Content">내용:</label>
                        <textarea id="is_Content" name="content" rows="4" value={boardData.content} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_WriteId">작성자:</label>
                        <input type="text" id="is_WriteId" name="write_id" value={boardData.write_id} onChange={handleInputChange} />
                    </div>

                    <div className="button-group">
                        {selectedId === 'new' ?
                            <button type="submit" className="saveClass">등록</button>
                            : (
                                <>
                                    <button type="submit" className="modifyClass">수정</button>
                                    <button type="button" className="cancelClass" onClick={handleCancelClick}>취소</button>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BoardView;
