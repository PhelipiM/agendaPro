package com.agendapro.config;

import com.agendapro.appointment.Appointment;
import com.agendapro.appointment.AppointmentRepository;
import com.agendapro.appointment.AppointmentStatus;
import com.agendapro.catalog.CatalogService;
import com.agendapro.catalog.CatalogServiceRepository;
import com.agendapro.common.FormattingUtils;
import com.agendapro.user.AppUser;
import com.agendapro.user.AppUserRepository;
import com.agendapro.user.UserRole;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

  @Bean
  CommandLineRunner seedData(
      AppUserRepository userRepository,
      CatalogServiceRepository serviceRepository,
      AppointmentRepository appointmentRepository,
      PasswordEncoder passwordEncoder) {
    return args -> {
      AppUser admin =
          userRepository
              .findByEmail("admin@agendapro.com")
              .orElseGet(
                  () -> {
                    AppUser created = new AppUser();
                    created.setName("Administrador");
                    created.setEmail("admin@agendapro.com");
                    created.setPasswordHash(passwordEncoder.encode("admin123"));
                    created.setRole(UserRole.ADMIN);
                    created.setActive(true);
                    created.setBio("Conta administrativa da AgendaPro");
                    return userRepository.save(created);
                  });

      AppUser client =
          userRepository
              .findByEmail("cliente@agendapro.com")
              .orElseGet(
                  () -> {
                    AppUser created = new AppUser();
                    created.setName("Cliente Teste");
                    created.setEmail("cliente@agendapro.com");
                    created.setPasswordHash(passwordEncoder.encode("cliente123"));
                    created.setRole(UserRole.CLIENT);
                    created.setPhone("(11) 99999-0000");
                    created.setAddress("São Paulo - SP");
                    created.setBio("Cliente AgendaPro desde 2026");
                    created.setActive(true);
                    return userRepository.save(created);
                  });

      if (serviceRepository.count() == 0) {
        List<CatalogService> services =
            List.of(
                buildService("Corte de Cabelo", 30, 5000),
                buildService("Massagem Relaxante", 60, 12000),
                buildService("Consulta Nutricional", 45, 15000),
                buildService("Limpeza de Pele", 90, 20000),
                buildService("Manicure", 40, 4000),
                buildService("Pedicure", 40, 4500));
        serviceRepository.saveAll(services);
      }

      if (appointmentRepository.count() == 0) {
        List<CatalogService> services = serviceRepository.findAll();
        CatalogService corte = services.stream().filter(service -> service.getName().equals("Corte de Cabelo")).findFirst().orElseThrow();
        CatalogService massagem = services.stream().filter(service -> service.getName().equals("Massagem Relaxante")).findFirst().orElseThrow();
        CatalogService consulta = services.stream().filter(service -> service.getName().equals("Consulta Nutricional")).findFirst().orElseThrow();
        CatalogService limpeza = services.stream().filter(service -> service.getName().equals("Limpeza de Pele")).findFirst().orElseThrow();

        appointmentRepository.saveAll(
            List.of(
                buildAppointment(client, corte, LocalDate.now().plusDays(2), LocalTime.of(10, 0), AppointmentStatus.CONFIRMED, "Carlos Silva"),
                buildAppointment(client, massagem, LocalDate.now().plusDays(5), LocalTime.of(14, 30), AppointmentStatus.PENDING, "Ana Santos"),
                buildAppointment(client, consulta, LocalDate.now().minusDays(3), LocalTime.of(9, 0), AppointmentStatus.COMPLETED, "Dr. Pedro Costa"),
                buildAppointment(client, limpeza, LocalDate.now().minusDays(8), LocalTime.of(15, 0), AppointmentStatus.CANCELLED, "Marina Oliveira")));
      }
    };
  }

  private CatalogService buildService(String name, int durationMinutes, int priceCents) {
    CatalogService service = new CatalogService();
    service.setName(name);
    service.setDurationMinutes(durationMinutes);
    service.setPriceCents(priceCents);
    service.setActive(true);
    return service;
  }

  private Appointment buildAppointment(
      AppUser client,
      CatalogService service,
      LocalDate date,
      LocalTime time,
      AppointmentStatus status,
      String professionalName) {
    Appointment appointment = new Appointment();
    appointment.setClient(client);
    appointment.setService(service);
    appointment.setScheduledDate(date);
    appointment.setScheduledTime(time);
    appointment.setStatus(status);
    appointment.setProfessionalName(professionalName);
    appointment.setPriceCentsSnapshot(service.getPriceCents());
    return appointment;
  }
}
