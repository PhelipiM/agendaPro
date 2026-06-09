package com.agendapro.common;

import com.agendapro.user.AppUser;
import com.agendapro.user.AppUserRepository;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

  private final AppUserRepository userRepository;

  public void authenticate(HttpSession session, AppUser user) {
    session.setAttribute(SessionKeys.AUTH_USER_ID, user.getId().toString());
  }

  public Optional<AppUser> getCurrentUser(HttpSession session) {
    Object userId = session.getAttribute(SessionKeys.AUTH_USER_ID);
    if (userId == null) {
      return Optional.empty();
    }

    try {
      return userRepository.findById(UUID.fromString(userId.toString())).filter(AppUser::isActive);
    } catch (IllegalArgumentException ex) {
      return Optional.empty();
    }
  }

  public AppUser requireCurrentUser(HttpSession session) {
    return getCurrentUser(session)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado"));
  }

  public AppUser requireAdmin(HttpSession session) {
    AppUser currentUser = requireCurrentUser(session);
    if (currentUser.getRole() != com.agendapro.user.UserRole.ADMIN) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso restrito ao administrador");
    }
    return currentUser;
  }

  public void logout(HttpSession session) {
    session.invalidate();
  }
}
