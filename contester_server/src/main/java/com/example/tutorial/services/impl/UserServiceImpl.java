package com.example.tutorial.services.impl;

import com.example.tutorial.dto.UserDto;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.UserRepository;
import com.example.tutorial.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToUserDto).collect(Collectors.toList());
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDto getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " does not exist"));
        return mapToUserDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " does not exist"));

        existingUser.setUsername(userDto.getUsername());
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setBio(userDto.getBio());
        existingUser.setContests(userDto.getContests());
        existingUser.setCountry(userDto.getCountry());
        existingUser.setRating(userDto.getRating());
        existingUser.setProblemsSolved(userDto.getProblemsSolved());

        if (!existingUser.getEmail().equals(userDto.getEmail())) {
            existingUser.setEmail(userDto.getEmail());
        }
        userRepository.save(existingUser);
        return mapToUserDto(existingUser);
    }


    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getRealUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .rating(user.getRating())
                .contests(user.getContests())
                .country(user.getCountry())
                .problemsSolved(user.getProblemsSolved())
                .email(user.getEmail())
                .bio(user.getBio())
                .password(user.getPassword())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    private User mapToUserEntity(UserDto userDto) {
        return User.builder()
                .username(userDto.getUsername())
                .problemsSolved(userDto.getProblemsSolved())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .contests(userDto.getContests())
                .rating(userDto.getRating())
                .bio(userDto.getBio())
                .country(userDto.getCountry())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }
}
