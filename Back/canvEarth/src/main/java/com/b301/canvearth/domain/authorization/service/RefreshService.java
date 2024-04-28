package com.b301.canvearth.domain.authorization.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RefreshService {

    private final RedisTemplate<String, String> refreshRedisTemplate;

    public RefreshService(@Qualifier("refreshRedisTemplate") RedisTemplate<String, String> refreshRedisTemplate) {
        this.refreshRedisTemplate = refreshRedisTemplate;
    }

    public void saveRefreshToken(String username, String refreshToken, Long expiresIn) {

        refreshRedisTemplate.opsForValue().set(username, refreshToken, expiresIn, TimeUnit.SECONDS);
    }

    public boolean isRefreshTokenValid(String username, String refreshToken) {

        String storeRefreshToken = refreshRedisTemplate.opsForValue().get(username);
        return refreshToken.equals(storeRefreshToken);
    }

    public void deleteRefreshToken(String username) {

        refreshRedisTemplate.delete(username);
    }
}
