package com.fii.sorting.networks.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.SequenceGenerator
import javax.persistence.Table

import static javax.persistence.CascadeType.ALL
import static javax.persistence.GenerationType.SEQUENCE


@Entity
@Table(name = "sorting_network")
class SortingNetwork {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = 'sn_id_seq_gen')
    @SequenceGenerator(name = 'sn_id_seq_gen', sequenceName = 'sn_id_seq', allocationSize = 1)
    Integer id
    @Column(name = 'number_of_wires')
    Integer numberOfWires;
    @OneToMany(cascade = ALL, mappedBy = 'sortingNetwork')
    List<ParallelComparators> parallelComparators
    @ManyToOne
    @JoinColumn(name = 'user_id', nullable = false)
    User user
    @Column(name = 'sorts_everything')
    Boolean sortsEverything
}
