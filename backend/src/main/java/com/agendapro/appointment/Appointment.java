package com.agendapro.appointment;

import com.agendapro.catalog.CatalogService;
import com.agendapro.user.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

  @Id
  @GeneratedValue
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "client_id", nullable = false)
  private AppUser client;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "service_id", nullable = false)
  private CatalogService service;

  @Column(nullable = false)
  private LocalDate scheduledDate;

  @Column(nullable = false)
  private LocalTime scheduledTime;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AppointmentStatus status;

  private String professionalName;

  @Column(nullable = false)
  private int priceCentsSnapshot;

  private String cancelReason;

  @CreationTimestamp
  private Instant createdAt;

  @UpdateTimestamp
  private Instant updatedAt;
}
