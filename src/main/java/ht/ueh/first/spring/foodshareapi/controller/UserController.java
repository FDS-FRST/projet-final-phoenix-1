package ht.ueh.first.spring.foodshareapi.controller;

import ht.ueh.first.spring.foodshareapi.dto.UserRequestDTO;
import ht.ueh.first.spring.foodshareapi.dto.UserResponseDTO;
import ht.ueh.first.spring.foodshareapi.model.User;
import ht.ueh.first.spring.foodshareapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDTO createUser(@Valid @RequestBody UserRequestDTO request) {
        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        User savedUser = userService.createUser(user);

        return mapToResponse(savedUser);
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return mapToResponse(user);
    }
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO request
    ) {

        User updatedUser = userService.updateUser(id, request);

        return mapToResponse(updatedUser);
    }
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        return userService.getAllUsers()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    private UserResponseDTO mapToResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}