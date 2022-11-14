package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//질답 응답 
@Data
public class Answer {
	
	  // 응답 순번 
    private int ansSeq;

    // 질답 순번 
    private int qnaSeq;

    // 응답 내용 
    private String ansContent;

    // 응답 작성일자 
    private Date ansDate;

    // 회원 아이디 
    private String memId;
}
