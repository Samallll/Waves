package com.waves.paymentservice.controller;

import com.waves.paymentservice.services.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@EnableMethodSecurity
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PreAuthorize("hasAnyRole('USER','HOST','ADMIN')")
    @PostMapping("/create-checkout-session")
    public ResponseEntity<String> createCheckoutSession(@RequestBody Map<String, Object> requestData){

        long amountLong = ((Number) requestData.get("amount")).longValue();
        long eventId = ((Number) requestData.get("eventId")).longValue();
        return ResponseEntity.ofNullable(paymentService.getSessionId(eventId,amountLong));
    }

    @PreAuthorize("hasAnyRole('USER','HOST','ADMIN')")
    @GetMapping("/get-payment-details")
    public ResponseEntity<String> getPaymentDetails(@RequestParam String sessionId){
        return ResponseEntity.ok(paymentService.getPaymentDetials(sessionId));
    }
}
