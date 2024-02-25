package com.waves.paymentservice.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StripePaymentService implements PaymentService{

    @Value("${stripe.api-key}")
    private String stripeKey;

    public void initializeStripe(){
        Stripe.apiKey = stripeKey;
    }
    @Override
    public String getSessionId(Long eventId,Long amount) {

        initializeStripe();

        try {
            SessionCreateParams.Builder builder = new SessionCreateParams.Builder();
            builder.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD);
            builder.setMode(SessionCreateParams.Mode.PAYMENT);
            builder.setSuccessUrl("http://127.0.0.1:8090/payment-successfull?session_id={CHECKOUT_SESSION_ID}");
            builder.setCancelUrl("http://127.0.0.1:8090/user/event-details/" + eventId);
            builder.setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.AUTO);
            builder.setShippingAddressCollection(
                    SessionCreateParams.ShippingAddressCollection.builder()
                            .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.IN)
                            .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.US)
                            .build());
            builder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("inr")
                                            .setUnitAmount(amount*100)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName("Event Ticket Price")
                                                            .build()
                                            )
                                            .build()
                            )
                            .build()
            );

            SessionCreateParams params = builder.build();
            Session session = Session.create(params);
            log.info("Checkout Session created successfully with Stripe Gateway");
            return session.getId();
        } catch (StripeException e) {
            log.debug("Failed to make a Checkout Session with Stripe Gateway");
            return "Failed to create Checkout Session";
        }
    }

    @Override
    public String getPaymentDetials(String sessionId) {

        initializeStripe();
        try {
            Session session = Session.retrieve(sessionId);
        } catch (StripeException e) {
            log.debug("Failed to fetch the payment details from the server: {}", e.getMessage());
            return "Failed to fetch the payment details from the server";
        }
        log.info("Successfully fetched Payment Details from stripe");
        return "Successfully fetched details";
    }
}
