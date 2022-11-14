package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//낙찰 정보 
@Data
public class Winning_bid {
	
	 // 낙찰 순번 
    private int wbSeq;

    // 상품 번호 
    private int proNum;

    // 최종 낙찰가 
    private int wbPrice;

    // 회원 아이디 
    private String memId;

    // 배송 주소 
    private String wbDeliveryAddr;

    // 물품 수령 여부 
    private String deliveryCheck;
    
    // 구매기한
    private Date PayDeadline;
}