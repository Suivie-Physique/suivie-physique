package com.sp.mail.service;

import com.sp.mail.config.EmailTemplateName;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@Async
@RequiredArgsConstructor
public class MailService {

    @Value("${spring.mail.properties.mail.inbox}")
    public static final String MAIL_INBOX = "dotcipher@ncrm.com";
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;


    public void sendEmail(EmailTemplateName emailTemplate, String to, String username, String subject, String confirmationUrl, String activationCode)
    throws MessagingException {
        // Send email
        String templateName;
        if (emailTemplate == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.name();
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());


        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activationCode", activationCode);
        properties.put("typeAction", subject);

        Context context = new Context();
        context.setVariables(properties);
        helper.setFrom(MAIL_INBOX);
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);

        mailSender.send(mimeMessage);
    }



}
