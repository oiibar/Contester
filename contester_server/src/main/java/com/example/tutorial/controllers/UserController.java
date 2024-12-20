package com.example.tutorial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.example.tutorial.dto.UserDto;
import com.example.tutorial.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<UserDto> listUsers(Model model) {
        return userService.findAllUsers();
    }

    @GetMapping(path = "{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Long id) {
        UserDto userDto = userService.getUser(id);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping()
    public UserDto addUser(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }

    @PutMapping(path = "{userId}")
    public ResponseEntity<String> updateUser(@PathVariable("userId") Long id, @RequestBody UserDto userDto) {
        userService.updateUser(id, userDto);
        return ResponseEntity.ok("User with ID " + id + " has been updated successfully.");
    }

    @DeleteMapping(path = "{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted successfully.");
    }
}
