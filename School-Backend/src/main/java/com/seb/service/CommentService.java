package com.seb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seb.model.BoardComment;
import com.seb.model.BoardUser;
import com.seb.model.NoticeBoard;
import com.seb.repository.BoardRepository;
import com.seb.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;

	// 댓글 작성
	public BoardComment createComment(Integer boardId, String content, BoardUser user) { // userId를 BoardUser로 변경
		// 게시글 찾기
		NoticeBoard noticeBoard = boardRepository.findById(boardId)
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));

		// 댓글 생성
		BoardComment comment = new BoardComment();
		comment.setNoticeBoard(noticeBoard);
		comment.setWriter(user); // 작성자 정보 설정
		comment.setContent(content);

		// 댓글 저장
		return commentRepository.save(comment);
	}

	// 댓글 수정
	public Optional<BoardComment> updateComment(Long commentId, String content) {
		// 댓글 찾기
		Optional<BoardComment> optional = commentRepository.findById(commentId);
		if (optional.isPresent()) {
			BoardComment comment = optional.get();
			comment.setContent(content);
			commentRepository.save(comment);
			return Optional.of(comment);
		}
		return Optional.empty();
	}

	// 댓글 삭제
	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}

	// 특정 게시글에 달린 댓글 리스트 조회
	public List<BoardComment> getCommentsByBoardId(Long boardId) {
		return commentRepository.findByNoticeBoardId(boardId); // 게시글에 달린 댓글 목록 조회
	}
}
