package com.seb.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter // 롬복에서 제공하는 getter, setter -> get, set 자동으로 만들어짐
@Entity // 이 클래스를 모델로 삼아서 db테이블을 만들겠다는 뜻 -> NoticeBoard테이블.....?
@Component
public class NoticeBoard {

	@Id // 이게(private Integet id(@Id 아님)가 primary key가 된다는 뜻
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 값을 만들어줌
	@Column(name = "articleNo")
	private Integer id;

	@Column(length = 100) // 길이 100
	private String title;

	@Column(length = 2000)
	private String content;

	@CreationTimestamp // 자동으로 현재 날짜로 됨
	private LocalDateTime writeDate;

	@ManyToOne
	private BoardUser writer;

	@OneToMany(mappedBy = "noticeBoard", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BoardComment> comments = new ArrayList<>();
}
