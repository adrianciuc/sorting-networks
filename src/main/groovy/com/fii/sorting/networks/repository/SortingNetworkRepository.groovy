package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.SortingNetwork
import com.sun.org.apache.xpath.internal.operations.Bool
import org.springframework.data.jpa.repository.JpaRepository


interface SortingNetworkRepository extends JpaRepository<SortingNetwork, Integer> {

    List<SortingNetwork> findBySortsEverything(Boolean sortsEverything)
}
