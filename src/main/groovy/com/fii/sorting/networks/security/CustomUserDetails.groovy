package com.fii.sorting.networks.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User


class CustomUserDetails extends User {


    Integer userId

     CustomUserDetails(String username, String password, Integer userId,
                             Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities)
        this.userId = userId
    }

     CustomUserDetails(String username, String password, Integer userId, boolean enabled,
                             boolean accountNonExpired,
                             boolean credentialsNonExpired, boolean accountNonLocked,
                             Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities)
        this.userId = userId
    }
}
