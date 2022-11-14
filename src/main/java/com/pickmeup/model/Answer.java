package com.pickmeup.model;

import java.sql.Date;

import lombok.Data;

//질답 응답 
@Data
public class Answer {
	
	 // 응답 순번 
    private int ans_seq;

    // 질답 순번 
    private int qna_seq;

    // 응답 내용 
    private String ans_content;

    // 응답 작성일자 
    private Date ans_date;

    // 회원 아이디 
    private String mem_id;
}
