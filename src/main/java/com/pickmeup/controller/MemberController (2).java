package com.pickmeup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pickmeup.model.Member;
import com.pickmeup.service.MemberService;

@RestController
@CrossOrigin(origins = "*")
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@GetMapping("/mypage/{memid}")
	public Member setInfo(@PathVariable("memid") String memId) {
		int money = memberService.getPickMoney(memId);
		String nick = memberService.getNick(memId);
		Member vo = new Member(money,nick);
	
		return vo;
	}
	
}
