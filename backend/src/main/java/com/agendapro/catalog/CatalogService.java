package com.agendapro.catalog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CatalogService {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private int durationMinutes;

  @Column(nullable = false)
  private int priceCents;

  @Column(nullable = false)
  private boolean active = true;

  @CreationTimestamp
  private Instant createdAt;

  @UpdateTimestamp
  private Instant updatedAt;
}
