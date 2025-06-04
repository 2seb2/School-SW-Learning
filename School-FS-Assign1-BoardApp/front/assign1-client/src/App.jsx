import React, { useState } from 'react';
import './App.css';
import BoardList from './boards/BoardList';
import BoardView from './boards/BoardView';
import BoardSpec from './boards/BoardSpec'; 

function App() {
  const [selectedBoardId, setSelectedBoardId] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false); 
  const [selectedArticle, setSelectedArticle] = useState(null); 

  const handleSelectBoard = (id, article) => {
    setSelectedBoardId(id);
    setSelectedArticle(article); 
    setIsEditMode(false); 
  };

  return (
    <div className='container'>
      <BoardList onSelectArticle={handleSelectBoard} setIsEditMode={setIsEditMode} /> {/* setIsEditMode 추가 */}
      {selectedBoardId && !isEditMode ? (
        <BoardSpec selectedArticle={selectedArticle} />
      ) : (
        <BoardView selectedId={selectedBoardId} setSelectedId={setSelectedBoardId} />
      )}
    </div>
  );
}

export default App;
