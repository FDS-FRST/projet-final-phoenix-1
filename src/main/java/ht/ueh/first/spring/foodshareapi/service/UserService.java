package ht.ueh.first.spring.foodshareapi.service;

import ht.ueh.first.spring.foodshareapi.model.User;
import ht.ueh.first.spring.foodshareapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor Injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //  Create user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    //  Affiche liste
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //  afficher youn
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // DELETE
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}