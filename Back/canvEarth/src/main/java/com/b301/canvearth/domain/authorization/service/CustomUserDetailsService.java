package com.b301.canvearth.domain.authorization.service;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
    User 정보 검색을 위한 CustomUserDetailsService
 */
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            return new CustomUserDetails(optionalUser.get());
        } else {
            throw new UsernameNotFoundException("Go to LoginFilter(unsuccessfulAuthentication)");
        }
    }
}
