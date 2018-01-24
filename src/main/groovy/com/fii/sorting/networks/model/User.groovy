package com.fii.sorting.networks.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.SequenceGenerator
import javax.persistence.Table

import static javax.persistence.CascadeType.ALL
import static javax.persistence.GenerationType.SEQUENCE


@Entity
@Table(name = "user")
class User {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = 'user_id_seq_gen')
    @SequenceGenerator(name = 'user_id_seq_gen', sequenceName = 'user_id_seq', allocationSize = 1)
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
    @OneToMany(cascade = ALL, mappedBy = 'user')
    List<SortingNetwork> sortingNetworks
}
