package com.fii.sorting.networks.service

import com.fii.sorting.networks.beans.ParallelComparatorsBean
import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.security.CustomUserDetails
import org.springframework.stereotype.Service

import static java.lang.Integer.parseInt
import static java.lang.Integer.toBinaryString
import static java.lang.String.valueOf

@Service
class SortingNetworkCheckService {

    def checkIfSortsAllInput(CustomUserDetails authenticatedUser, SortingNetworkBean sortingNetworkBean) {
        if (authenticatedUser) {
            def inputList = sortingNetworkBean.unsortedInput ? sortingNetworkBean.unsortedInput :
                    this.generateInput(sortingNetworkBean.numberOfWires)
            def originalInputList = inputList.collect{
                it.collect()
            }
            def inputNotSorted = []
            inputList.each { input ->
                sortInput(input, sortingNetworkBean)
            }
            inputList.eachWithIndex { input, index ->
                checkIfItIsSorted(input, index, inputNotSorted, originalInputList)
            }
            return inputNotSorted
        }
    }

    private void checkIfItIsSorted(List input, Integer index, inputNotSorted, List originalInputList) {
        def sorted = true
        for (int i = 1; i < input.size(); i++) {
            if (input[i - 1] > input[i]) {
                sorted = false
                break
            }
        }
        if (!sorted) {
            inputNotSorted.add(originalInputList[index])
        }
    }

    private List<ParallelComparatorsBean> sortInput(List input, sortingNetworkBean) {
        sortingNetworkBean.parallelComparators.each { pc ->
            pc.comparators.each { cmp ->
                if (input[cmp.topWireNumber] > input[cmp.bottomWireNumber]) {
                    input.swap(cmp.topWireNumber, cmp.bottomWireNumber)
                }
            }
        }
    }

    private def generateInput(int numberOfWires) {
        def start = System.currentTimeMillis()
        def toReturn = []
        int biggestInputValue = 2 ** numberOfWires - 1
        (biggestInputValue..0).collect { nr ->
            char[] c = toBinaryString(nr).toCharArray()
            def repr = []
            for (int i = 0; i < c.size(); i++) {
                repr.add(parseInt(valueOf(c[i])))
            }
            if (repr.size() < numberOfWires) {
                def padding = 0..(numberOfWires - repr.size() - 1)
                for (int i = 0; i < padding.size(); i++) {
                    repr.add(0, 0)
                }
            }
            toReturn.add(repr)
        }
        println("Time spent to generate input: " + (System.currentTimeMillis() - start)
                + "ms with input size " + toReturn.size())
        return toReturn
    }
}
