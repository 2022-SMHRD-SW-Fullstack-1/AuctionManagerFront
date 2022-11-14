package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

// 회원 정보 
@Data
public class Member {

	// 회원 아이디 
    private String memId;

    // 회원 비밀번호 
    private String memPw;

    // 회원 이름 
    private String memName;

    // 회원 닉네임 
    private String memNick;

    // 회원 생년월일 
    private Date memBirthdate;

    // 회원 성별 
    private String memGender;

    // 회원 주소 
    private String memAddr;

    // 회원 픽머니 
    private int memPickmoney;

    // 참여중인 경매 
    private String memIngAution;

    // 구매한 상품 
    private String memGetProduct;

    // 판매중인 상품 
    private String memIngSell;

    // 회원 가입일자 
    private Date memJoindate;

    // 회원 유형 
    private String memType;
    
    public Member(int money, String nick) {
    	this.memPickmoney = money;
    	this.memNick = nick;
    }
}

