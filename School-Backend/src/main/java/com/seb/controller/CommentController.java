package com.seb.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.seb.model.BoardUser;
import com.seb.repository.UserRepository;
import com.seb.service.CommentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;
	private final UserRepository userRepository;

	// 댓글 추가
	@PostMapping("/comment/add")
	public String addComment(@RequestParam Long boardId, @RequestParam String content, Principal principal) {
		// 현재 로그인된 사용자의 이름 가져오기
		String username = principal.getName();

		// 사용자 이름을 통해 사용자 정보 조회
		BoardUser user = userRepository.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

		// 댓글 작성 - user.getId() 대신 user 객체를 넘김
		commentService.createComment(boardId.intValue(), content, user);

		// 댓글 작성 후 게시글 페이지로 리다이렉트
		return "redirect:/notice/view?no=" + boardId;
	}

	// 댓글 수정
	@PostMapping("/comment/edit")
	public String editComment(@RequestParam Long commentId, @RequestParam String content, @RequestParam Long boardId) {
		commentService.updateComment(commentId, content);

		// 수정 후 게시글 페이지로 리다이렉트
		return "redirect:/notice/view?no=" + boardId;
	}

	// 댓글 삭제
	@PostMapping("/comment/remove")
	public String removeComment(@RequestParam Long commentId, @RequestParam Long boardId) {
		commentService.deleteComment(commentId);

		// 삭제 후 게시글 페이지로 리다이렉트
		return "redirect:/notice/view?no=" + boardId;
	}
}
