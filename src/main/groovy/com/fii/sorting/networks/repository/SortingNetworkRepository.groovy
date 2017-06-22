package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.SortingNetwork
import org.springframework.data.jpa.repository.JpaRepository


interface SortingNetworkRepository extends JpaRepository<SortingNetwork, Integer> {
}
