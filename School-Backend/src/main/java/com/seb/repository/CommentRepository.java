package com.seb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb.model.BoardComment;

public interface CommentRepository extends JpaRepository<BoardComment, Long> {
	List<BoardComment> findByNoticeBoardId(Long boardId);
}
