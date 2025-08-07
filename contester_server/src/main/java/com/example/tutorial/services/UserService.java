package com.example.tutorial.services;

import com.example.tutorial.dto.UserDto;
import com.example.tutorial.models.User;

import java.util.List;

public interface UserService {
    List<UserDto> findAllUsers();
    void saveUser(User user);
    UserDto getUser(Long id);
    void deleteUser(Long id);
    UserDto updateUser(Long id, UserDto userDto);
}
