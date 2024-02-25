package com.waves.paymentservice.services;

public interface PaymentService {

    String getSessionId(Long eventId,Long amount);

    String getPaymentDetials(String sessionId);

}
