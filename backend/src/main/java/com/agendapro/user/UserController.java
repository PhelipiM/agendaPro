package com.agendapro.user;

import com.agendapro.auth.AuthController.UserResponse;
import com.agendapro.common.CurrentUserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final AppUserRepository userRepository;
  private final CurrentUserService currentUserService;

  @GetMapping("/me")
  public UserResponse me(HttpSession session) {
    return toResponse(currentUserService.requireCurrentUser(session));
  }

  @PutMapping("/me")
  public UserResponse update(@Valid @RequestBody UpdateProfileRequest request, HttpSession session) {
    AppUser currentUser = currentUserService.requireCurrentUser(session);

    Optional<AppUser> userWithSameEmail = userRepository.findByEmail(request.email());
    if (userWithSameEmail.isPresent() && !userWithSameEmail.get().getId().equals(currentUser.getId())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já está em uso");
    }

    currentUser.setName(request.name());
    currentUser.setEmail(request.email());
    currentUser.setPhone(request.phone());
    currentUser.setAddress(request.address());
    currentUser.setBio(request.bio());
    userRepository.save(currentUser);

    return toResponse(currentUser);
  }

  private UserResponse toResponse(AppUser user) {
    return new UserResponse(
        user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getPhone(), user.getAddress(), user.getBio());
  }

  public record UpdateProfileRequest(
      @NotBlank String name,
      @Email @NotBlank String email,
      String phone,
      String address,
      String bio) {}
}