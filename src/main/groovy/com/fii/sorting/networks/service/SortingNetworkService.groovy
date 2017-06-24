package com.fii.sorting.networks.service

import com.fii.sorting.networks.beans.ComparatorBean
import com.fii.sorting.networks.beans.ParallelComparatorsBean
import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.model.ParallelComparators
import com.fii.sorting.networks.repository.SortingNetworkRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SortingNetworkService {

    private final SortingNetworkRepository sortingNetworkRepository

    @Autowired
    SortingNetworkService(SortingNetworkRepository sortingNetworkRepository) {
        this.sortingNetworkRepository = sortingNetworkRepository
    }

    List<SortingNetworkBean> getAll() {
        sortingNetworkRepository.findAll().collect {
            new SortingNetworkBean(
                    numberOfWires: it.numberOfWires,
                    parallelComparators: it.parallelComparators.collect {
                        new ParallelComparatorsBean(
                                comparators: it.comparators.collect {
                                    new ComparatorBean(
                                            topWireNumber: it.topWireNumber,
                                            bottomWireNumber: it.bottomWireNumber
                                    )
                                }
                        )
                    }
            )
        }
    }
}
