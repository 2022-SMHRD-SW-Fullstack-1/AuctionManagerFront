package com.pickmeup.model;

import lombok.Data;

//구매자 리뷰 
@Data
public class Review {
	
	// 리뷰 순번 
    private int rv_seq;

    // 리뷰 내용 
    private String rv_content;

    // 평점 
    private Double rv_rating;

    // 회원 아이디 
    private String mem_id;

    // 상품 번호 
    private int pro_num;
    
}
