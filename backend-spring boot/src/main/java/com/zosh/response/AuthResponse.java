package com.zosh.response;


import com.zosh.domain.USER_ROLE;
import lombok.Data;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Data
public class AuthResponse {
	
	private String message;
	private String jwt;

	@Enumerated(EnumType.STRING)
	private USER_ROLE role;
	


}
