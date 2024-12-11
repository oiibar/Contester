package com.example.tutorial.services;

import com.example.tutorial.dto.UserDto;
import java.util.List;

public interface UserService {
    List<UserDto> findAllUsers();
    UserDto saveUser(UserDto userDto);
    UserDto getUser(Long id);
    void deleteUser(Long id);
    UserDto updateUser(Long id, UserDto userDto);
}
