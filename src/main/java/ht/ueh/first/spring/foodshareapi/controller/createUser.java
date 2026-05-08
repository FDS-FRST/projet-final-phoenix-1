package ht.ueh.first.spring.foodshareapi.controller;

import ht.ueh.first.spring.foodshareapi.model.User;
import ht.ueh.first.spring.foodshareapi.service.UserService;
import org.springframework.web.bind.annotation.*;
import ht.ueh.first.spring.foodshareapi.dto.UserRequestDTO;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class createUser {

    private final UserService userService;

    public createUser(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@Valid @RequestBody UserRequestDTO request) {
        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}