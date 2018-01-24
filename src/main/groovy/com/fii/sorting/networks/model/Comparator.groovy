package com.fii.sorting.networks.model

import javax.persistence.*

import static javax.persistence.GenerationType.SEQUENCE

@Entity
@Table(name = "comparator")
class Comparator {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = 'cmp_id_seq_gen')
    @SequenceGenerator(name = 'cmp_id_seq_gen', sequenceName = 'cmp_id_seq', allocationSize = 1)
    Integer id
    @Column(name = 'top_wire_number')
    Integer topWireNumber
    @Column(name = 'bottom_wire_number')
    Integer bottomWireNumber
    @ManyToOne
    @JoinColumn(name="parallel_comparators_id", nullable=false)
    ParallelComparators parallelComparators
}
