package com.pickmeup.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickmeup.mapper.MemberMapper;
import com.pickmeup.model.Member;


@Service
public class MemberService {
	@Autowired
	MemberMapper memberMapper;
	
	public int getPickMoney(String memId) {
		return memberMapper.getPickMoney(memId);		
	}

	public String getNick(String memId) {
		return memberMapper.getNick(memId);		
	}
}

