package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.ParallelComparators
import org.springframework.data.jpa.repository.JpaRepository

interface ParallelComparatorRepository extends JpaRepository<ParallelComparators, Integer> {
}