package com.pickmeup.model;
import java.sql.Date;

import lombok.Data;

//상품 목록 
@Data
public class Product {
	
	 // 상품 번호 
    private int pro_num;

    // 회원 아이디 
    private String mem_id;

    // 상품 명 
    private String pro_name;

    // 입찰 시작가 
    private int pro_min_price;

    // 상품 마감기한 
    private Date pro_deadline;

    // 상품 설명 
    private String pro_desc;

    // 상품 브랜드 
    private String pro_brand;

    // 상품 카테고리 
    private String pro_category;

    // 상품 상태 
    private String pro_status;

    // 상품 사진 
    private String pro_photo;
}