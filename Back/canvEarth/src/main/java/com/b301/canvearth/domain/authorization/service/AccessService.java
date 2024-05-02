package com.b301.canvearth.domain.authorization.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class AccessService {

    private final RedisTemplate<String, String> accessRedisTemplate;

    public AccessService(@Qualifier("AccessRedisTemplate") RedisTemplate<String, String> accessRedisTemplate) {
        this.accessRedisTemplate = accessRedisTemplate;
    }


    public void saveAccessToken(String username, String accessToken, Long expiresIn) {

        accessRedisTemplate.opsForValue().set(username, accessToken, expiresIn, TimeUnit.SECONDS);
    }

    public boolean isAccessTokenValid(String username, String accessToken) {

        String storeRefreshToken = accessRedisTemplate.opsForValue().get(username);
        return accessToken.equals(storeRefreshToken);
    }

    public void deleteAccessToken(String username) {

        accessRedisTemplate.delete(username);
    }
}
