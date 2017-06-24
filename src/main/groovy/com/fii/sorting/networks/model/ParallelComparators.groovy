package com.fii.sorting.networks.model

import javax.persistence.*

import static javax.persistence.CascadeType.ALL

@Entity
@Table(name = 'parallel_comparators')
class ParallelComparators {
    @Id
    @GeneratedValue
    Integer id
    @OneToMany(cascade = ALL, mappedBy = 'parallelComparators')
    List<Comparator> comparators
    @ManyToOne
    @JoinColumn(name="sorting_network_id", nullable=false)
    SortingNetwork sortingNetwork
}
