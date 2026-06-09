package com.agendapro.catalog;

import com.agendapro.common.CurrentUserService;
import com.agendapro.common.FormattingUtils;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

  private final CatalogServiceRepository serviceRepository;
  private final CurrentUserService currentUserService;

  @GetMapping
  public List<ServiceResponse> list() {
    return serviceRepository.findAll(Sort.by(Sort.Direction.ASC, "name")).stream()
        .filter(CatalogService::isActive)
        .map(ServiceController::toResponse)
        .toList();
  }

  @PostMapping
  public ServiceResponse create(@Valid @RequestBody ServiceRequest request, HttpSession session) {
    currentUserService.requireAdmin(session);
    CatalogService service = new CatalogService();
    apply(service, request);
    return toResponse(serviceRepository.save(service));
  }

  @PutMapping("/{id}")
  public ServiceResponse update(@PathVariable UUID id, @Valid @RequestBody ServiceRequest request, HttpSession session) {
    currentUserService.requireAdmin(session);
    CatalogService service =
        serviceRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado"));
    apply(service, request);
    return toResponse(serviceRepository.save(service));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable UUID id, HttpSession session) {
    currentUserService.requireAdmin(session);
    CatalogService service =
        serviceRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado"));
    service.setActive(false);
    serviceRepository.save(service);
    return ResponseEntity.noContent().build();
  }

  private void apply(CatalogService service, ServiceRequest request) {
    service.setName(request.name());
    service.setDurationMinutes(FormattingUtils.parseDurationMinutes(request.duration()));
    service.setPriceCents(FormattingUtils.parsePriceToCents(request.price()));
    service.setActive(true);
  }

  public static ServiceResponse toResponse(CatalogService service) {
    return new ServiceResponse(
        service.getId(),
        service.getName(),
        FormattingUtils.formatDurationMinutes(service.getDurationMinutes()),
        FormattingUtils.formatPrice(service.getPriceCents()),
        service.isActive());
  }

  public record ServiceRequest(@NotBlank String name, @NotBlank String duration, @NotBlank String price) {}

  public record ServiceResponse(UUID id, String name, String duration, String price, boolean active) {}
}