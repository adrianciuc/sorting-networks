package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.PersistentLogin
import org.springframework.data.jpa.repository.JpaRepository


interface PersistentLoginRepository extends JpaRepository<PersistentLogin, String> {

    List<PersistentLogin> findByEmail(String email)
}