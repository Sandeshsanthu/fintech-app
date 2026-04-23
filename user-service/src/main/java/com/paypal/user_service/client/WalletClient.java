package com.paypal.user_service.client;

import com.paypal.user_service.dto.CreateWalletRequest;
import com.paypal.wallet_service.dto.WalletResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

<<<<<<< HEAD
// @FeignClient(name = "wallet-service", url = "http://localhost:8088/api/v1/wallets")
@FeignClient(name = "wallet-service", url = "${WALLET_SERVICE_URL:http://localhost:8088}/api/v1/wallets")
=======
// Use configuration property instead of hardcoded URL
@FeignClient(name = "wallet-service", url = "${wallet.service.url:http://localhost:8088}/api/v1/wallets")
>>>>>>> ed1be7f58c9ac4a33d3f0888a1bd101508b2be19
public interface WalletClient {

    @PostMapping
    WalletResponse createWallet(@RequestBody CreateWalletRequest request);
}
