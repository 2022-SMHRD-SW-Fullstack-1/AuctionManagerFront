package com.pickmeup.model;

import lombok.Data;

//구매자 리뷰 
@Data
public class Review {
	
	// 리뷰 순번 
    private int rvSeq;

    // 리뷰 내용 
    private String rvContent;

    // 평점 
    private double rvRating;

    // 회원 아이디 
    private String memId;

    // 상품 번호 
    private int proNum;
    
}
