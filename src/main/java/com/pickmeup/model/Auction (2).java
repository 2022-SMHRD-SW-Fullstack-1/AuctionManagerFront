package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//경매 정보
@Data
public class Auction {

	 // 입찰 순번 
    private int aucSeq;

    // 회원 아이디 
    private String memId;

    // 입찰 가격 
    private int aucPrice;

    // 입찰 시간 
    private Date aucTime;

    // 상품 번호 
    private int proNum;

    // 입찰 보증금 
    private int aucDeposit;
}

