package com.agendapro.appointment;

import com.agendapro.catalog.CatalogService;
import com.agendapro.catalog.CatalogServiceRepository;
import com.agendapro.common.CurrentUserService;
import com.agendapro.common.FormattingUtils;
import com.agendapro.user.AppUser;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

  private final AppointmentRepository appointmentRepository;
  private final CatalogServiceRepository serviceRepository;
  private final CurrentUserService currentUserService;

  @GetMapping("/me")
  public List<AppointmentResponse> mine(HttpSession session) {
    AppUser currentUser = currentUserService.requireCurrentUser(session);
    return appointmentRepository.findAllByClientOrderByScheduledDateDescScheduledTimeDesc(currentUser).stream()
        .map(AppointmentController::toResponse)
        .toList();
  }

  @PostMapping
  public AppointmentResponse create(@Valid @RequestBody CreateAppointmentRequest request, HttpSession session) {
    AppUser currentUser = currentUserService.requireCurrentUser(session);
    CatalogService service =
        serviceRepository
            .findById(request.serviceId())
            .filter(CatalogService::isActive)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado"));

    Appointment appointment = new Appointment();
    appointment.setClient(currentUser);
    appointment.setService(service);
    appointment.setScheduledDate(request.date());
    appointment.setScheduledTime(request.time());
    appointment.setStatus(AppointmentStatus.PENDING);
    appointment.setProfessionalName("A confirmar");
    appointment.setPriceCentsSnapshot(service.getPriceCents());
    return toResponse(appointmentRepository.save(appointment));
  }

  @GetMapping
  public List<AppointmentResponse> all(HttpSession session) {
    currentUserService.requireAdmin(session);
    return appointmentRepository.findAllByOrderByScheduledDateDescScheduledTimeDesc().stream()
        .map(AppointmentController::toResponse)
        .toList();
  }

  public static AppointmentResponse toResponse(Appointment appointment) {
    return new AppointmentResponse(
        appointment.getId(),
        appointment.getClient().getName(),
        appointment.getService().getName(),
        appointment.getScheduledDate().toString(),
        appointment.getScheduledTime().toString().substring(0, 5),
        appointment.getProfessionalName(),
        FormattingUtils.formatPrice(appointment.getPriceCentsSnapshot()),
        appointment.getStatus().name().toLowerCase());
  }

  public record CreateAppointmentRequest(@NotNull UUID serviceId, @NotNull LocalDate date, @NotNull LocalTime time) {}

  public record AppointmentResponse(
      UUID id,
      String client,
      String service,
      String date,
      String time,
      String professional,
      String price,
      String status) {}
}