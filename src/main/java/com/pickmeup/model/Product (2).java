package com.pickmeup.model;
import java.sql.Date;

import lombok.Data;

//상품 목록 
@Data
public class Product {
	
	 // 상품 번호 
    private int proNum;

    // 회원 아이디 
    private String memId;

    // 상품 명 
    private String proName;

    // 입찰 시작가 
    private int proMinPrice;

    // 상품 마감기한 
    private Date proDeadline;

    // 상품 설명 
    private String proDesc;

    // 상품 브랜드 
    private String proBrand;

    // 상품 카테고리 
    private String proCategory;

    // 상품 상태 
    private String proStatus;

    // 상품 사진 
    private String proPhoto;
}