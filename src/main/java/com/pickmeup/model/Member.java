package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

// 회원 정보 
@Data
public class Member {

	  // 회원 아이디 
    private String mem_id;

    // 회원 비밀번호 
    private String mem_pw;

    // 회원 이름 
    private String mem_name;

    // 회원 닉네임 
    private String mem_nick;

    // 회원 생년월일 
    private Date mem_birthdate;

    // 회원 성별 
    private String mem_gender;

    // 회원 주소 
    private String mem_addr;

    // 회원 픽머니 
    private int mem_pickmoney;

    // 참여중인 경매 
    private String mem_ing_aution;

    // 구매한 상품 
    private String mem_get_product;

    // 판매중인 상품 
    private String mem_ing_sell;

    // 회원 가입일자 
    private Date mem_joindate;

    // 회원 유형 
    private String mem_type;
    
//    public Member(int money, String nick) {
//    	this.memPickmoney = money;
//    	this.memNick = nick;
//    }
}

