package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.User
import org.springframework.data.jpa.repository.JpaRepository


interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email)
}