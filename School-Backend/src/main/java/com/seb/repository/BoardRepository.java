package com.seb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seb.model.NoticeBoard;

public interface BoardRepository extends JpaRepository<NoticeBoard, Integer> {
	// Integer -> primary key 종류가 Integer
	Optional<NoticeBoard> findById(Integer boardId);
}
