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
    @Column(name = "username")
    String userName
    @Column(name = "password")
    String password
    @Column(name = "role")
    String role
}
