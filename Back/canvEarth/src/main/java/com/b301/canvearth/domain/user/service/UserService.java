package com.b301.canvearth.domain.user.service;

import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    final private UserRepository userRepository;
    final private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public void signInProcess(SignInDto signinDto) {
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();

        boolean isExist = userRepository.existsById(username);

        if(isExist){
            return;
        }

        User data = new User();
        data.setId(username);
        data.setUserName(username);
        data.setUserPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_ADMIN");

        userRepository.save(data);
    }

}
