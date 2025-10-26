package com.github.goldstar21.backend.controller;

import com.github.goldstar21.backend.dto.CartDTO;
import com.github.goldstar21.backend.repository.ProductRepository;
import com.github.goldstar21.backend.service.StripeService;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "http://localhost:3000")
public class StripeController {

    private final StripeService stripeService;


    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody List<CartDTO> cartDTOS) throws Exception {


        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        for(CartDTO p : cartDTOS) {
            lineItems.add(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity((long)p.getQuantity())
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("usd")
                                            .setUnitAmount((long)(p.getPrice() * 100))
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(p.getBrand() + " " + p.getModel())
                                                            .build()
                                            )
                                            .build()
                            )
                            .build()
            );
        }
        String url = stripeService.createCheckoutSession(lineItems);
        return Map.of("url", url);
    }
}
