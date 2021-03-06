package com.fii.sorting.networks.security

import com.fii.sorting.networks.model.User
import com.fii.sorting.networks.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@SuppressWarnings("SpringJavaAutowiringInspection")
@Service
class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository

    @Autowired
     CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    @Override
     UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).first()
        if (user == null) {
            throw new UsernameNotFoundException("No user found with email ${user.email}")
        }
        return new CustomUserDetails(
                user.email,
                user.password,
                user.id,
                user.firstName,
                user.lastName,
                true,
                true,
                true,
                true,
                getGrantedAuthorities(user.role))
        }

    private List<GrantedAuthority> getGrantedAuthorities(String role) {
        List<GrantedAuthority> authorities = new ArrayList<>()
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role))
        return authorities
    }
}
