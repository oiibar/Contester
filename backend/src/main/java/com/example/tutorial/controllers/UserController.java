package com.example.tutorial.controllers;

import com.example.tutorial.models.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.tutorial.dto.UserDto;
import com.example.tutorial.services.interfaces.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<UserDto> listUsers() {
        return userService.findAllUsers();
    }

    @GetMapping(path = "{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Long id) {
        UserDto userDto = userService.getUser(id);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping()
    public void addUser(@RequestBody @Valid User user) {
        userService.saveUser(user);
    }

    @PatchMapping(path = "{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("userId") Long id, @RequestBody UserDto userDto) {
        UserDto updatedUserDto = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUserDto);
    }


    @DeleteMapping(path = "{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted successfully.");
    }
}
