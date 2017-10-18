package com.fii.sorting.networks.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table


@Entity
@Table(name = "user")
class User {
    @Id
    @GeneratedValue
    Integer id
    @Column(name = 'email', nullable = false)
    String email
    @Column(name = 'password', nullable = false)
    String password
    @Column(name = 'role', nullable = false)
    String role
    @Column(name = 'first_name', nullable = false)
    String firstName
    @Column(name = 'last_name', nullable = false)
    String lastName
}
