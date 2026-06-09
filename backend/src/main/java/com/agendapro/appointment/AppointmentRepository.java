package com.agendapro.appointment;

import com.agendapro.user.AppUser;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

  List<Appointment> findAllByClientOrderByScheduledDateDescScheduledTimeDesc(AppUser client);

  List<Appointment> findAllByOrderByScheduledDateDescScheduledTimeDesc();

  long countByClient(AppUser client);

  long countByClientAndStatus(AppUser client, AppointmentStatus status);

  long countByStatus(AppointmentStatus status);

  long countByScheduledDate(LocalDate scheduledDate);
}
