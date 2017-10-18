package com.fii.sorting.networks.model

import javax.persistence.*

import static javax.persistence.TemporalType.TIMESTAMP

@Entity
@Table(name = "persistent_login")
class PersistentLogin {

    @Id
    String series

    @Column(name="email", unique = true, nullable = false)
    String email

    @Column(name="token", unique = true, nullable = false)
    String token

    @Column(name="last_used", nullable = false)
    @Temporal(TIMESTAMP)
    Date lastUsed
}
