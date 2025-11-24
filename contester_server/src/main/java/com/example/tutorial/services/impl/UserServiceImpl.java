package com.example.tutorial.services.impl;
import com.example.tutorial.dto.UserDto;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.UserRepository;
import com.example.tutorial.services.interfaces.UserService;
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

        if (userDto.getUsername() != null) {
            existingUser.setUsername(userDto.getUsername());
        }
        if (userDto.getFirstName() != null) {
            existingUser.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null) {
            existingUser.setLastName(userDto.getLastName());
        }
        if (userDto.getBio() != null) {
            existingUser.setBio(userDto.getBio());
        }
        if (userDto.getContests() != null) {
            existingUser.setContests(userDto.getContests());
        }
        if (userDto.getProblems() != null) {
            existingUser.setProblems(userDto.getProblems());
        }
        if (userDto.getCountry() != null) {
            existingUser.setCountry(userDto.getCountry());
        }
        if (userDto.getRating() != 0) {
            existingUser.setRating(userDto.getRating());
        }
        if (userDto.getProblemsSolved() != null) {
            existingUser.setProblemsSolved(userDto.getProblemsSolved());
        }
        if (userDto.getEmail() != null && !existingUser.getEmail().equals(userDto.getEmail())) {
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
                .problems(user.getProblems())
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
                .problems(userDto.getProblems())
                .rating(userDto.getRating())
                .bio(userDto.getBio())
                .country(userDto.getCountry())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }
}
