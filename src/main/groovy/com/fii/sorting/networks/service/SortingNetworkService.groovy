package com.fii.sorting.networks.service

import com.fii.sorting.networks.beans.ComparatorBean
import com.fii.sorting.networks.beans.ParallelComparatorsBean
import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.beans.UserBean
import com.fii.sorting.networks.model.ParallelComparators
import com.fii.sorting.networks.model.SortingNetwork
import com.fii.sorting.networks.model.User
import com.fii.sorting.networks.repository.SortingNetworkRepository
import com.fii.sorting.networks.repository.UserRepository
import com.fii.sorting.networks.security.CustomUserDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SortingNetworkService {

    private final SortingNetworkRepository sortingNetworkRepository

    private final UserRepository userRepository

    @Autowired
    SortingNetworkService(SortingNetworkRepository sortingNetworkRepository, UserRepository userRepository) {
        this.sortingNetworkRepository = sortingNetworkRepository
        this.userRepository = userRepository
    }

    List<SortingNetworkBean> getAll() {
        sortingNetworkRepository.findAll().collect {
            new SortingNetworkBean(
                    id: it.id,
                    user: new UserBean(
                            email: it.user.email,
                            firstName: it.user.firstName,
                            lastName: it.user.lastName
                    ),
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

    List<SortingNetworkBean> getAllForUser(CustomUserDetails user) {
        userRepository
                .findByEmail(user.username)
                .first()
                .sortingNetworks
                .collect {
                    new SortingNetworkBean(
                            id: it.id,
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

    void deleteSortingNetwork(CustomUserDetails user, Integer snId) {
        if (user) {
            SortingNetwork sn = sortingNetworkRepository.findOne(snId)
            if (sn?.user?.email?.equalsIgnoreCase(user?.username)) {
                sortingNetworkRepository.delete(snId)
            }
        }
    }
}
