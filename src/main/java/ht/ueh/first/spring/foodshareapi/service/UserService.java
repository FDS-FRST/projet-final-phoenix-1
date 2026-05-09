package ht.ueh.first.spring.foodshareapi.service;

import ht.ueh.first.spring.foodshareapi.dto.UserRequestDTO;
import ht.ueh.first.spring.foodshareapi.exception.UserNotFoundException;
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
    public User updateUser(Long id, UserRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }
    //  afficher youn
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
    // DELETE
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}