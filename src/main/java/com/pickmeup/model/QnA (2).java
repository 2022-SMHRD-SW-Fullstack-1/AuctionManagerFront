package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//상품 질의 응답 
@Data
public class QnA {
	
	// 질답 순번 
    private int qnaSeq;

    // 상품 순번 
    private int proNum;

    // 질문 
    private String qnaContent;

    // 질문 작성일자 
    private Date qnaDate;

    // 회원 아이디 
    private String memId;
    
}
