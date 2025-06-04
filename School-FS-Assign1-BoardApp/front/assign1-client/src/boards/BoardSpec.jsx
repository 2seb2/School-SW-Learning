import React from 'react';
import './css/BoardSpec.css'

function BoardSpec({ selectedArticle }) {
    return (
        <div className="board-spec-container">
            <h2 className="board-spec-title">{selectedArticle.title}</h2>
            <div className="board-spec-content">{selectedArticle.content}</div>
            <div className="board-spec-author">작성자: {selectedArticle.write_id}</div>
        </div>
    );
}

export default BoardSpec;