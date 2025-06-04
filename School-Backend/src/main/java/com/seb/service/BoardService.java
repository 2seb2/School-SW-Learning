package com.seb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.seb.model.NoticeBoard;
import com.seb.repository.BoardRepository;

@Service
public class BoardService {
	private final BoardRepository boardRepository;

	public BoardService(BoardRepository boardRepository) {
		this.boardRepository = boardRepository;
	}

	public List<NoticeBoard> listArticles() {
		List<NoticeBoard> articleList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		return articleList;
	}

	public void addArticle(NoticeBoard noticeBoard) {
		boardRepository.save(noticeBoard);
	}

	public NoticeBoard viewArticle(int articleNo) {
		Optional<NoticeBoard> optional = boardRepository.findById(articleNo); // findById : 1건만 조회
		NoticeBoard article = null;
		if (optional.isPresent()) {
			article = optional.get(); // 값을 빼서 넣어줌
		}
		return article;
	}

	public void editArticle(NoticeBoard noticeBoard) {
		Optional<NoticeBoard> optional = boardRepository.findById(noticeBoard.getId()); // 해당 아이디를 갖고 와서 걔를 수정함
		NoticeBoard article = null;
		if (optional.isPresent()) {
			article = optional.get();
			article.setTitle(noticeBoard.getTitle());
			article.setContent(noticeBoard.getContent());
			boardRepository.save(article); // 넘겨준 아이디를 이용해서 데이터를 끄집어내와서 title, content를 바꿔주고 다시 돌려줌
		}

	}

	public void removeArticle(int articleNo) {
		boardRepository.deleteById(articleNo);
	}
}
