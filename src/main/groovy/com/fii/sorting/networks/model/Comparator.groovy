package com.fii.sorting.networks.model

import javax.persistence.*

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
    @JoinColumn(name="parallel_comparators_id", nullable=false)
    ParallelComparators parallelComparators
}
