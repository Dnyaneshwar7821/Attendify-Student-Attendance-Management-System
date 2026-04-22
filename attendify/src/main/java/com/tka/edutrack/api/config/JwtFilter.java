package com.tka.edutrack.api.config;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tka.edutrack.api.util.JwtUtil;

@Component
public class JwtFilter extends GenericFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String path = req.getRequestURI();

		// ALLOW PUBLIC + MODULE APIs WITHOUT TOKEN
		if (path.startsWith("/user/") || path.startsWith("/student/") || path.startsWith("/subject/")
				|| path.startsWith("/attendance/")) {

			chain.doFilter(request, response);
			return;
		}

		String header = req.getHeader("Authorization");

		if (header == null || !header.startsWith("Bearer ")) {
			res.setStatus(HttpServletResponse.SC_FORBIDDEN);
			return;
		}

		String token = header.substring(7);

		if (!jwtUtil.validateToken(token)) {
			res.setStatus(HttpServletResponse.SC_FORBIDDEN);
			return;
		}

		String username = jwtUtil.extractUsername(token);

		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null,
				Collections.emptyList());

		SecurityContextHolder.getContext().setAuthentication(auth);

		chain.doFilter(request, response);
	}
}