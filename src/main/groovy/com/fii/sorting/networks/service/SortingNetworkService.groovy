package com.fii.sorting.networks.service

import com.fii.sorting.networks.beans.ComparatorBean
import com.fii.sorting.networks.beans.ParallelComparatorsBean
import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.beans.UserBean
import com.fii.sorting.networks.model.Comparator
import com.fii.sorting.networks.model.ParallelComparators
import com.fii.sorting.networks.model.SortingNetwork
import com.fii.sorting.networks.model.User
import com.fii.sorting.networks.repository.ParallelComparatorRepository
import com.fii.sorting.networks.repository.SortingNetworkRepository
import com.fii.sorting.networks.repository.UserRepository
import com.fii.sorting.networks.security.CustomUserDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SortingNetworkService {

    private final SortingNetworkRepository sortingNetworkRepository

    private final UserRepository userRepository

    private final ParallelComparatorRepository parallelComparatorRepository

    private final SortingNetworkCheckService sortingNetworkCheckService

    @Autowired
    SortingNetworkService(SortingNetworkRepository sortingNetworkRepository, UserRepository userRepository,
                          ParallelComparatorRepository parallelComparatorRepository,
                          SortingNetworkCheckService sortingNetworkCheckService) {
        this.sortingNetworkRepository = sortingNetworkRepository
        this.userRepository = userRepository
        this.parallelComparatorRepository = parallelComparatorRepository
        this.sortingNetworkCheckService = sortingNetworkCheckService
    }

    List<SortingNetworkBean> getAllFinished() {
        sortingNetworkRepository.findBySortsEverything(true).collect {
            new SortingNetworkBean(
                    id: it.id,
                    user: new UserBean(
                            email: it.user.email,
                            firstName: it.user.firstName,
                            lastName: it.user.lastName
                    ),
                    numberOfWires: it.numberOfWires,
                    sortsEverything: it.sortsEverything,
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
                            sortsEverything: it.sortsEverything,
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

    SortingNetworkBean getSortingNetwork(CustomUserDetails user, Integer snId) {
        SortingNetworkBean sortingNetworkBean = null
        if (user) {
            SortingNetwork sn = sortingNetworkRepository.findOne(snId)
            if (sn?.user?.email?.equalsIgnoreCase(user?.username)) {
                sortingNetworkBean = new SortingNetworkBean(
                        user: new UserBean(
                                email: sn.user.email,
                                firstName: sn.user.firstName,
                                lastName: sn.user.lastName
                        ),
                        numberOfWires: sn.numberOfWires,
                        sortsEverything: sn.sortsEverything,
                        id: sn.id,
                        parallelComparators: sn.parallelComparators.collect { pc ->
                            new ParallelComparatorsBean(
                                    comparators: pc.comparators.collect { cmp ->
                                        new ComparatorBean(
                                                topWireNumber: cmp.topWireNumber,
                                                bottomWireNumber: cmp.bottomWireNumber
                                        )
                                    }
                            )
                        }
                )
            }
        }
        return sortingNetworkBean
    }

    void updateSortingNetwork(CustomUserDetails authenticatedUser,  Integer snId,
                              SortingNetworkBean sortingNetworkToUpdate) {
        SortingNetwork existent = sortingNetworkRepository.findOne(snId)
        if (existent) {
            if (existent.parallelComparators) {
                parallelComparatorRepository.deleteInBatch(existent.parallelComparators)
            }
            save(authenticatedUser, sortingNetworkToUpdate, existent)
        }
    }

    void saveSortingNetwork(CustomUserDetails authenticatedUser, SortingNetworkBean sortingNetworkToSave) {
        save(authenticatedUser, sortingNetworkToSave, new SortingNetwork())
    }

    private void save(CustomUserDetails authenticatedUser, SortingNetworkBean sortingNetworkToSave,
                      SortingNetwork toBeSaved) {
        if (authenticatedUser) {
            User owner = userRepository.findOne(authenticatedUser.userId)
            def unsortedInput = sortingNetworkCheckService.checkIfSortsAllInput(
                    authenticatedUser,
                    sortingNetworkToSave)
            toBeSaved.with {
                user = owner
                numberOfWires = sortingNetworkToSave.numberOfWires
                sortsEverything = (unsortedInput.size() == 0)
                parallelComparators = sortingNetworkToSave.parallelComparators.collect { pcmp ->
                    ParallelComparators parallelComparatorsToBeSaved = new ParallelComparators()
                    parallelComparatorsToBeSaved.with {
                        comparators = pcmp.comparators.collect { cmp ->
                            new Comparator(
                                    topWireNumber: cmp.topWireNumber,
                                    bottomWireNumber: cmp.bottomWireNumber,
                                    parallelComparators: parallelComparatorsToBeSaved
                            )
                        }
                        sortingNetwork = toBeSaved
                    }
                    return parallelComparatorsToBeSaved
                }
            }
            sortingNetworkRepository.save(toBeSaved)
        }
    }
}
