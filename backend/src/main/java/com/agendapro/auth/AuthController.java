package com.agendapro.auth;

import com.agendapro.common.CurrentUserService;
import com.agendapro.user.AppUser;
import com.agendapro.user.AppUserRepository;
import com.agendapro.user.UserRole;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AppUserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final CurrentUserService currentUserService;

  @PostMapping("/register")
  public UserResponse register(@Valid @RequestBody RegisterRequest request, HttpSession session) {
    if (userRepository.findByEmail(request.email()).isPresent()) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Este e-mail já está cadastrado");
    }

    AppUser user = new AppUser();
    user.setName(request.name());
    user.setEmail(request.email());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setRole(UserRole.CLIENT);
    user.setActive(true);

    AppUser savedUser = userRepository.save(user);
    currentUserService.authenticate(session, savedUser);
    return toResponse(savedUser);
  }

  @PostMapping("/login")
  public UserResponse login(@Valid @RequestBody LoginRequest request, HttpSession session) {
    AppUser user =
        userRepository
            .findByEmail(request.email())
            .filter(AppUser::isActive)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas"));

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
    }

    currentUserService.authenticate(session, user);
    return toResponse(user);
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpSession session) {
    currentUserService.logout(session);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/me")
  public UserResponse me(HttpSession session) {
    return toResponse(currentUserService.requireCurrentUser(session));
  }

  private UserResponse toResponse(AppUser user) {
    return new UserResponse(
        user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getPhone(), user.getAddress(), user.getBio());
  }

  public record RegisterRequest(
      @NotBlank String name, @Email @NotBlank String email, @NotBlank String password) {}

  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}

  public record UserResponse(
      UUID id,
      String name,
      String email,
      UserRole role,
      String phone,
      String address,
      String bio) {}
}