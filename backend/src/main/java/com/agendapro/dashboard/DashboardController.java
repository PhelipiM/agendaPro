package com.agendapro.dashboard;

import com.agendapro.appointment.Appointment;
import com.agendapro.appointment.AppointmentController;
import com.agendapro.appointment.AppointmentController.AppointmentResponse;
import com.agendapro.appointment.AppointmentRepository;
import com.agendapro.appointment.AppointmentStatus;
import com.agendapro.common.CurrentUserService;
import com.agendapro.user.AppUser;
import com.agendapro.user.AppUserRepository;
import com.agendapro.user.UserRole;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

  private final AppointmentRepository appointmentRepository;
  private final AppUserRepository userRepository;
  private final CurrentUserService currentUserService;

  @GetMapping("/dashboard/client")
  public ClientDashboardResponse client(HttpSession session) {
    AppUser currentUser = currentUserService.requireCurrentUser(session);
    List<Appointment> appointments =
        appointmentRepository.findAllByClientOrderByScheduledDateDescScheduledTimeDesc(currentUser);

    long upcomingCount =
        appointments.stream()
            .filter(this::isUpcoming)
            .count();
    long recentCount =
        appointments.stream().filter(appointment -> appointment.getStatus() == AppointmentStatus.COMPLETED).count();

    List<AppointmentResponse> upcomingAppointments =
        appointments.stream()
            .filter(this::isUpcoming)
            .sorted(Comparator.comparing(Appointment::getScheduledDate).thenComparing(Appointment::getScheduledTime))
            .limit(3)
            .map(AppointmentController::toResponse)
            .toList();

    List<AppointmentResponse> recentAppointments =
        appointments.stream()
            .filter(appointment -> appointment.getStatus() == AppointmentStatus.COMPLETED)
            .limit(5)
            .map(AppointmentController::toResponse)
            .toList();

    return new ClientDashboardResponse(
        appointments.size(),
        recentCount,
        upcomingCount,
        upcomingAppointments,
        recentAppointments);
  }

  @GetMapping("/dashboard/admin")
  public AdminDashboardResponse admin(HttpSession session) {
    currentUserService.requireAdmin(session);
    List<Appointment> appointments = appointmentRepository.findAllByOrderByScheduledDateDescScheduledTimeDesc();

    List<AppointmentResponse> recentAppointments =
        appointments.stream().limit(10).map(AppointmentController::toResponse).toList();
    long totalRevenueCents =
        appointments.stream()
            .filter(appointment -> appointment.getStatus() != AppointmentStatus.CANCELLED)
            .mapToLong(Appointment::getPriceCentsSnapshot)
            .sum();
    long todayAppointments =
        appointments.stream()
            .filter(appointment -> appointment.getScheduledDate().equals(LocalDate.now()))
            .count();
    long activeClients = userRepository.countByRoleAndActiveTrue(UserRole.CLIENT);

    return new AdminDashboardResponse(
        appointments.size(),
        todayAppointments,
        totalRevenueCents / 100.0,
        activeClients,
        recentAppointments);
  }

  @GetMapping("/history")
  public HistoryResponse history(HttpSession session) {
    AppUser currentUser = currentUserService.requireCurrentUser(session);
    List<AppointmentResponse> items =
        appointmentRepository.findAllByClientOrderByScheduledDateDescScheduledTimeDesc(currentUser).stream()
            .map(AppointmentController::toResponse)
            .toList();

    long completed = items.stream().filter(item -> item.status().equals("completed")).count();
    long pending = items.stream().filter(item -> item.status().equals("pending")).count();
    long cancelled = items.stream().filter(item -> item.status().equals("cancelled")).count();

    return new HistoryResponse(items, new HistoryCounts(items.size(), completed, pending, cancelled));
  }

  public record ClientDashboardResponse(
      long totalCount,
      long recentCount,
      long upcomingCount,
      List<AppointmentResponse> upcomingAppointments,
      List<AppointmentResponse> recentAppointments) {}

  public record AdminDashboardResponse(
      long totalAppointments,
      long todayAppointments,
      double totalRevenue,
      long activeClients,
      List<AppointmentResponse> appointments) {}

  public record HistoryResponse(List<AppointmentResponse> items, HistoryCounts counts) {}

  public record HistoryCounts(long total, long completed, long pending, long cancelled) {}

    private boolean isUpcoming(Appointment appointment) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        return appointment.getStatus() != AppointmentStatus.CANCELLED
                && (appointment.getScheduledDate().isAfter(today)
                        || (appointment.getScheduledDate().isEqual(today) && appointment.getScheduledTime().isAfter(now)));
    }
}