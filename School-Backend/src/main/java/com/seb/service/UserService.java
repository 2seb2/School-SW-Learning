package com.seb.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seb.model.BoardUser;
import com.seb.model.DataNotFoundException;
import com.seb.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public BoardUser create(String username, String email, String password) {
		BoardUser user = new BoardUser();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);

		return user;
	}

	public BoardUser getUser(String name) {
		Optional<BoardUser> boardUser = userRepository.findByUsername(name);
		if (boardUser.isPresent()) {
			return boardUser.get();
		} else {
			throw new DataNotFoundException("board_user not found!");
		}
	}
}
