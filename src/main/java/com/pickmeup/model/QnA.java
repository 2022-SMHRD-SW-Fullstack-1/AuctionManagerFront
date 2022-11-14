package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//상품 질의 응답 
@Data
public class QnA {
	
	// 질답 순번 
    private int qna_seq;

    // 상품 순번 
    private int pro_num;

    // 질문 
    private String qna_content;

    // 질문 작성일자 
    private Date qna_date;

    // 회원 아이디 
    private String mem_id;
    
}
