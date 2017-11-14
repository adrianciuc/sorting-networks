package com.fii.sorting.networks.service

import com.fii.sorting.networks.beans.UserBean
import com.fii.sorting.networks.model.User
import com.fii.sorting.networks.repository.UserRepository
import com.fii.sorting.networks.service.exceptions.UserAlreadyExistsException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class RegisterService {

    @Autowired
    UserRepository userRepository

    @Autowired
    private PasswordEncoder encoder

    void registerNewUser(UserBean userBean) {
        if (!userRepository.findByEmail(userBean.email).isEmpty()) {
            throw new UserAlreadyExistsException(userBean.email)
        }
        // TODO: Check if password and repeated password matches
        userRepository.save(new User(
                email: userBean.email,
                firstName: userBean.firstName,
                lastName: userBean.lastName,
                password: encoder.encode(userBean.password),
                role: 'USER'
        ))
    }
}
