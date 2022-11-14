package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//낙찰 정보 
@Data
public class Winning_bid {
	
	 // 낙찰 순번 
    private int wb_seq;

    // 상품 번호 
    private int pro_num;

    // 최종 낙찰가 
    private int wb_price;

    // 회원 아이디 
    private String mem_id;

    // 배송 주소 
    private String wb_delivery_addr;

    // 물품 수령 여부 
    private String delivery_check;
    
    // 구매기한
    private Date PayDeadline;
}