package com.fii.sorting.networks.service.exceptions


class UserAlreadyExistsException extends RuntimeException {

    String message
    String shortMessage

    UserAlreadyExistsException(String email){
        message = 'User with email ' + email + ' already exists'
        shortMessage = 'This email is already used'
    }

    @Override
    String toString() {
        return message
    }
}
