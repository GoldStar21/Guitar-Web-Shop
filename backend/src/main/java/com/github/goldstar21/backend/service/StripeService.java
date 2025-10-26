package com.github.goldstar21.backend.service;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StripeService {

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    //Checkout Session - Stripe form
    public String createCheckoutSession(List<SessionCreateParams.LineItem> lineItems) throws Exception {

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setShippingAddressCollection(SessionCreateParams.ShippingAddressCollection.builder()
                        .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.US)
                        .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.CA)
                        .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.DE)
                        .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.FR)
                        .build()
                )
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .build();

        Session session = Session.create(params);
        return session.getUrl(); // return URL for frontend to open
    }
}
