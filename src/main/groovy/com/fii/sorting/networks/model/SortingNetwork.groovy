package com.fii.sorting.networks.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

import static javax.persistence.CascadeType.ALL


@Entity
@Table(name = "sorting_network")
class SortingNetwork {
    @Id
    @GeneratedValue
    Integer id
    @Column(name = 'number_of_wires')
    Integer numberOfWires;
    @OneToMany(cascade = ALL, mappedBy = 'sortingNetwork')
    List<ParallelComparators> parallelComparators
    @ManyToOne
    @JoinColumn(name = 'user_id', nullable = false)
    User user
}
