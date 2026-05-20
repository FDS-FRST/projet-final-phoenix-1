package ht.ueh.first.spring.foodshareapi.repository;

import ht.ueh.first.spring.foodshareapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}