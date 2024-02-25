package com.waves.emailservice.services.Impl;

import com.waves.emailservice.dto.EmailDto;
import com.waves.emailservice.dto.ParticipationDto;
import com.waves.emailservice.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    public static final String UTF_8_ENCODING = "UTF-8";
    private final JavaMailSender javaMailSender;

    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public String sendMail(EmailDto emailDto) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(emailDto.getToList());
            mimeMessageHelper.setSubject(emailDto.getSubject());
            mimeMessageHelper.setText(emailDto.getBody());

            javaMailSender.send(mimeMessage);

            log.info("Message Sent Successfully to: {}", emailDto.getToList());
            return ("SUCCESS");
        }
        catch (Exception e) {
            log.error("sendEmail() | Error : {}", e.getMessage());
            return ("FAILURE");
        }
    }

    @Override
    public void sendParticipationMail(EmailDto emailDto, ParticipationDto participationDto) {
        try {
            Context context = new Context();
            context.setVariable("participationDto",participationDto);
            String text = templateEngine.process("participationConfirmation",context);
            MimeMessage mimeMessage = getMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, UTF_8_ENCODING);
            helper.setPriority(1);
            helper.setSubject("Successfully Registered - CrowdCraft");
            helper.setFrom(fromEmail);
            helper.setTo(emailDto.getToList());
            helper.setText(text, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private MimeMessage getMimeMessage() {
        return javaMailSender.createMimeMessage();
    }
}
