package com.seb.controller;

import java.security.Principal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.seb.model.NoticeBoard;
import com.seb.service.BoardService;
import com.seb.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller("boardController")
@RequestMapping("/notice")
@RequiredArgsConstructor
public class BoardController {
	private final BoardService boardService;
	private final UserService userService;

	private List<NoticeBoard> articleList;

	Logger logger = LoggerFactory.getLogger("com.vozlwl.controller.BoardController");

	@RequestMapping({ "/list", "/" })
	public String getArticleList(Model model) {
		articleList = boardService.listArticles();
		model.addAttribute("dataList", articleList);
		logger.info("전체 조회");
		return "list";
	}

	@RequestMapping("/add") // add 로 들어오면 write.jsp를 열어줌
	@PreAuthorize("isAuthenticated()")
	public String writeArticle() {
		logger.info("####################### writeArticle()");
		return "write";
	}

	@PostMapping(value = "/addarticle")
	@PreAuthorize("isAuthenticated()")
	public String addArticle(@RequestParam(value = "i_title") String title, // i_title로 받아서 title에 넣어라
			@RequestParam(value = "i_content") String content, Principal principal) {
		NoticeBoard noticeBoard = new NoticeBoard();
		noticeBoard.setTitle(title);
		noticeBoard.setContent(content);
		noticeBoard.setWriter(userService.getUser(principal.getName()));

		boardService.addArticle(noticeBoard);
		logger.info("게시글 추가: " + title);

		return "redirect:list"; // 너 리스트라는 경로에다 다시 요청해 -> 요청하면 목록이 나옴
	}

	@GetMapping("/view")
	public ModelAndView viewArticle(@RequestParam(value = "no") String articleNo) {
		NoticeBoard noticeBoard = boardService.viewArticle(Integer.parseInt(articleNo));
		ModelAndView mv = new ModelAndView();
		mv.setViewName("view");
		mv.addObject("article", noticeBoard);
		logger.info("상세 조회: " + articleNo);
		return mv;
	}

	@PostMapping("/edit")
	@PreAuthorize("isAuthenticated()")
	public String editArticle(@RequestParam String articleNo, @RequestParam String title, @RequestParam String content,
			RedirectAttributes redirectAtt) {
		NoticeBoard noticeBoard = new NoticeBoard();

		noticeBoard.setId(Integer.parseInt(articleNo));
		noticeBoard.setTitle(title);
		noticeBoard.setContent(content);

		boardService.editArticle(noticeBoard);
		redirectAtt.addAttribute("no", articleNo);
		return "redirect:view";
	}

	@PostMapping("/remove")
	@PreAuthorize("isAuthenticated()")
	public String removeArticle(@RequestParam String articleNo) { // value와 이름이 같을 경우에 생략해도 됨 -> 알아서 해주기 때문
		boardService.removeArticle(Integer.parseInt(articleNo)); // @RequestParam(value="articleNo") String articleNo 원래
																	// 이거
		logger.info("게시글 삭제: " + articleNo);
		return "redirect:list";
	}
}