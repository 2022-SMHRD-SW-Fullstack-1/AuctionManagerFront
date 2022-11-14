package com.pickmeup.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pickmeup.model.Member;


@Mapper
public interface MemberMapper {
	
	public int getPickMoney(String memId);			

	public String getNick(String memId);
			
}
