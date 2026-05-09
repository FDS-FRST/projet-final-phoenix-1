package ht.ueh.first.spring.foodshareapi.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super(" User not  found : " + id);
    }
}