package com.sk.dream.service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sk.dream.entity.User;
import com.sk.dream.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	@Autowired 
	JavaMailSender javaMailSender;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	PasswordEncoder passwordEncoder;
	
	@Value("${spring.mail.username}") private String sender;
	
	private static final long OTP_VALID_DURATION = 5 * 60 * 1000;   // 5 minutes
	
	public int generateOneTimePassword()
	        throws UnsupportedEncodingException, MessagingException {
		Random rand = new Random();
		int max=9999,min=1000;
	    int OTP = rand.nextInt(max - min + 1) + min;
	    return OTP;
	}
	
	public void sendOTPEmail(User user, String otp) throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(user.getEmail());
		String subject = "One Time Password (OTP) - Expire in 5 minutes!";
		String content = "<p>Hello " + user.getFirstName() + ",</p>"
	            + "<p>For security reason, you're required to use the following "
	            + "One Time Password to login:</p>"
	            + "<p><b>" + otp + "</b></p>"
	            + "<br>"
	            + "<p>Note: this OTP is set to expire in 5 minutes.</p>";
		helper.setSubject(subject);	     
	    helper.setText(content, true);
	    javaMailSender.send(message);  
	}
	
	public void sendLinkForForgotPassword(User user, String link) throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(user.getEmail());
		String subject = "Password reset link - Expire in 5 minutes!";
		String content = "<p>Hello " + user.getFirstName() + ",</p>"
	            + "<p>For security reason, please click on the following link"
	            + "Password reset link:</p>"
	            + "<p><b>" + link + "</b></p>"
	            + "<br>"
	            + "<p>Note: this link is set to expire in 5 minutes.</p>";
		helper.setSubject(subject);	     
	    helper.setText(content, true);
	    javaMailSender.send(message);  
	}
	
	public boolean isOTPValid(Date otpRequestedTime) {
        long currentTimeInMillis = System.currentTimeMillis();
        long otpRequestedTimeInMillis = otpRequestedTime.getTime();
        if (otpRequestedTimeInMillis + OTP_VALID_DURATION < currentTimeInMillis) {
            return false;
        }
        return true;
    }
}
