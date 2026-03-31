package com.springbootmicroservices.orderservice.service.impl;

import com.springbootmicroservices.orderservice.exception.OrderNotFoundException;
import com.springbootmicroservices.orderservice.exception.PaymentProcessingException;
import com.springbootmicroservices.orderservice.model.order.dto.request.PaymentRequestDto;
import com.springbootmicroservices.orderservice.model.order.dto.response.PaymentResponse;
import com.springbootmicroservices.orderservice.model.order.entity.OrderEntity;
import com.springbootmicroservices.orderservice.repository.OrderRepository;
import com.springbootmicroservices.orderservice.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.payment.return-url}")
    private String returnUrl;

    // Explicit constructor because @Value fields can't mix with @RequiredArgsConstructor
    public PaymentServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequestDto paymentRequest) {
        log.warn("processPayment called but not implemented for Stripe redirect flow.");
        throw new UnsupportedOperationException("processPayment is not supported in this implementation.");
    }

    @Override
    public String createStripeCheckoutSession(String orderId) {
        // 1. Fetch the order from your database
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));

        // 2. Define redirect URLs using the env-driven returnUrl
        String successUrl = returnUrl + "/success?session_id={CHECKOUT_SESSION_ID}";
        String cancelUrl  = returnUrl + "/cancel";

        // 3. Create line items for Stripe
        List<SessionCreateParams.LineItem> lineItems = order.getItems().stream()
                .map(item -> SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(item.getUnitPrice()
                                        .multiply(new BigDecimal("100")).longValue())
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(item.getProductName())
                                                .build())
                                .build())
                        .setQuantity(Long.valueOf(item.getQuantity()))
                        .build())
                .collect(Collectors.toList());

        // 4. Build session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .putMetadata("orderId", order.getId())
                .build();

        try {
            // 5. Create Stripe session and return the redirect URL
            Session session = Session.create(params);
            return session.getUrl();
        } catch (StripeException e) {
            log.error("Error creating Stripe session for order {}: {}", orderId, e.getMessage(), e);
            throw new PaymentProcessingException("Could not create Stripe payment session.");
        }
    }
}