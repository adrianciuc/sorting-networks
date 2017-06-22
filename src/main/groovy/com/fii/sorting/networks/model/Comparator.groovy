package com.fii.sorting.networks.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table


@Entity
@Table(name = "comparator")
class Comparator {
    @Id
    @GeneratedValue
    Integer id
    @Column(name = 'top_wire_number')
    Integer topWireNumber
    @Column(name = 'bottom_wire_number')
    Integer bottomWireNumber
    @ManyToOne
    @JoinColumn(name="sorting_network_id", nullable=false)
    SortingNetwork sortingNetwork
}
