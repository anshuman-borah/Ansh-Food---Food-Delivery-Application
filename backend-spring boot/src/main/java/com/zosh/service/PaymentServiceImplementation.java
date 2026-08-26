package com.zosh.service;

import com.zosh.model.Order;
import com.zosh.model.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImplementation implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    // Defaults to localhost:3000 if FRONTEND_URL is not set in environment
    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public PaymentResponse generatePaymentLink(Order order) throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendUrl + "/payment/success/" + order.getId())
                .setCancelUrl(frontendUrl + "/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount((long) (order.getTotalAmount() * 100)) // Amount in cents
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Ansh Foods - Order #" + order.getId())
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);

        System.out.println("Stripe Checkout Session URL: " + session.getUrl());

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
