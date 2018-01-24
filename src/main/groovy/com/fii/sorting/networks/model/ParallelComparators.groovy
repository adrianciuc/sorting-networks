package com.fii.sorting.networks.model

import javax.persistence.*

import static javax.persistence.CascadeType.ALL
import static javax.persistence.GenerationType.SEQUENCE

@Entity
@Table(name = 'parallel_comparators')
class ParallelComparators {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = 'pc_id_seq_gen')
    @SequenceGenerator(name = 'pc_id_seq_gen', sequenceName = 'pc_id_seq', allocationSize = 1)
    Integer id
    @OneToMany(cascade = ALL, mappedBy = 'parallelComparators')
    List<Comparator> comparators
    @ManyToOne
    @JoinColumn(name="sorting_network_id", nullable=false)
    SortingNetwork sortingNetwork
}
