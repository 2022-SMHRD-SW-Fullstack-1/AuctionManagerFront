package com.pickmeup.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class test {
	
	@GetMapping("/hello")
	public String Hello() {
		return "ㅇ렂마ㅣ.......";
	}
}
